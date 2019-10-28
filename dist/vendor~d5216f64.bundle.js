(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[43],{

/***/ "0xj5":
/***/ (function(module, exports, __webpack_require__) {

/* eslint no-console:0 */
/**
 * This file does the main work of building a domTree structure from a parse
 * tree. The entry point is the `buildHTML` function, which takes a parse tree.
 * Then, the buildExpression, buildGroup, and various groupTypes functions are
 * called, to produce a final HTML tree.
 */

var ParseError = __webpack_require__("E0m9");
var Style = __webpack_require__("aNjz");

var buildCommon = __webpack_require__("ybOZ");
var delimiter = __webpack_require__("6lZC");
var domTree = __webpack_require__("DwkR");
var fontMetrics = __webpack_require__("zJjT");
var utils = __webpack_require__("s847");

var makeSpan = buildCommon.makeSpan;

/**
 * Take a list of nodes, build them in order, and return a list of the built
 * nodes. This function handles the `prev` node correctly, and passes the
 * previous element from the list as the prev of the next element.
 */
var buildExpression = function(expression, options, prev) {
    var groups = [];
    for (var i = 0; i < expression.length; i++) {
        var group = expression[i];
        groups.push(buildGroup(group, options, prev));
        prev = group;
    }
    return groups;
};

// List of types used by getTypeOfGroup,
// see https://github.com/Khan/KaTeX/wiki/Examining-TeX#group-types
var groupToType = {
    mathord: "mord",
    textord: "mord",
    bin: "mbin",
    rel: "mrel",
    text: "mord",
    open: "mopen",
    close: "mclose",
    inner: "minner",
    genfrac: "mord",
    array: "mord",
    spacing: "mord",
    punct: "mpunct",
    ordgroup: "mord",
    op: "mop",
    katex: "mord",
    overline: "mord",
    underline: "mord",
    rule: "mord",
    leftright: "minner",
    sqrt: "mord",
    accent: "mord",
};

/**
 * Gets the final math type of an expression, given its group type. This type is
 * used to determine spacing between elements, and affects bin elements by
 * causing them to change depending on what types are around them. This type
 * must be attached to the outermost node of an element as a CSS class so that
 * spacing with its surrounding elements works correctly.
 *
 * Some elements can be mapped one-to-one from group type to math type, and
 * those are listed in the `groupToType` table.
 *
 * Others (usually elements that wrap around other elements) often have
 * recursive definitions, and thus call `getTypeOfGroup` on their inner
 * elements.
 */
var getTypeOfGroup = function(group) {
    if (group == null) {
        // Like when typesetting $^3$
        return groupToType.mathord;
    } else if (group.type === "supsub") {
        return getTypeOfGroup(group.value.base);
    } else if (group.type === "llap" || group.type === "rlap") {
        return getTypeOfGroup(group.value);
    } else if (group.type === "color") {
        return getTypeOfGroup(group.value.value);
    } else if (group.type === "sizing") {
        return getTypeOfGroup(group.value.value);
    } else if (group.type === "styling") {
        return getTypeOfGroup(group.value.value);
    } else if (group.type === "delimsizing") {
        return groupToType[group.value.delimType];
    } else {
        return groupToType[group.type];
    }
};

/**
 * Sometimes, groups perform special rules when they have superscripts or
 * subscripts attached to them. This function lets the `supsub` group know that
 * its inner element should handle the superscripts and subscripts instead of
 * handling them itself.
 */
var shouldHandleSupSub = function(group, options) {
    if (!group) {
        return false;
    } else if (group.type === "op") {
        // Operators handle supsubs differently when they have limits
        // (e.g. `\displaystyle\sum_2^3`)
        return group.value.limits &&
            (options.style.size === Style.DISPLAY.size ||
            group.value.alwaysHandleSupSub);
    } else if (group.type === "accent") {
        return isCharacterBox(group.value.base);
    } else {
        return null;
    }
};

/**
 * Sometimes we want to pull out the innermost element of a group. In most
 * cases, this will just be the group itself, but when ordgroups and colors have
 * a single element, we want to pull that out.
 */
var getBaseElem = function(group) {
    if (!group) {
        return false;
    } else if (group.type === "ordgroup") {
        if (group.value.length === 1) {
            return getBaseElem(group.value[0]);
        } else {
            return group;
        }
    } else if (group.type === "color") {
        if (group.value.value.length === 1) {
            return getBaseElem(group.value.value[0]);
        } else {
            return group;
        }
    } else {
        return group;
    }
};

/**
 * TeXbook algorithms often reference "character boxes", which are simply groups
 * with a single character in them. To decide if something is a character box,
 * we find its innermost group, and see if it is a single character.
 */
var isCharacterBox = function(group) {
    var baseElem = getBaseElem(group);

    // These are all they types of groups which hold single characters
    return baseElem.type === "mathord" ||
        baseElem.type === "textord" ||
        baseElem.type === "bin" ||
        baseElem.type === "rel" ||
        baseElem.type === "inner" ||
        baseElem.type === "open" ||
        baseElem.type === "close" ||
        baseElem.type === "punct";
};

var makeNullDelimiter = function(options) {
    return makeSpan([
        "sizing", "reset-" + options.size, "size5",
        options.style.reset(), Style.TEXT.cls(),
        "nulldelimiter",
    ]);
};

/**
 * This is a map of group types to the function used to handle that type.
 * Simpler types come at the beginning, while complicated types come afterwards.
 */
var groupTypes = {};

groupTypes.mathord = function(group, options, prev) {
    return buildCommon.makeOrd(group, options, "mathord");
};

groupTypes.textord = function(group, options, prev) {
    return buildCommon.makeOrd(group, options, "textord");
};

groupTypes.bin = function(group, options, prev) {
    var className = "mbin";
    // Pull out the most recent element. Do some special handling to find
    // things at the end of a \color group. Note that we don't use the same
    // logic for ordgroups (which count as ords).
    var prevAtom = prev;
    while (prevAtom && prevAtom.type === "color") {
        var atoms = prevAtom.value.value;
        prevAtom = atoms[atoms.length - 1];
    }
    // See TeXbook pg. 442-446, Rules 5 and 6, and the text before Rule 19.
    // Here, we determine whether the bin should turn into an ord. We
    // currently only apply Rule 5.
    if (!prev || utils.contains(["mbin", "mopen", "mrel", "mop", "mpunct"],
            getTypeOfGroup(prevAtom))) {
        group.type = "textord";
        className = "mord";
    }

    return buildCommon.mathsym(
        group.value, group.mode, options.getColor(), [className]);
};

groupTypes.rel = function(group, options, prev) {
    return buildCommon.mathsym(
        group.value, group.mode, options.getColor(), ["mrel"]);
};

groupTypes.open = function(group, options, prev) {
    return buildCommon.mathsym(
        group.value, group.mode, options.getColor(), ["mopen"]);
};

groupTypes.close = function(group, options, prev) {
    return buildCommon.mathsym(
        group.value, group.mode, options.getColor(), ["mclose"]);
};

groupTypes.inner = function(group, options, prev) {
    return buildCommon.mathsym(
        group.value, group.mode, options.getColor(), ["minner"]);
};

groupTypes.punct = function(group, options, prev) {
    return buildCommon.mathsym(
        group.value, group.mode, options.getColor(), ["mpunct"]);
};

groupTypes.ordgroup = function(group, options, prev) {
    return makeSpan(
        ["mord", options.style.cls()],
        buildExpression(group.value, options.reset())
    );
};

groupTypes.text = function(group, options, prev) {
    return makeSpan(["text", "mord", options.style.cls()],
        buildExpression(group.value.body, options.reset()));
};

groupTypes.color = function(group, options, prev) {
    var elements = buildExpression(
        group.value.value,
        options.withColor(group.value.color),
        prev
    );

    // \color isn't supposed to affect the type of the elements it contains.
    // To accomplish this, we wrap the results in a fragment, so the inner
    // elements will be able to directly interact with their neighbors. For
    // example, `\color{red}{2 +} 3` has the same spacing as `2 + 3`
    return new buildCommon.makeFragment(elements);
};

groupTypes.supsub = function(group, options, prev) {
    // Superscript and subscripts are handled in the TeXbook on page
    // 445-446, rules 18(a-f).

    // Here is where we defer to the inner group if it should handle
    // superscripts and subscripts itself.
    if (shouldHandleSupSub(group.value.base, options)) {
        return groupTypes[group.value.base.type](group, options, prev);
    }

    var base = buildGroup(group.value.base, options.reset());
    var supmid;
    var submid;
    var sup;
    var sub;

    if (group.value.sup) {
        sup = buildGroup(group.value.sup,
                options.withStyle(options.style.sup()));
        supmid = makeSpan(
                [options.style.reset(), options.style.sup().cls()], [sup]);
    }

    if (group.value.sub) {
        sub = buildGroup(group.value.sub,
                options.withStyle(options.style.sub()));
        submid = makeSpan(
                [options.style.reset(), options.style.sub().cls()], [sub]);
    }

    // Rule 18a
    var supShift;
    var subShift;
    if (isCharacterBox(group.value.base)) {
        supShift = 0;
        subShift = 0;
    } else {
        supShift = base.height - fontMetrics.metrics.supDrop;
        subShift = base.depth + fontMetrics.metrics.subDrop;
    }

    // Rule 18c
    var minSupShift;
    if (options.style === Style.DISPLAY) {
        minSupShift = fontMetrics.metrics.sup1;
    } else if (options.style.cramped) {
        minSupShift = fontMetrics.metrics.sup3;
    } else {
        minSupShift = fontMetrics.metrics.sup2;
    }

    // scriptspace is a font-size-independent size, so scale it
    // appropriately
    var multiplier = Style.TEXT.sizeMultiplier *
            options.style.sizeMultiplier;
    var scriptspace =
        (0.5 / fontMetrics.metrics.ptPerEm) / multiplier + "em";

    var supsub;
    if (!group.value.sup) {
        // Rule 18b
        subShift = Math.max(
            subShift, fontMetrics.metrics.sub1,
            sub.height - 0.8 * fontMetrics.metrics.xHeight);

        supsub = buildCommon.makeVList([
            {type: "elem", elem: submid},
        ], "shift", subShift, options);

        supsub.children[0].style.marginRight = scriptspace;

        // Subscripts shouldn't be shifted by the base's italic correction.
        // Account for that by shifting the subscript back the appropriate
        // amount. Note we only do this when the base is a single symbol.
        if (base instanceof domTree.symbolNode) {
            supsub.children[0].style.marginLeft = -base.italic + "em";
        }
    } else if (!group.value.sub) {
        // Rule 18c, d
        supShift = Math.max(supShift, minSupShift,
            sup.depth + 0.25 * fontMetrics.metrics.xHeight);

        supsub = buildCommon.makeVList([
            {type: "elem", elem: supmid},
        ], "shift", -supShift, options);

        supsub.children[0].style.marginRight = scriptspace;
    } else {
        supShift = Math.max(
            supShift, minSupShift,
            sup.depth + 0.25 * fontMetrics.metrics.xHeight);
        subShift = Math.max(subShift, fontMetrics.metrics.sub2);

        var ruleWidth = fontMetrics.metrics.defaultRuleThickness;

        // Rule 18e
        if ((supShift - sup.depth) - (sub.height - subShift) <
                4 * ruleWidth) {
            subShift = 4 * ruleWidth - (supShift - sup.depth) + sub.height;
            var psi = 0.8 * fontMetrics.metrics.xHeight -
                (supShift - sup.depth);
            if (psi > 0) {
                supShift += psi;
                subShift -= psi;
            }
        }

        supsub = buildCommon.makeVList([
            {type: "elem", elem: submid, shift: subShift},
            {type: "elem", elem: supmid, shift: -supShift},
        ], "individualShift", null, options);

        // See comment above about subscripts not being shifted
        if (base instanceof domTree.symbolNode) {
            supsub.children[0].style.marginLeft = -base.italic + "em";
        }

        supsub.children[0].style.marginRight = scriptspace;
        supsub.children[1].style.marginRight = scriptspace;
    }

    return makeSpan([getTypeOfGroup(group.value.base)],
        [base, supsub]);
};

groupTypes.genfrac = function(group, options, prev) {
    // Fractions are handled in the TeXbook on pages 444-445, rules 15(a-e).
    // Figure out what style this fraction should be in based on the
    // function used
    var fstyle = options.style;
    if (group.value.size === "display") {
        fstyle = Style.DISPLAY;
    } else if (group.value.size === "text") {
        fstyle = Style.TEXT;
    }

    var nstyle = fstyle.fracNum();
    var dstyle = fstyle.fracDen();

    var numer = buildGroup(group.value.numer, options.withStyle(nstyle));
    var numerreset = makeSpan([fstyle.reset(), nstyle.cls()], [numer]);

    var denom = buildGroup(group.value.denom, options.withStyle(dstyle));
    var denomreset = makeSpan([fstyle.reset(), dstyle.cls()], [denom]);

    var ruleWidth;
    if (group.value.hasBarLine) {
        ruleWidth = fontMetrics.metrics.defaultRuleThickness /
            options.style.sizeMultiplier;
    } else {
        ruleWidth = 0;
    }

    // Rule 15b
    var numShift;
    var clearance;
    var denomShift;
    if (fstyle.size === Style.DISPLAY.size) {
        numShift = fontMetrics.metrics.num1;
        if (ruleWidth > 0) {
            clearance = 3 * ruleWidth;
        } else {
            clearance = 7 * fontMetrics.metrics.defaultRuleThickness;
        }
        denomShift = fontMetrics.metrics.denom1;
    } else {
        if (ruleWidth > 0) {
            numShift = fontMetrics.metrics.num2;
            clearance = ruleWidth;
        } else {
            numShift = fontMetrics.metrics.num3;
            clearance = 3 * fontMetrics.metrics.defaultRuleThickness;
        }
        denomShift = fontMetrics.metrics.denom2;
    }

    var frac;
    if (ruleWidth === 0) {
        // Rule 15c
        var candiateClearance =
            (numShift - numer.depth) - (denom.height - denomShift);
        if (candiateClearance < clearance) {
            numShift += 0.5 * (clearance - candiateClearance);
            denomShift += 0.5 * (clearance - candiateClearance);
        }

        frac = buildCommon.makeVList([
            {type: "elem", elem: denomreset, shift: denomShift},
            {type: "elem", elem: numerreset, shift: -numShift},
        ], "individualShift", null, options);
    } else {
        // Rule 15d
        var axisHeight = fontMetrics.metrics.axisHeight;

        if ((numShift - numer.depth) - (axisHeight + 0.5 * ruleWidth) <
                clearance) {
            numShift +=
                clearance - ((numShift - numer.depth) -
                             (axisHeight + 0.5 * ruleWidth));
        }

        if ((axisHeight - 0.5 * ruleWidth) - (denom.height - denomShift) <
                clearance) {
            denomShift +=
                clearance - ((axisHeight - 0.5 * ruleWidth) -
                             (denom.height - denomShift));
        }

        var mid = makeSpan(
            [options.style.reset(), Style.TEXT.cls(), "frac-line"]);
        // Manually set the height of the line because its height is
        // created in CSS
        mid.height = ruleWidth;

        var midShift = -(axisHeight - 0.5 * ruleWidth);

        frac = buildCommon.makeVList([
            {type: "elem", elem: denomreset, shift: denomShift},
            {type: "elem", elem: mid,        shift: midShift},
            {type: "elem", elem: numerreset, shift: -numShift},
        ], "individualShift", null, options);
    }

    // Since we manually change the style sometimes (with \dfrac or \tfrac),
    // account for the possible size change here.
    frac.height *= fstyle.sizeMultiplier / options.style.sizeMultiplier;
    frac.depth *= fstyle.sizeMultiplier / options.style.sizeMultiplier;

    // Rule 15e
    var delimSize;
    if (fstyle.size === Style.DISPLAY.size) {
        delimSize = fontMetrics.metrics.delim1;
    } else {
        delimSize = fontMetrics.metrics.getDelim2(fstyle);
    }

    var leftDelim;
    var rightDelim;
    if (group.value.leftDelim == null) {
        leftDelim = makeNullDelimiter(options);
    } else {
        leftDelim = delimiter.customSizedDelim(
            group.value.leftDelim, delimSize, true,
            options.withStyle(fstyle), group.mode);
    }
    if (group.value.rightDelim == null) {
        rightDelim = makeNullDelimiter(options);
    } else {
        rightDelim = delimiter.customSizedDelim(
            group.value.rightDelim, delimSize, true,
            options.withStyle(fstyle), group.mode);
    }

    return makeSpan(
        ["mord", options.style.reset(), fstyle.cls()],
        [leftDelim, makeSpan(["mfrac"], [frac]), rightDelim],
        options.getColor());
};

groupTypes.array = function(group, options, prev) {
    var r;
    var c;
    var nr = group.value.body.length;
    var nc = 0;
    var body = new Array(nr);

    // Horizontal spacing
    var pt = 1 / fontMetrics.metrics.ptPerEm;
    var arraycolsep = 5 * pt; // \arraycolsep in article.cls

    // Vertical spacing
    var baselineskip = 12 * pt; // see size10.clo
    // Default \arraystretch from lttab.dtx
    // TODO(gagern): may get redefined once we have user-defined macros
    var arraystretch = utils.deflt(group.value.arraystretch, 1);
    var arrayskip = arraystretch * baselineskip;
    var arstrutHeight = 0.7 * arrayskip; // \strutbox in ltfsstrc.dtx and
    var arstrutDepth = 0.3 * arrayskip;  // \@arstrutbox in lttab.dtx

    var totalHeight = 0;
    for (r = 0; r < group.value.body.length; ++r) {
        var inrow = group.value.body[r];
        var height = arstrutHeight; // \@array adds an \@arstrut
        var depth = arstrutDepth;   // to each tow (via the template)

        if (nc < inrow.length) {
            nc = inrow.length;
        }

        var outrow = new Array(inrow.length);
        for (c = 0; c < inrow.length; ++c) {
            var elt = buildGroup(inrow[c], options);
            if (depth < elt.depth) {
                depth = elt.depth;
            }
            if (height < elt.height) {
                height = elt.height;
            }
            outrow[c] = elt;
        }

        var gap = 0;
        if (group.value.rowGaps[r]) {
            gap = group.value.rowGaps[r].value;
            switch (gap.unit) {
                case "em":
                    gap = gap.number;
                    break;
                case "ex":
                    gap = gap.number * fontMetrics.metrics.emPerEx;
                    break;
                default:
                    console.error("Can't handle unit " + gap.unit);
                    gap = 0;
            }
            if (gap > 0) { // \@argarraycr
                gap += arstrutDepth;
                if (depth < gap) {
                    depth = gap; // \@xargarraycr
                }
                gap = 0;
            }
        }

        outrow.height = height;
        outrow.depth = depth;
        totalHeight += height;
        outrow.pos = totalHeight;
        totalHeight += depth + gap; // \@yargarraycr
        body[r] = outrow;
    }

    var offset = totalHeight / 2 + fontMetrics.metrics.axisHeight;
    var colDescriptions = group.value.cols || [];
    var cols = [];
    var colSep;
    var colDescrNum;
    for (c = 0, colDescrNum = 0;
         // Continue while either there are more columns or more column
         // descriptions, so trailing separators don't get lost.
         c < nc || colDescrNum < colDescriptions.length;
         ++c, ++colDescrNum) {

        var colDescr = colDescriptions[colDescrNum] || {};

        var firstSeparator = true;
        while (colDescr.type === "separator") {
            // If there is more than one separator in a row, add a space
            // between them.
            if (!firstSeparator) {
                colSep = makeSpan(["arraycolsep"], []);
                colSep.style.width =
                    fontMetrics.metrics.doubleRuleSep + "em";
                cols.push(colSep);
            }

            if (colDescr.separator === "|") {
                var separator = makeSpan(
                    ["vertical-separator"],
                    []);
                separator.style.height = totalHeight + "em";
                separator.style.verticalAlign =
                    -(totalHeight - offset) + "em";

                cols.push(separator);
            } else {
                throw new ParseError(
                    "Invalid separator type: " + colDescr.separator);
            }

            colDescrNum++;
            colDescr = colDescriptions[colDescrNum] || {};
            firstSeparator = false;
        }

        if (c >= nc) {
            continue;
        }

        var sepwidth;
        if (c > 0 || group.value.hskipBeforeAndAfter) {
            sepwidth = utils.deflt(colDescr.pregap, arraycolsep);
            if (sepwidth !== 0) {
                colSep = makeSpan(["arraycolsep"], []);
                colSep.style.width = sepwidth + "em";
                cols.push(colSep);
            }
        }

        var col = [];
        for (r = 0; r < nr; ++r) {
            var row = body[r];
            var elem = row[c];
            if (!elem) {
                continue;
            }
            var shift = row.pos - offset;
            elem.depth = row.depth;
            elem.height = row.height;
            col.push({type: "elem", elem: elem, shift: shift});
        }

        col = buildCommon.makeVList(col, "individualShift", null, options);
        col = makeSpan(
            ["col-align-" + (colDescr.align || "c")],
            [col]);
        cols.push(col);

        if (c < nc - 1 || group.value.hskipBeforeAndAfter) {
            sepwidth = utils.deflt(colDescr.postgap, arraycolsep);
            if (sepwidth !== 0) {
                colSep = makeSpan(["arraycolsep"], []);
                colSep.style.width = sepwidth + "em";
                cols.push(colSep);
            }
        }
    }
    body = makeSpan(["mtable"], cols);
    return makeSpan(["mord"], [body], options.getColor());
};

groupTypes.spacing = function(group, options, prev) {
    if (group.value === "\\ " || group.value === "\\space" ||
        group.value === " " || group.value === "~") {
        // Spaces are generated by adding an actual space. Each of these
        // things has an entry in the symbols table, so these will be turned
        // into appropriate outputs.
        return makeSpan(
            ["mord", "mspace"],
            [buildCommon.mathsym(group.value, group.mode)]
        );
    } else {
        // Other kinds of spaces are of arbitrary width. We use CSS to
        // generate these.
        return makeSpan(
            ["mord", "mspace",
             buildCommon.spacingFunctions[group.value].className]);
    }
};

groupTypes.llap = function(group, options, prev) {
    var inner = makeSpan(
        ["inner"], [buildGroup(group.value.body, options.reset())]);
    var fix = makeSpan(["fix"], []);
    return makeSpan(
        ["llap", options.style.cls()], [inner, fix]);
};

groupTypes.rlap = function(group, options, prev) {
    var inner = makeSpan(
        ["inner"], [buildGroup(group.value.body, options.reset())]);
    var fix = makeSpan(["fix"], []);
    return makeSpan(
        ["rlap", options.style.cls()], [inner, fix]);
};

groupTypes.op = function(group, options, prev) {
    // Operators are handled in the TeXbook pg. 443-444, rule 13(a).
    var supGroup;
    var subGroup;
    var hasLimits = false;
    if (group.type === "supsub" ) {
        // If we have limits, supsub will pass us its group to handle. Pull
        // out the superscript and subscript and set the group to the op in
        // its base.
        supGroup = group.value.sup;
        subGroup = group.value.sub;
        group = group.value.base;
        hasLimits = true;
    }

    // Most operators have a large successor symbol, but these don't.
    var noSuccessor = [
        "\\smallint",
    ];

    var large = false;
    if (options.style.size === Style.DISPLAY.size &&
        group.value.symbol &&
        !utils.contains(noSuccessor, group.value.body)) {

        // Most symbol operators get larger in displaystyle (rule 13)
        large = true;
    }

    var base;
    var baseShift = 0;
    var slant = 0;
    if (group.value.symbol) {
        // If this is a symbol, create the symbol.
        var style = large ? "Size2-Regular" : "Size1-Regular";
        base = buildCommon.makeSymbol(
            group.value.body, style, "math", options.getColor(),
            ["op-symbol", large ? "large-op" : "small-op", "mop"]);

        // Shift the symbol so its center lies on the axis (rule 13). It
        // appears that our fonts have the centers of the symbols already
        // almost on the axis, so these numbers are very small. Note we
        // don't actually apply this here, but instead it is used either in
        // the vlist creation or separately when there are no limits.
        baseShift = (base.height - base.depth) / 2 -
            fontMetrics.metrics.axisHeight *
            options.style.sizeMultiplier;

        // The slant of the symbol is just its italic correction.
        slant = base.italic;
    } else {
        // Otherwise, this is a text operator. Build the text from the
        // operator's name.
        // TODO(emily): Add a space in the middle of some of these
        // operators, like \limsup
        var output = [];
        for (var i = 1; i < group.value.body.length; i++) {
            output.push(buildCommon.mathsym(group.value.body[i], group.mode));
        }
        base = makeSpan(["mop"], output, options.getColor());
    }

    if (hasLimits) {
        // IE 8 clips \int if it is in a display: inline-block. We wrap it
        // in a new span so it is an inline, and works.
        base = makeSpan([], [base]);

        var supmid;
        var supKern;
        var submid;
        var subKern;
        // We manually have to handle the superscripts and subscripts. This,
        // aside from the kern calculations, is copied from supsub.
        if (supGroup) {
            var sup = buildGroup(
                supGroup, options.withStyle(options.style.sup()));
            supmid = makeSpan(
                [options.style.reset(), options.style.sup().cls()], [sup]);

            supKern = Math.max(
                fontMetrics.metrics.bigOpSpacing1,
                fontMetrics.metrics.bigOpSpacing3 - sup.depth);
        }

        if (subGroup) {
            var sub = buildGroup(
                subGroup, options.withStyle(options.style.sub()));
            submid = makeSpan(
                [options.style.reset(), options.style.sub().cls()],
                [sub]);

            subKern = Math.max(
                fontMetrics.metrics.bigOpSpacing2,
                fontMetrics.metrics.bigOpSpacing4 - sub.height);
        }

        // Build the final group as a vlist of the possible subscript, base,
        // and possible superscript.
        var finalGroup;
        var top;
        var bottom;
        if (!supGroup) {
            top = base.height - baseShift;

            finalGroup = buildCommon.makeVList([
                {type: "kern", size: fontMetrics.metrics.bigOpSpacing5},
                {type: "elem", elem: submid},
                {type: "kern", size: subKern},
                {type: "elem", elem: base},
            ], "top", top, options);

            // Here, we shift the limits by the slant of the symbol. Note
            // that we are supposed to shift the limits by 1/2 of the slant,
            // but since we are centering the limits adding a full slant of
            // margin will shift by 1/2 that.
            finalGroup.children[0].style.marginLeft = -slant + "em";
        } else if (!subGroup) {
            bottom = base.depth + baseShift;

            finalGroup = buildCommon.makeVList([
                {type: "elem", elem: base},
                {type: "kern", size: supKern},
                {type: "elem", elem: supmid},
                {type: "kern", size: fontMetrics.metrics.bigOpSpacing5},
            ], "bottom", bottom, options);

            // See comment above about slants
            finalGroup.children[1].style.marginLeft = slant + "em";
        } else if (!supGroup && !subGroup) {
            // This case probably shouldn't occur (this would mean the
            // supsub was sending us a group with no superscript or
            // subscript) but be safe.
            return base;
        } else {
            bottom = fontMetrics.metrics.bigOpSpacing5 +
                submid.height + submid.depth +
                subKern +
                base.depth + baseShift;

            finalGroup = buildCommon.makeVList([
                {type: "kern", size: fontMetrics.metrics.bigOpSpacing5},
                {type: "elem", elem: submid},
                {type: "kern", size: subKern},
                {type: "elem", elem: base},
                {type: "kern", size: supKern},
                {type: "elem", elem: supmid},
                {type: "kern", size: fontMetrics.metrics.bigOpSpacing5},
            ], "bottom", bottom, options);

            // See comment above about slants
            finalGroup.children[0].style.marginLeft = -slant + "em";
            finalGroup.children[2].style.marginLeft = slant + "em";
        }

        return makeSpan(["mop", "op-limits"], [finalGroup]);
    } else {
        if (group.value.symbol) {
            base.style.top = baseShift + "em";
        }

        return base;
    }
};

groupTypes.katex = function(group, options, prev) {
    // The KaTeX logo. The offsets for the K and a were chosen to look
    // good, but the offsets for the T, E, and X were taken from the
    // definition of \TeX in TeX (see TeXbook pg. 356)
    var k = makeSpan(
        ["k"], [buildCommon.mathsym("K", group.mode)]);
    var a = makeSpan(
        ["a"], [buildCommon.mathsym("A", group.mode)]);

    a.height = (a.height + 0.2) * 0.75;
    a.depth = (a.height - 0.2) * 0.75;

    var t = makeSpan(
        ["t"], [buildCommon.mathsym("T", group.mode)]);
    var e = makeSpan(
        ["e"], [buildCommon.mathsym("E", group.mode)]);

    e.height = (e.height - 0.2155);
    e.depth = (e.depth + 0.2155);

    var x = makeSpan(
        ["x"], [buildCommon.mathsym("X", group.mode)]);

    return makeSpan(
        ["katex-logo", "mord"], [k, a, t, e, x], options.getColor());
};

groupTypes.overline = function(group, options, prev) {
    // Overlines are handled in the TeXbook pg 443, Rule 9.

    // Build the inner group in the cramped style.
    var innerGroup = buildGroup(group.value.body,
            options.withStyle(options.style.cramp()));

    var ruleWidth = fontMetrics.metrics.defaultRuleThickness /
        options.style.sizeMultiplier;

    // Create the line above the body
    var line = makeSpan(
        [options.style.reset(), Style.TEXT.cls(), "overline-line"]);
    line.height = ruleWidth;
    line.maxFontSize = 1.0;

    // Generate the vlist, with the appropriate kerns
    var vlist = buildCommon.makeVList([
        {type: "elem", elem: innerGroup},
        {type: "kern", size: 3 * ruleWidth},
        {type: "elem", elem: line},
        {type: "kern", size: ruleWidth},
    ], "firstBaseline", null, options);

    return makeSpan(["overline", "mord"], [vlist], options.getColor());
};

groupTypes.underline = function(group, options, prev) {
    // Underlines are handled in the TeXbook pg 443, Rule 10.

    // Build the inner group.
    var innerGroup = buildGroup(group.value.body, options);

    var ruleWidth = fontMetrics.metrics.defaultRuleThickness /
        options.style.sizeMultiplier;

    // Create the line above the body
    var line = makeSpan(
        [options.style.reset(), Style.TEXT.cls(), "underline-line"]);
    line.height = ruleWidth;
    line.maxFontSize = 1.0;

    // Generate the vlist, with the appropriate kerns
    var vlist = buildCommon.makeVList([
        {type: "kern", size: ruleWidth},
        {type: "elem", elem: line},
        {type: "kern", size: 3 * ruleWidth},
        {type: "elem", elem: innerGroup},
    ], "top", innerGroup.height, options);

    return makeSpan(["underline", "mord"], [vlist], options.getColor());
};

groupTypes.sqrt = function(group, options, prev) {
    // Square roots are handled in the TeXbook pg. 443, Rule 11.

    // First, we do the same steps as in overline to build the inner group
    // and line
    var inner = buildGroup(group.value.body,
            options.withStyle(options.style.cramp()));

    var ruleWidth = fontMetrics.metrics.defaultRuleThickness /
        options.style.sizeMultiplier;

    var line = makeSpan(
        [options.style.reset(), Style.TEXT.cls(), "sqrt-line"], [],
        options.getColor());
    line.height = ruleWidth;
    line.maxFontSize = 1.0;

    var phi = ruleWidth;
    if (options.style.id < Style.TEXT.id) {
        phi = fontMetrics.metrics.xHeight;
    }

    // Calculate the clearance between the body and line
    var lineClearance = ruleWidth + phi / 4;

    var innerHeight =
        (inner.height + inner.depth) * options.style.sizeMultiplier;
    var minDelimiterHeight = innerHeight + lineClearance + ruleWidth;

    // Create a \surd delimiter of the required minimum size
    var delim = makeSpan(["sqrt-sign"], [
        delimiter.customSizedDelim("\\surd", minDelimiterHeight,
                                   false, options, group.mode)],
                         options.getColor());

    var delimDepth = (delim.height + delim.depth) - ruleWidth;

    // Adjust the clearance based on the delimiter size
    if (delimDepth > inner.height + inner.depth + lineClearance) {
        lineClearance =
            (lineClearance + delimDepth - inner.height - inner.depth) / 2;
    }

    // Shift the delimiter so that its top lines up with the top of the line
    var delimShift = -(inner.height + lineClearance + ruleWidth) + delim.height;
    delim.style.top = delimShift + "em";
    delim.height -= delimShift;
    delim.depth += delimShift;

    // We add a special case here, because even when `inner` is empty, we
    // still get a line. So, we use a simple heuristic to decide if we
    // should omit the body entirely. (note this doesn't work for something
    // like `\sqrt{\rlap{x}}`, but if someone is doing that they deserve for
    // it not to work.
    var body;
    if (inner.height === 0 && inner.depth === 0) {
        body = makeSpan();
    } else {
        body = buildCommon.makeVList([
            {type: "elem", elem: inner},
            {type: "kern", size: lineClearance},
            {type: "elem", elem: line},
            {type: "kern", size: ruleWidth},
        ], "firstBaseline", null, options);
    }

    if (!group.value.index) {
        return makeSpan(["sqrt", "mord"], [delim, body]);
    } else {
        // Handle the optional root index

        // The index is always in scriptscript style
        var root = buildGroup(
            group.value.index,
            options.withStyle(Style.SCRIPTSCRIPT));
        var rootWrap = makeSpan(
            [options.style.reset(), Style.SCRIPTSCRIPT.cls()],
            [root]);

        // Figure out the height and depth of the inner part
        var innerRootHeight = Math.max(delim.height, body.height);
        var innerRootDepth = Math.max(delim.depth, body.depth);

        // The amount the index is shifted by. This is taken from the TeX
        // source, in the definition of `\r@@t`.
        var toShift = 0.6 * (innerRootHeight - innerRootDepth);

        // Build a VList with the superscript shifted up correctly
        var rootVList = buildCommon.makeVList(
            [{type: "elem", elem: rootWrap}],
            "shift", -toShift, options);
        // Add a class surrounding it so we can add on the appropriate
        // kerning
        var rootVListWrap = makeSpan(["root"], [rootVList]);

        return makeSpan(["sqrt", "mord"], [rootVListWrap, delim, body]);
    }
};

groupTypes.sizing = function(group, options, prev) {
    // Handle sizing operators like \Huge. Real TeX doesn't actually allow
    // these functions inside of math expressions, so we do some special
    // handling.
    var inner = buildExpression(group.value.value,
            options.withSize(group.value.size), prev);

    var span = makeSpan(["mord"],
        [makeSpan(["sizing", "reset-" + options.size, group.value.size,
                   options.style.cls()],
                  inner)]);

    // Calculate the correct maxFontSize manually
    var fontSize = buildCommon.sizingMultiplier[group.value.size];
    span.maxFontSize = fontSize * options.style.sizeMultiplier;

    return span;
};

groupTypes.styling = function(group, options, prev) {
    // Style changes are handled in the TeXbook on pg. 442, Rule 3.

    // Figure out what style we're changing to.
    var style = {
        "display": Style.DISPLAY,
        "text": Style.TEXT,
        "script": Style.SCRIPT,
        "scriptscript": Style.SCRIPTSCRIPT,
    };

    var newStyle = style[group.value.style];

    // Build the inner expression in the new style.
    var inner = buildExpression(
        group.value.value, options.withStyle(newStyle), prev);

    return makeSpan([options.style.reset(), newStyle.cls()], inner);
};

groupTypes.font = function(group, options, prev) {
    var font = group.value.font;
    return buildGroup(group.value.body, options.withFont(font), prev);
};

groupTypes.delimsizing = function(group, options, prev) {
    var delim = group.value.value;

    if (delim === ".") {
        // Empty delimiters still count as elements, even though they don't
        // show anything.
        return makeSpan([groupToType[group.value.delimType]]);
    }

    // Use delimiter.sizedDelim to generate the delimiter.
    return makeSpan(
        [groupToType[group.value.delimType]],
        [delimiter.sizedDelim(
            delim, group.value.size, options, group.mode)]);
};

groupTypes.leftright = function(group, options, prev) {
    // Build the inner expression
    var inner = buildExpression(group.value.body, options.reset());

    var innerHeight = 0;
    var innerDepth = 0;

    // Calculate its height and depth
    for (var i = 0; i < inner.length; i++) {
        innerHeight = Math.max(inner[i].height, innerHeight);
        innerDepth = Math.max(inner[i].depth, innerDepth);
    }

    // The size of delimiters is the same, regardless of what style we are
    // in. Thus, to correctly calculate the size of delimiter we need around
    // a group, we scale down the inner size based on the size.
    innerHeight *= options.style.sizeMultiplier;
    innerDepth *= options.style.sizeMultiplier;

    var leftDelim;
    if (group.value.left === ".") {
        // Empty delimiters in \left and \right make null delimiter spaces.
        leftDelim = makeNullDelimiter(options);
    } else {
        // Otherwise, use leftRightDelim to generate the correct sized
        // delimiter.
        leftDelim = delimiter.leftRightDelim(
            group.value.left, innerHeight, innerDepth, options,
            group.mode);
    }
    // Add it to the beginning of the expression
    inner.unshift(leftDelim);

    var rightDelim;
    // Same for the right delimiter
    if (group.value.right === ".") {
        rightDelim = makeNullDelimiter(options);
    } else {
        rightDelim = delimiter.leftRightDelim(
            group.value.right, innerHeight, innerDepth, options,
            group.mode);
    }
    // Add it to the end of the expression.
    inner.push(rightDelim);

    return makeSpan(
        ["minner", options.style.cls()], inner, options.getColor());
};

groupTypes.rule = function(group, options, prev) {
    // Make an empty span for the rule
    var rule = makeSpan(["mord", "rule"], [], options.getColor());

    // Calculate the shift, width, and height of the rule, and account for units
    var shift = 0;
    if (group.value.shift) {
        shift = group.value.shift.number;
        if (group.value.shift.unit === "ex") {
            shift *= fontMetrics.metrics.xHeight;
        }
    }

    var width = group.value.width.number;
    if (group.value.width.unit === "ex") {
        width *= fontMetrics.metrics.xHeight;
    }

    var height = group.value.height.number;
    if (group.value.height.unit === "ex") {
        height *= fontMetrics.metrics.xHeight;
    }

    // The sizes of rules are absolute, so make it larger if we are in a
    // smaller style.
    shift /= options.style.sizeMultiplier;
    width /= options.style.sizeMultiplier;
    height /= options.style.sizeMultiplier;

    // Style the rule to the right size
    rule.style.borderRightWidth = width + "em";
    rule.style.borderTopWidth = height + "em";
    rule.style.bottom = shift + "em";

    // Record the height and width
    rule.width = width;
    rule.height = height + shift;
    rule.depth = -shift;

    return rule;
};

groupTypes.accent = function(group, options, prev) {
    // Accents are handled in the TeXbook pg. 443, rule 12.
    var base = group.value.base;

    var supsubGroup;
    if (group.type === "supsub") {
        // If our base is a character box, and we have superscripts and
        // subscripts, the supsub will defer to us. In particular, we want
        // to attach the superscripts and subscripts to the inner body (so
        // that the position of the superscripts and subscripts won't be
        // affected by the height of the accent). We accomplish this by
        // sticking the base of the accent into the base of the supsub, and
        // rendering that, while keeping track of where the accent is.

        // The supsub group is the group that was passed in
        var supsub = group;
        // The real accent group is the base of the supsub group
        group = supsub.value.base;
        // The character box is the base of the accent group
        base = group.value.base;
        // Stick the character box into the base of the supsub group
        supsub.value.base = base;

        // Rerender the supsub group with its new base, and store that
        // result.
        supsubGroup = buildGroup(
            supsub, options.reset(), prev);
    }

    // Build the base group
    var body = buildGroup(
        base, options.withStyle(options.style.cramp()));

    // Calculate the skew of the accent. This is based on the line "If the
    // nucleus is not a single character, let s = 0; otherwise set s to the
    // kern amount for the nucleus followed by the \skewchar of its font."
    // Note that our skew metrics are just the kern between each character
    // and the skewchar.
    var skew;
    if (isCharacterBox(base)) {
        // If the base is a character box, then we want the skew of the
        // innermost character. To do that, we find the innermost character:
        var baseChar = getBaseElem(base);
        // Then, we render its group to get the symbol inside it
        var baseGroup = buildGroup(
            baseChar, options.withStyle(options.style.cramp()));
        // Finally, we pull the skew off of the symbol.
        skew = baseGroup.skew;
        // Note that we now throw away baseGroup, because the layers we
        // removed with getBaseElem might contain things like \color which
        // we can't get rid of.
        // TODO(emily): Find a better way to get the skew
    } else {
        skew = 0;
    }

    // calculate the amount of space between the body and the accent
    var clearance = Math.min(body.height, fontMetrics.metrics.xHeight);

    // Build the accent
    var accent = buildCommon.makeSymbol(
        group.value.accent, "Main-Regular", "math", options.getColor());
    // Remove the italic correction of the accent, because it only serves to
    // shift the accent over to a place we don't want.
    accent.italic = 0;

    // The \vec character that the fonts use is a combining character, and
    // thus shows up much too far to the left. To account for this, we add a
    // specific class which shifts the accent over to where we want it.
    // TODO(emily): Fix this in a better way, like by changing the font
    var vecClass = group.value.accent === "\\vec" ? "accent-vec" : null;

    var accentBody = makeSpan(["accent-body", vecClass], [
        makeSpan([], [accent])]);

    accentBody = buildCommon.makeVList([
        {type: "elem", elem: body},
        {type: "kern", size: -clearance},
        {type: "elem", elem: accentBody},
    ], "firstBaseline", null, options);

    // Shift the accent over by the skew. Note we shift by twice the skew
    // because we are centering the accent, so by adding 2*skew to the left,
    // we shift it to the right by 1*skew.
    accentBody.children[1].style.marginLeft = 2 * skew + "em";

    var accentWrap = makeSpan(["mord", "accent"], [accentBody]);

    if (supsubGroup) {
        // Here, we replace the "base" child of the supsub with our newly
        // generated accent.
        supsubGroup.children[0] = accentWrap;

        // Since we don't rerun the height calculation after replacing the
        // accent, we manually recalculate height.
        supsubGroup.height = Math.max(accentWrap.height, supsubGroup.height);

        // Accents should always be ords, even when their innards are not.
        supsubGroup.classes[0] = "mord";

        return supsubGroup;
    } else {
        return accentWrap;
    }
};

groupTypes.phantom = function(group, options, prev) {
    var elements = buildExpression(
        group.value.value,
        options.withPhantom(),
        prev
    );

    // \phantom isn't supposed to affect the elements it contains.
    // See "color" for more details.
    return new buildCommon.makeFragment(elements);
};

/**
 * buildGroup is the function that takes a group and calls the correct groupType
 * function for it. It also handles the interaction of size and style changes
 * between parents and children.
 */
var buildGroup = function(group, options, prev) {
    if (!group) {
        return makeSpan();
    }

    if (groupTypes[group.type]) {
        // Call the groupTypes function
        var groupNode = groupTypes[group.type](group, options, prev);
        var multiplier;

        // If the style changed between the parent and the current group,
        // account for the size difference
        if (options.style !== options.parentStyle) {
            multiplier = options.style.sizeMultiplier /
                    options.parentStyle.sizeMultiplier;

            groupNode.height *= multiplier;
            groupNode.depth *= multiplier;
        }

        // If the size changed between the parent and the current group, account
        // for that size difference.
        if (options.size !== options.parentSize) {
            multiplier = buildCommon.sizingMultiplier[options.size] /
                    buildCommon.sizingMultiplier[options.parentSize];

            groupNode.height *= multiplier;
            groupNode.depth *= multiplier;
        }

        return groupNode;
    } else {
        throw new ParseError(
            "Got group of unknown type: '" + group.type + "'");
    }
};

/**
 * Take an entire parse tree, and build it into an appropriate set of HTML
 * nodes.
 */
var buildHTML = function(tree, options) {
    // buildExpression is destructive, so we need to make a clone
    // of the incoming tree so that it isn't accidentally changed
    tree = JSON.parse(JSON.stringify(tree));

    // Build the expression contained in the tree
    var expression = buildExpression(tree, options);
    var body = makeSpan(["base", options.style.cls()], expression);

    // Add struts, which ensure that the top of the HTML element falls at the
    // height of the expression, and the bottom of the HTML element falls at the
    // depth of the expression.
    var topStrut = makeSpan(["strut"]);
    var bottomStrut = makeSpan(["strut", "bottom"]);

    topStrut.style.height = body.height + "em";
    bottomStrut.style.height = (body.height + body.depth) + "em";
    // We'd like to use `vertical-align: top` but in IE 9 this lowers the
    // baseline of the box to the bottom of this strut (instead staying in the
    // normal place) so we use an absolute value for vertical-align instead
    bottomStrut.style.verticalAlign = -body.depth + "em";

    // Wrap the struts and body together
    var htmlNode = makeSpan(["katex-html"], [topStrut, bottomStrut, body]);

    htmlNode.setAttribute("aria-hidden", "true");

    return htmlNode;
};

module.exports = buildHTML;


/***/ }),

/***/ "5oZ/":
/***/ (function(module, exports, __webpack_require__) {

/**
 * This file converts a parse tree into a cooresponding MathML tree. The main
 * entry point is the `buildMathML` function, which takes a parse tree from the
 * parser.
 */

var buildCommon = __webpack_require__("ybOZ");
var fontMetrics = __webpack_require__("zJjT");
var mathMLTree = __webpack_require__("UGEY");
var ParseError = __webpack_require__("E0m9");
var symbols = __webpack_require__("FdGB");
var utils = __webpack_require__("s847");

var makeSpan = buildCommon.makeSpan;
var fontMap = buildCommon.fontMap;

/**
 * Takes a symbol and converts it into a MathML text node after performing
 * optional replacement from symbols.js.
 */
var makeText = function(text, mode) {
    if (symbols[mode][text] && symbols[mode][text].replace) {
        text = symbols[mode][text].replace;
    }

    return new mathMLTree.TextNode(text);
};

/**
 * Returns the math variant as a string or null if none is required.
 */
var getVariant = function(group, options) {
    var font = options.font;
    if (!font) {
        return null;
    }

    var mode = group.mode;
    if (font === "mathit") {
        return "italic";
    }

    var value = group.value;
    if (utils.contains(["\\imath", "\\jmath"], value)) {
        return null;
    }

    if (symbols[mode][value] && symbols[mode][value].replace) {
        value = symbols[mode][value].replace;
    }

    var fontName = fontMap[font].fontName;
    if (fontMetrics.getCharacterMetrics(value, fontName)) {
        return fontMap[options.font].variant;
    }

    return null;
};

/**
 * Functions for handling the different types of groups found in the parse
 * tree. Each function should take a parse group and return a MathML node.
 */
var groupTypes = {};

groupTypes.mathord = function(group, options) {
    var node = new mathMLTree.MathNode(
        "mi",
        [makeText(group.value, group.mode)]);

    var variant = getVariant(group, options);
    if (variant) {
        node.setAttribute("mathvariant", variant);
    }
    return node;
};

groupTypes.textord = function(group, options) {
    var text = makeText(group.value, group.mode);

    var variant = getVariant(group, options) || "normal";

    var node;
    if (/[0-9]/.test(group.value)) {
        // TODO(kevinb) merge adjacent <mn> nodes
        // do it as a post processing step
        node = new mathMLTree.MathNode("mn", [text]);
        if (options.font) {
            node.setAttribute("mathvariant", variant);
        }
    } else {
        node = new mathMLTree.MathNode("mi", [text]);
        node.setAttribute("mathvariant", variant);
    }

    return node;
};

groupTypes.bin = function(group) {
    var node = new mathMLTree.MathNode(
        "mo", [makeText(group.value, group.mode)]);

    return node;
};

groupTypes.rel = function(group) {
    var node = new mathMLTree.MathNode(
        "mo", [makeText(group.value, group.mode)]);

    return node;
};

groupTypes.open = function(group) {
    var node = new mathMLTree.MathNode(
        "mo", [makeText(group.value, group.mode)]);

    return node;
};

groupTypes.close = function(group) {
    var node = new mathMLTree.MathNode(
        "mo", [makeText(group.value, group.mode)]);

    return node;
};

groupTypes.inner = function(group) {
    var node = new mathMLTree.MathNode(
        "mo", [makeText(group.value, group.mode)]);

    return node;
};

groupTypes.punct = function(group) {
    var node = new mathMLTree.MathNode(
        "mo", [makeText(group.value, group.mode)]);

    node.setAttribute("separator", "true");

    return node;
};

groupTypes.ordgroup = function(group, options) {
    var inner = buildExpression(group.value, options);

    var node = new mathMLTree.MathNode("mrow", inner);

    return node;
};

groupTypes.text = function(group, options) {
    var inner = buildExpression(group.value.body, options);

    var node = new mathMLTree.MathNode("mtext", inner);

    return node;
};

groupTypes.color = function(group, options) {
    var inner = buildExpression(group.value.value, options);

    var node = new mathMLTree.MathNode("mstyle", inner);

    node.setAttribute("mathcolor", group.value.color);

    return node;
};

groupTypes.supsub = function(group, options) {
    var children = [buildGroup(group.value.base, options)];

    if (group.value.sub) {
        children.push(buildGroup(group.value.sub, options));
    }

    if (group.value.sup) {
        children.push(buildGroup(group.value.sup, options));
    }

    var nodeType;
    if (!group.value.sub) {
        nodeType = "msup";
    } else if (!group.value.sup) {
        nodeType = "msub";
    } else {
        nodeType = "msubsup";
    }

    var node = new mathMLTree.MathNode(nodeType, children);

    return node;
};

groupTypes.genfrac = function(group, options) {
    var node = new mathMLTree.MathNode(
        "mfrac",
        [buildGroup(group.value.numer, options),
         buildGroup(group.value.denom, options)]);

    if (!group.value.hasBarLine) {
        node.setAttribute("linethickness", "0px");
    }

    if (group.value.leftDelim != null || group.value.rightDelim != null) {
        var withDelims = [];

        if (group.value.leftDelim != null) {
            var leftOp = new mathMLTree.MathNode(
                "mo", [new mathMLTree.TextNode(group.value.leftDelim)]);

            leftOp.setAttribute("fence", "true");

            withDelims.push(leftOp);
        }

        withDelims.push(node);

        if (group.value.rightDelim != null) {
            var rightOp = new mathMLTree.MathNode(
                "mo", [new mathMLTree.TextNode(group.value.rightDelim)]);

            rightOp.setAttribute("fence", "true");

            withDelims.push(rightOp);
        }

        var outerNode = new mathMLTree.MathNode("mrow", withDelims);

        return outerNode;
    }

    return node;
};

groupTypes.array = function(group, options) {
    return new mathMLTree.MathNode(
        "mtable", group.value.body.map(function(row) {
            return new mathMLTree.MathNode(
                "mtr", row.map(function(cell) {
                    return new mathMLTree.MathNode(
                        "mtd", [buildGroup(cell, options)]);
                }));
        }));
};

groupTypes.sqrt = function(group, options) {
    var node;
    if (group.value.index) {
        node = new mathMLTree.MathNode(
            "mroot", [
                buildGroup(group.value.body, options),
                buildGroup(group.value.index, options),
            ]);
    } else {
        node = new mathMLTree.MathNode(
            "msqrt", [buildGroup(group.value.body, options)]);
    }

    return node;
};

groupTypes.leftright = function(group, options) {
    var inner = buildExpression(group.value.body, options);

    if (group.value.left !== ".") {
        var leftNode = new mathMLTree.MathNode(
            "mo", [makeText(group.value.left, group.mode)]);

        leftNode.setAttribute("fence", "true");

        inner.unshift(leftNode);
    }

    if (group.value.right !== ".") {
        var rightNode = new mathMLTree.MathNode(
            "mo", [makeText(group.value.right, group.mode)]);

        rightNode.setAttribute("fence", "true");

        inner.push(rightNode);
    }

    var outerNode = new mathMLTree.MathNode("mrow", inner);

    return outerNode;
};

groupTypes.accent = function(group, options) {
    var accentNode = new mathMLTree.MathNode(
        "mo", [makeText(group.value.accent, group.mode)]);

    var node = new mathMLTree.MathNode(
        "mover",
        [buildGroup(group.value.base, options),
         accentNode]);

    node.setAttribute("accent", "true");

    return node;
};

groupTypes.spacing = function(group) {
    var node;

    if (group.value === "\\ " || group.value === "\\space" ||
        group.value === " " || group.value === "~") {
        node = new mathMLTree.MathNode(
            "mtext", [new mathMLTree.TextNode("\u00a0")]);
    } else {
        node = new mathMLTree.MathNode("mspace");

        node.setAttribute(
            "width", buildCommon.spacingFunctions[group.value].size);
    }

    return node;
};

groupTypes.op = function(group) {
    var node;

    // TODO(emily): handle big operators using the `largeop` attribute

    if (group.value.symbol) {
        // This is a symbol. Just add the symbol.
        node = new mathMLTree.MathNode(
            "mo", [makeText(group.value.body, group.mode)]);
    } else {
        // This is a text operator. Add all of the characters from the
        // operator's name.
        // TODO(emily): Add a space in the middle of some of these
        // operators, like \limsup.
        node = new mathMLTree.MathNode(
            "mi", [new mathMLTree.TextNode(group.value.body.slice(1))]);
    }

    return node;
};

groupTypes.katex = function(group) {
    var node = new mathMLTree.MathNode(
        "mtext", [new mathMLTree.TextNode("KaTeX")]);

    return node;
};

groupTypes.font = function(group, options) {
    var font = group.value.font;
    return buildGroup(group.value.body, options.withFont(font));
};

groupTypes.delimsizing = function(group) {
    var children = [];

    if (group.value.value !== ".") {
        children.push(makeText(group.value.value, group.mode));
    }

    var node = new mathMLTree.MathNode("mo", children);

    if (group.value.delimType === "open" ||
        group.value.delimType === "close") {
        // Only some of the delimsizing functions act as fences, and they
        // return "open" or "close" delimTypes.
        node.setAttribute("fence", "true");
    } else {
        // Explicitly disable fencing if it's not a fence, to override the
        // defaults.
        node.setAttribute("fence", "false");
    }

    return node;
};

groupTypes.styling = function(group, options) {
    var inner = buildExpression(group.value.value, options);

    var node = new mathMLTree.MathNode("mstyle", inner);

    var styleAttributes = {
        "display": ["0", "true"],
        "text": ["0", "false"],
        "script": ["1", "false"],
        "scriptscript": ["2", "false"],
    };

    var attr = styleAttributes[group.value.style];

    node.setAttribute("scriptlevel", attr[0]);
    node.setAttribute("displaystyle", attr[1]);

    return node;
};

groupTypes.sizing = function(group, options) {
    var inner = buildExpression(group.value.value, options);

    var node = new mathMLTree.MathNode("mstyle", inner);

    // TODO(emily): This doesn't produce the correct size for nested size
    // changes, because we don't keep state of what style we're currently
    // in, so we can't reset the size to normal before changing it.  Now
    // that we're passing an options parameter we should be able to fix
    // this.
    node.setAttribute(
        "mathsize", buildCommon.sizingMultiplier[group.value.size] + "em");

    return node;
};

groupTypes.overline = function(group, options) {
    var operator = new mathMLTree.MathNode(
        "mo", [new mathMLTree.TextNode("\u203e")]);
    operator.setAttribute("stretchy", "true");

    var node = new mathMLTree.MathNode(
        "mover",
        [buildGroup(group.value.body, options),
         operator]);
    node.setAttribute("accent", "true");

    return node;
};

groupTypes.underline = function(group, options) {
    var operator = new mathMLTree.MathNode(
        "mo", [new mathMLTree.TextNode("\u203e")]);
    operator.setAttribute("stretchy", "true");

    var node = new mathMLTree.MathNode(
        "munder",
        [buildGroup(group.value.body, options),
         operator]);
    node.setAttribute("accentunder", "true");

    return node;
};

groupTypes.rule = function(group) {
    // TODO(emily): Figure out if there's an actual way to draw black boxes
    // in MathML.
    var node = new mathMLTree.MathNode("mrow");

    return node;
};

groupTypes.llap = function(group, options) {
    var node = new mathMLTree.MathNode(
        "mpadded", [buildGroup(group.value.body, options)]);

    node.setAttribute("lspace", "-1width");
    node.setAttribute("width", "0px");

    return node;
};

groupTypes.rlap = function(group, options) {
    var node = new mathMLTree.MathNode(
        "mpadded", [buildGroup(group.value.body, options)]);

    node.setAttribute("width", "0px");

    return node;
};

groupTypes.phantom = function(group, options, prev) {
    var inner = buildExpression(group.value.value, options);
    return new mathMLTree.MathNode("mphantom", inner);
};

/**
 * Takes a list of nodes, builds them, and returns a list of the generated
 * MathML nodes. A little simpler than the HTML version because we don't do any
 * previous-node handling.
 */
var buildExpression = function(expression, options) {
    var groups = [];
    for (var i = 0; i < expression.length; i++) {
        var group = expression[i];
        groups.push(buildGroup(group, options));
    }
    return groups;
};

/**
 * Takes a group from the parser and calls the appropriate groupTypes function
 * on it to produce a MathML node.
 */
var buildGroup = function(group, options) {
    if (!group) {
        return new mathMLTree.MathNode("mrow");
    }

    if (groupTypes[group.type]) {
        // Call the groupTypes function
        return groupTypes[group.type](group, options);
    } else {
        throw new ParseError(
            "Got group of unknown type: '" + group.type + "'");
    }
};

/**
 * Takes a full parse tree and settings and builds a MathML representation of
 * it. In particular, we put the elements from building the parse tree into a
 * <semantics> tag so we can also include that TeX source as an annotation.
 *
 * Note that we actually return a domTree element with a `<math>` inside it so
 * we can do appropriate styling.
 */
var buildMathML = function(tree, texExpression, options) {
    var expression = buildExpression(tree, options);

    // Wrap up the expression in an mrow so it is presented in the semantics
    // tag correctly.
    var wrapper = new mathMLTree.MathNode("mrow", expression);

    // Build a TeX annotation of the source
    var annotation = new mathMLTree.MathNode(
        "annotation", [new mathMLTree.TextNode(texExpression)]);

    annotation.setAttribute("encoding", "application/x-tex");

    var semantics = new mathMLTree.MathNode(
        "semantics", [wrapper, annotation]);

    var math = new mathMLTree.MathNode("math", [semantics]);

    // You can't style <math> nodes, so we wrap the node in a span.
    return makeSpan(["katex-mathml"], [math]);
};

module.exports = buildMathML;


/***/ }),

/***/ "6lZC":
/***/ (function(module, exports, __webpack_require__) {

/**
 * This file deals with creating delimiters of various sizes. The TeXbook
 * discusses these routines on page 441-442, in the "Another subroutine sets box
 * x to a specified variable delimiter" paragraph.
 *
 * There are three main routines here. `makeSmallDelim` makes a delimiter in the
 * normal font, but in either text, script, or scriptscript style.
 * `makeLargeDelim` makes a delimiter in textstyle, but in one of the Size1,
 * Size2, Size3, or Size4 fonts. `makeStackedDelim` makes a delimiter out of
 * smaller pieces that are stacked on top of one another.
 *
 * The functions take a parameter `center`, which determines if the delimiter
 * should be centered around the axis.
 *
 * Then, there are three exposed functions. `sizedDelim` makes a delimiter in
 * one of the given sizes. This is used for things like `\bigl`.
 * `customSizedDelim` makes a delimiter with a given total height+depth. It is
 * called in places like `\sqrt`. `leftRightDelim` makes an appropriate
 * delimiter which surrounds an expression of a given height an depth. It is
 * used in `\left` and `\right`.
 */

var ParseError = __webpack_require__("E0m9");
var Style = __webpack_require__("aNjz");

var buildCommon = __webpack_require__("ybOZ");
var fontMetrics = __webpack_require__("zJjT");
var symbols = __webpack_require__("FdGB");
var utils = __webpack_require__("s847");

var makeSpan = buildCommon.makeSpan;

/**
 * Get the metrics for a given symbol and font, after transformation (i.e.
 * after following replacement from symbols.js)
 */
var getMetrics = function(symbol, font) {
    if (symbols.math[symbol] && symbols.math[symbol].replace) {
        return fontMetrics.getCharacterMetrics(
            symbols.math[symbol].replace, font);
    } else {
        return fontMetrics.getCharacterMetrics(
            symbol, font);
    }
};

/**
 * Builds a symbol in the given font size (note size is an integer)
 */
var mathrmSize = function(value, size, mode) {
    return buildCommon.makeSymbol(value, "Size" + size + "-Regular", mode);
};

/**
 * Puts a delimiter span in a given style, and adds appropriate height, depth,
 * and maxFontSizes.
 */
var styleWrap = function(delim, toStyle, options) {
    var span = makeSpan(
        ["style-wrap", options.style.reset(), toStyle.cls()], [delim]);

    var multiplier = toStyle.sizeMultiplier / options.style.sizeMultiplier;

    span.height *= multiplier;
    span.depth *= multiplier;
    span.maxFontSize = toStyle.sizeMultiplier;

    return span;
};

/**
 * Makes a small delimiter. This is a delimiter that comes in the Main-Regular
 * font, but is restyled to either be in textstyle, scriptstyle, or
 * scriptscriptstyle.
 */
var makeSmallDelim = function(delim, style, center, options, mode) {
    var text = buildCommon.makeSymbol(delim, "Main-Regular", mode);

    var span = styleWrap(text, style, options);

    if (center) {
        var shift =
            (1 - options.style.sizeMultiplier / style.sizeMultiplier) *
            fontMetrics.metrics.axisHeight;

        span.style.top = shift + "em";
        span.height -= shift;
        span.depth += shift;
    }

    return span;
};

/**
 * Makes a large delimiter. This is a delimiter that comes in the Size1, Size2,
 * Size3, or Size4 fonts. It is always rendered in textstyle.
 */
var makeLargeDelim = function(delim, size, center, options, mode) {
    var inner = mathrmSize(delim, size, mode);

    var span = styleWrap(
        makeSpan(["delimsizing", "size" + size],
                 [inner], options.getColor()),
        Style.TEXT, options);

    if (center) {
        var shift = (1 - options.style.sizeMultiplier) *
            fontMetrics.metrics.axisHeight;

        span.style.top = shift + "em";
        span.height -= shift;
        span.depth += shift;
    }

    return span;
};

/**
 * Make an inner span with the given offset and in the given font. This is used
 * in `makeStackedDelim` to make the stacking pieces for the delimiter.
 */
var makeInner = function(symbol, font, mode) {
    var sizeClass;
    // Apply the correct CSS class to choose the right font.
    if (font === "Size1-Regular") {
        sizeClass = "delim-size1";
    } else if (font === "Size4-Regular") {
        sizeClass = "delim-size4";
    }

    var inner = makeSpan(
        ["delimsizinginner", sizeClass],
        [makeSpan([], [buildCommon.makeSymbol(symbol, font, mode)])]);

    // Since this will be passed into `makeVList` in the end, wrap the element
    // in the appropriate tag that VList uses.
    return {type: "elem", elem: inner};
};

/**
 * Make a stacked delimiter out of a given delimiter, with the total height at
 * least `heightTotal`. This routine is mentioned on page 442 of the TeXbook.
 */
var makeStackedDelim = function(delim, heightTotal, center, options, mode) {
    // There are four parts, the top, an optional middle, a repeated part, and a
    // bottom.
    var top;
    var middle;
    var repeat;
    var bottom;
    top = repeat = bottom = delim;
    middle = null;
    // Also keep track of what font the delimiters are in
    var font = "Size1-Regular";

    // We set the parts and font based on the symbol. Note that we use
    // '\u23d0' instead of '|' and '\u2016' instead of '\\|' for the
    // repeats of the arrows
    if (delim === "\\uparrow") {
        repeat = bottom = "\u23d0";
    } else if (delim === "\\Uparrow") {
        repeat = bottom = "\u2016";
    } else if (delim === "\\downarrow") {
        top = repeat = "\u23d0";
    } else if (delim === "\\Downarrow") {
        top = repeat = "\u2016";
    } else if (delim === "\\updownarrow") {
        top = "\\uparrow";
        repeat = "\u23d0";
        bottom = "\\downarrow";
    } else if (delim === "\\Updownarrow") {
        top = "\\Uparrow";
        repeat = "\u2016";
        bottom = "\\Downarrow";
    } else if (delim === "[" || delim === "\\lbrack") {
        top = "\u23a1";
        repeat = "\u23a2";
        bottom = "\u23a3";
        font = "Size4-Regular";
    } else if (delim === "]" || delim === "\\rbrack") {
        top = "\u23a4";
        repeat = "\u23a5";
        bottom = "\u23a6";
        font = "Size4-Regular";
    } else if (delim === "\\lfloor") {
        repeat = top = "\u23a2";
        bottom = "\u23a3";
        font = "Size4-Regular";
    } else if (delim === "\\lceil") {
        top = "\u23a1";
        repeat = bottom = "\u23a2";
        font = "Size4-Regular";
    } else if (delim === "\\rfloor") {
        repeat = top = "\u23a5";
        bottom = "\u23a6";
        font = "Size4-Regular";
    } else if (delim === "\\rceil") {
        top = "\u23a4";
        repeat = bottom = "\u23a5";
        font = "Size4-Regular";
    } else if (delim === "(") {
        top = "\u239b";
        repeat = "\u239c";
        bottom = "\u239d";
        font = "Size4-Regular";
    } else if (delim === ")") {
        top = "\u239e";
        repeat = "\u239f";
        bottom = "\u23a0";
        font = "Size4-Regular";
    } else if (delim === "\\{" || delim === "\\lbrace") {
        top = "\u23a7";
        middle = "\u23a8";
        bottom = "\u23a9";
        repeat = "\u23aa";
        font = "Size4-Regular";
    } else if (delim === "\\}" || delim === "\\rbrace") {
        top = "\u23ab";
        middle = "\u23ac";
        bottom = "\u23ad";
        repeat = "\u23aa";
        font = "Size4-Regular";
    } else if (delim === "\\lgroup") {
        top = "\u23a7";
        bottom = "\u23a9";
        repeat = "\u23aa";
        font = "Size4-Regular";
    } else if (delim === "\\rgroup") {
        top = "\u23ab";
        bottom = "\u23ad";
        repeat = "\u23aa";
        font = "Size4-Regular";
    } else if (delim === "\\lmoustache") {
        top = "\u23a7";
        bottom = "\u23ad";
        repeat = "\u23aa";
        font = "Size4-Regular";
    } else if (delim === "\\rmoustache") {
        top = "\u23ab";
        bottom = "\u23a9";
        repeat = "\u23aa";
        font = "Size4-Regular";
    } else if (delim === "\\surd") {
        top = "\ue001";
        bottom = "\u23b7";
        repeat = "\ue000";
        font = "Size4-Regular";
    }

    // Get the metrics of the four sections
    var topMetrics = getMetrics(top, font);
    var topHeightTotal = topMetrics.height + topMetrics.depth;
    var repeatMetrics = getMetrics(repeat, font);
    var repeatHeightTotal = repeatMetrics.height + repeatMetrics.depth;
    var bottomMetrics = getMetrics(bottom, font);
    var bottomHeightTotal = bottomMetrics.height + bottomMetrics.depth;
    var middleHeightTotal = 0;
    var middleFactor = 1;
    if (middle !== null) {
        var middleMetrics = getMetrics(middle, font);
        middleHeightTotal = middleMetrics.height + middleMetrics.depth;
        middleFactor = 2; // repeat symmetrically above and below middle
    }

    // Calcuate the minimal height that the delimiter can have.
    // It is at least the size of the top, bottom, and optional middle combined.
    var minHeight = topHeightTotal + bottomHeightTotal + middleHeightTotal;

    // Compute the number of copies of the repeat symbol we will need
    var repeatCount = Math.ceil(
        (heightTotal - minHeight) / (middleFactor * repeatHeightTotal));

    // Compute the total height of the delimiter including all the symbols
    var realHeightTotal =
        minHeight + repeatCount * middleFactor * repeatHeightTotal;

    // The center of the delimiter is placed at the center of the axis. Note
    // that in this context, "center" means that the delimiter should be
    // centered around the axis in the current style, while normally it is
    // centered around the axis in textstyle.
    var axisHeight = fontMetrics.metrics.axisHeight;
    if (center) {
        axisHeight *= options.style.sizeMultiplier;
    }
    // Calculate the depth
    var depth = realHeightTotal / 2 - axisHeight;

    // Now, we start building the pieces that will go into the vlist

    // Keep a list of the inner pieces
    var inners = [];

    // Add the bottom symbol
    inners.push(makeInner(bottom, font, mode));

    var i;
    if (middle === null) {
        // Add that many symbols
        for (i = 0; i < repeatCount; i++) {
            inners.push(makeInner(repeat, font, mode));
        }
    } else {
        // When there is a middle bit, we need the middle part and two repeated
        // sections
        for (i = 0; i < repeatCount; i++) {
            inners.push(makeInner(repeat, font, mode));
        }
        inners.push(makeInner(middle, font, mode));
        for (i = 0; i < repeatCount; i++) {
            inners.push(makeInner(repeat, font, mode));
        }
    }

    // Add the top symbol
    inners.push(makeInner(top, font, mode));

    // Finally, build the vlist
    var inner = buildCommon.makeVList(inners, "bottom", depth, options);

    return styleWrap(
        makeSpan(["delimsizing", "mult"], [inner], options.getColor()),
        Style.TEXT, options);
};

// There are three kinds of delimiters, delimiters that stack when they become
// too large
var stackLargeDelimiters = [
    "(", ")", "[", "\\lbrack", "]", "\\rbrack",
    "\\{", "\\lbrace", "\\}", "\\rbrace",
    "\\lfloor", "\\rfloor", "\\lceil", "\\rceil",
    "\\surd",
];

// delimiters that always stack
var stackAlwaysDelimiters = [
    "\\uparrow", "\\downarrow", "\\updownarrow",
    "\\Uparrow", "\\Downarrow", "\\Updownarrow",
    "|", "\\|", "\\vert", "\\Vert",
    "\\lvert", "\\rvert", "\\lVert", "\\rVert",
    "\\lgroup", "\\rgroup", "\\lmoustache", "\\rmoustache",
];

// and delimiters that never stack
var stackNeverDelimiters = [
    "<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt",
];

// Metrics of the different sizes. Found by looking at TeX's output of
// $\bigl| // \Bigl| \biggl| \Biggl| \showlists$
// Used to create stacked delimiters of appropriate sizes in makeSizedDelim.
var sizeToMaxHeight = [0, 1.2, 1.8, 2.4, 3.0];

/**
 * Used to create a delimiter of a specific size, where `size` is 1, 2, 3, or 4.
 */
var makeSizedDelim = function(delim, size, options, mode) {
    // < and > turn into \langle and \rangle in delimiters
    if (delim === "<" || delim === "\\lt") {
        delim = "\\langle";
    } else if (delim === ">" || delim === "\\gt") {
        delim = "\\rangle";
    }

    // Sized delimiters are never centered.
    if (utils.contains(stackLargeDelimiters, delim) ||
        utils.contains(stackNeverDelimiters, delim)) {
        return makeLargeDelim(delim, size, false, options, mode);
    } else if (utils.contains(stackAlwaysDelimiters, delim)) {
        return makeStackedDelim(
            delim, sizeToMaxHeight[size], false, options, mode);
    } else {
        throw new ParseError("Illegal delimiter: '" + delim + "'");
    }
};

/**
 * There are three different sequences of delimiter sizes that the delimiters
 * follow depending on the kind of delimiter. This is used when creating custom
 * sized delimiters to decide whether to create a small, large, or stacked
 * delimiter.
 *
 * In real TeX, these sequences aren't explicitly defined, but are instead
 * defined inside the font metrics. Since there are only three sequences that
 * are possible for the delimiters that TeX defines, it is easier to just encode
 * them explicitly here.
 */

// Delimiters that never stack try small delimiters and large delimiters only
var stackNeverDelimiterSequence = [
    {type: "small", style: Style.SCRIPTSCRIPT},
    {type: "small", style: Style.SCRIPT},
    {type: "small", style: Style.TEXT},
    {type: "large", size: 1},
    {type: "large", size: 2},
    {type: "large", size: 3},
    {type: "large", size: 4},
];

// Delimiters that always stack try the small delimiters first, then stack
var stackAlwaysDelimiterSequence = [
    {type: "small", style: Style.SCRIPTSCRIPT},
    {type: "small", style: Style.SCRIPT},
    {type: "small", style: Style.TEXT},
    {type: "stack"},
];

// Delimiters that stack when large try the small and then large delimiters, and
// stack afterwards
var stackLargeDelimiterSequence = [
    {type: "small", style: Style.SCRIPTSCRIPT},
    {type: "small", style: Style.SCRIPT},
    {type: "small", style: Style.TEXT},
    {type: "large", size: 1},
    {type: "large", size: 2},
    {type: "large", size: 3},
    {type: "large", size: 4},
    {type: "stack"},
];

/**
 * Get the font used in a delimiter based on what kind of delimiter it is.
 */
var delimTypeToFont = function(type) {
    if (type.type === "small") {
        return "Main-Regular";
    } else if (type.type === "large") {
        return "Size" + type.size + "-Regular";
    } else if (type.type === "stack") {
        return "Size4-Regular";
    }
};

/**
 * Traverse a sequence of types of delimiters to decide what kind of delimiter
 * should be used to create a delimiter of the given height+depth.
 */
var traverseSequence = function(delim, height, sequence, options) {
    // Here, we choose the index we should start at in the sequences. In smaller
    // sizes (which correspond to larger numbers in style.size) we start earlier
    // in the sequence. Thus, scriptscript starts at index 3-3=0, script starts
    // at index 3-2=1, text starts at 3-1=2, and display starts at min(2,3-0)=2
    var start = Math.min(2, 3 - options.style.size);
    for (var i = start; i < sequence.length; i++) {
        if (sequence[i].type === "stack") {
            // This is always the last delimiter, so we just break the loop now.
            break;
        }

        var metrics = getMetrics(delim, delimTypeToFont(sequence[i]));
        var heightDepth = metrics.height + metrics.depth;

        // Small delimiters are scaled down versions of the same font, so we
        // account for the style change size.

        if (sequence[i].type === "small") {
            heightDepth *= sequence[i].style.sizeMultiplier;
        }

        // Check if the delimiter at this size works for the given height.
        if (heightDepth > height) {
            return sequence[i];
        }
    }

    // If we reached the end of the sequence, return the last sequence element.
    return sequence[sequence.length - 1];
};

/**
 * Make a delimiter of a given height+depth, with optional centering. Here, we
 * traverse the sequences, and create a delimiter that the sequence tells us to.
 */
var makeCustomSizedDelim = function(delim, height, center, options, mode) {
    if (delim === "<" || delim === "\\lt") {
        delim = "\\langle";
    } else if (delim === ">" || delim === "\\gt") {
        delim = "\\rangle";
    }

    // Decide what sequence to use
    var sequence;
    if (utils.contains(stackNeverDelimiters, delim)) {
        sequence = stackNeverDelimiterSequence;
    } else if (utils.contains(stackLargeDelimiters, delim)) {
        sequence = stackLargeDelimiterSequence;
    } else {
        sequence = stackAlwaysDelimiterSequence;
    }

    // Look through the sequence
    var delimType = traverseSequence(delim, height, sequence, options);

    // Depending on the sequence element we decided on, call the appropriate
    // function.
    if (delimType.type === "small") {
        return makeSmallDelim(delim, delimType.style, center, options, mode);
    } else if (delimType.type === "large") {
        return makeLargeDelim(delim, delimType.size, center, options, mode);
    } else if (delimType.type === "stack") {
        return makeStackedDelim(delim, height, center, options, mode);
    }
};

/**
 * Make a delimiter for use with `\left` and `\right`, given a height and depth
 * of an expression that the delimiters surround.
 */
var makeLeftRightDelim = function(delim, height, depth, options, mode) {
    // We always center \left/\right delimiters, so the axis is always shifted
    var axisHeight =
        fontMetrics.metrics.axisHeight * options.style.sizeMultiplier;

    // Taken from TeX source, tex.web, function make_left_right
    var delimiterFactor = 901;
    var delimiterExtend = 5.0 / fontMetrics.metrics.ptPerEm;

    var maxDistFromAxis = Math.max(
        height - axisHeight, depth + axisHeight);

    var totalHeight = Math.max(
        // In real TeX, calculations are done using integral values which are
        // 65536 per pt, or 655360 per em. So, the division here truncates in
        // TeX but doesn't here, producing different results. If we wanted to
        // exactly match TeX's calculation, we could do
        //   Math.floor(655360 * maxDistFromAxis / 500) *
        //    delimiterFactor / 655360
        // (To see the difference, compare
        //    x^{x^{\left(\rule{0.1em}{0.68em}\right)}}
        // in TeX and KaTeX)
        maxDistFromAxis / 500 * delimiterFactor,
        2 * maxDistFromAxis - delimiterExtend);

    // Finally, we defer to `makeCustomSizedDelim` with our calculated total
    // height
    return makeCustomSizedDelim(delim, totalHeight, true, options, mode);
};

module.exports = {
    sizedDelim: makeSizedDelim,
    customSizedDelim: makeCustomSizedDelim,
    leftRightDelim: makeLeftRightDelim,
};


/***/ }),

/***/ "6sUn":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Provides a single function for parsing an expression using a Parser
 * TODO(emily): Remove this
 */

var Parser = __webpack_require__("bzbY");

/**
 * Parses an expression using a Parser, then returns the parsed result.
 */
var parseTree = function(toParse, settings) {
    var parser = new Parser(toParse, settings);

    return parser.parse();
};

module.exports = parseTree;


/***/ }),

/***/ "DwkR":
/***/ (function(module, exports, __webpack_require__) {

/**
 * These objects store the data about the DOM nodes we create, as well as some
 * extra data. They can then be transformed into real DOM nodes with the
 * `toNode` function or HTML markup using `toMarkup`. They are useful for both
 * storing extra properties on the nodes, as well as providing a way to easily
 * work with the DOM.
 *
 * Similar functions for working with MathML nodes exist in mathMLTree.js.
 */

var utils = __webpack_require__("s847");

/**
 * Create an HTML className based on a list of classes. In addition to joining
 * with spaces, we also remove null or empty classes.
 */
var createClass = function(classes) {
    classes = classes.slice();
    for (var i = classes.length - 1; i >= 0; i--) {
        if (!classes[i]) {
            classes.splice(i, 1);
        }
    }

    return classes.join(" ");
};

/**
 * This node represents a span node, with a className, a list of children, and
 * an inline style. It also contains information about its height, depth, and
 * maxFontSize.
 */
function span(classes, children, height, depth, maxFontSize, style) {
    this.classes = classes || [];
    this.children = children || [];
    this.height = height || 0;
    this.depth = depth || 0;
    this.maxFontSize = maxFontSize || 0;
    this.style = style || {};
    this.attributes = {};
}

/**
 * Sets an arbitrary attribute on the span. Warning: use this wisely. Not all
 * browsers support attributes the same, and having too many custom attributes
 * is probably bad.
 */
span.prototype.setAttribute = function(attribute, value) {
    this.attributes[attribute] = value;
};

/**
 * Convert the span into an HTML node
 */
span.prototype.toNode = function() {
    var span = document.createElement("span");

    // Apply the class
    span.className = createClass(this.classes);

    // Apply inline styles
    for (var style in this.style) {
        if (Object.prototype.hasOwnProperty.call(this.style, style)) {
            span.style[style] = this.style[style];
        }
    }

    // Apply attributes
    for (var attr in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
            span.setAttribute(attr, this.attributes[attr]);
        }
    }

    // Append the children, also as HTML nodes
    for (var i = 0; i < this.children.length; i++) {
        span.appendChild(this.children[i].toNode());
    }

    return span;
};

/**
 * Convert the span into an HTML markup string
 */
span.prototype.toMarkup = function() {
    var markup = "<span";

    // Add the class
    if (this.classes.length) {
        markup += " class=\"";
        markup += utils.escape(createClass(this.classes));
        markup += "\"";
    }

    var styles = "";

    // Add the styles, after hyphenation
    for (var style in this.style) {
        if (this.style.hasOwnProperty(style)) {
            styles += utils.hyphenate(style) + ":" + this.style[style] + ";";
        }
    }

    if (styles) {
        markup += " style=\"" + utils.escape(styles) + "\"";
    }

    // Add the attributes
    for (var attr in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
            markup += " " + attr + "=\"";
            markup += utils.escape(this.attributes[attr]);
            markup += "\"";
        }
    }

    markup += ">";

    // Add the markup of the children, also as markup
    for (var i = 0; i < this.children.length; i++) {
        markup += this.children[i].toMarkup();
    }

    markup += "</span>";

    return markup;
};

/**
 * This node represents a document fragment, which contains elements, but when
 * placed into the DOM doesn't have any representation itself. Thus, it only
 * contains children and doesn't have any HTML properties. It also keeps track
 * of a height, depth, and maxFontSize.
 */
function documentFragment(children, height, depth, maxFontSize) {
    this.children = children || [];
    this.height = height || 0;
    this.depth = depth || 0;
    this.maxFontSize = maxFontSize || 0;
}

/**
 * Convert the fragment into a node
 */
documentFragment.prototype.toNode = function() {
    // Create a fragment
    var frag = document.createDocumentFragment();

    // Append the children
    for (var i = 0; i < this.children.length; i++) {
        frag.appendChild(this.children[i].toNode());
    }

    return frag;
};

/**
 * Convert the fragment into HTML markup
 */
documentFragment.prototype.toMarkup = function() {
    var markup = "";

    // Simply concatenate the markup for the children together
    for (var i = 0; i < this.children.length; i++) {
        markup += this.children[i].toMarkup();
    }

    return markup;
};

/**
 * A symbol node contains information about a single symbol. It either renders
 * to a single text node, or a span with a single text node in it, depending on
 * whether it has CSS classes, styles, or needs italic correction.
 */
function symbolNode(value, height, depth, italic, skew, classes, style) {
    this.value = value || "";
    this.height = height || 0;
    this.depth = depth || 0;
    this.italic = italic || 0;
    this.skew = skew || 0;
    this.classes = classes || [];
    this.style = style || {};
    this.maxFontSize = 0;
}

/**
 * Creates a text node or span from a symbol node. Note that a span is only
 * created if it is needed.
 */
symbolNode.prototype.toNode = function() {
    var node = document.createTextNode(this.value);
    var span = null;

    if (this.italic > 0) {
        span = document.createElement("span");
        span.style.marginRight = this.italic + "em";
    }

    if (this.classes.length > 0) {
        span = span || document.createElement("span");
        span.className = createClass(this.classes);
    }

    for (var style in this.style) {
        if (this.style.hasOwnProperty(style)) {
            span = span || document.createElement("span");
            span.style[style] = this.style[style];
        }
    }

    if (span) {
        span.appendChild(node);
        return span;
    } else {
        return node;
    }
};

/**
 * Creates markup for a symbol node.
 */
symbolNode.prototype.toMarkup = function() {
    // TODO(alpert): More duplication than I'd like from
    // span.prototype.toMarkup and symbolNode.prototype.toNode...
    var needsSpan = false;

    var markup = "<span";

    if (this.classes.length) {
        needsSpan = true;
        markup += " class=\"";
        markup += utils.escape(createClass(this.classes));
        markup += "\"";
    }

    var styles = "";

    if (this.italic > 0) {
        styles += "margin-right:" + this.italic + "em;";
    }
    for (var style in this.style) {
        if (this.style.hasOwnProperty(style)) {
            styles += utils.hyphenate(style) + ":" + this.style[style] + ";";
        }
    }

    if (styles) {
        needsSpan = true;
        markup += " style=\"" + utils.escape(styles) + "\"";
    }

    var escaped = utils.escape(this.value);
    if (needsSpan) {
        markup += ">";
        markup += escaped;
        markup += "</span>";
        return markup;
    } else {
        return escaped;
    }
};

module.exports = {
    span: span,
    documentFragment: documentFragment,
    symbolNode: symbolNode,
};


/***/ }),

/***/ "FdGB":
/***/ (function(module, exports) {

/**
 * This file holds a list of all no-argument functions and single-character
 * symbols (like 'a' or ';').
 *
 * For each of the symbols, there are three properties they can have:
 * - font (required): the font to be used for this symbol. Either "main" (the
     normal font), or "ams" (the ams fonts).
 * - group (required): the ParseNode group type the symbol should have (i.e.
     "textord", "mathord", etc).
     See https://github.com/Khan/KaTeX/wiki/Examining-TeX#group-types
 * - replace: the character that this symbol or function should be
 *   replaced with (i.e. "\phi" has a replace value of "\u03d5", the phi
 *   character in the main font).
 *
 * The outermost map in the table indicates what mode the symbols should be
 * accepted in (e.g. "math" or "text").
 */

module.exports = {
    math: {},
    text: {},
};

function defineSymbol(mode, font, group, replace, name) {
    module.exports[mode][name] = {
        font: font,
        group: group,
        replace: replace,
    };
}

// Some abbreviations for commonly used strings.
// This helps minify the code, and also spotting typos using jshint.

// modes:
var math = "math";
var text = "text";

// fonts:
var main = "main";
var ams = "ams";

// groups:
var accent = "accent";
var bin = "bin";
var close = "close";
var inner = "inner";
var mathord = "mathord";
var op = "op";
var open = "open";
var punct = "punct";
var rel = "rel";
var spacing = "spacing";
var textord = "textord";

// Now comes the symbol table

// Relation Symbols
defineSymbol(math, main, rel, "\u2261", "\\equiv");
defineSymbol(math, main, rel, "\u227a", "\\prec");
defineSymbol(math, main, rel, "\u227b", "\\succ");
defineSymbol(math, main, rel, "\u223c", "\\sim");
defineSymbol(math, main, rel, "\u22a5", "\\perp");
defineSymbol(math, main, rel, "\u2aaf", "\\preceq");
defineSymbol(math, main, rel, "\u2ab0", "\\succeq");
defineSymbol(math, main, rel, "\u2243", "\\simeq");
defineSymbol(math, main, rel, "\u2223", "\\mid");
defineSymbol(math, main, rel, "\u226a", "\\ll");
defineSymbol(math, main, rel, "\u226b", "\\gg");
defineSymbol(math, main, rel, "\u224d", "\\asymp");
defineSymbol(math, main, rel, "\u2225", "\\parallel");
defineSymbol(math, main, rel, "\u22c8", "\\bowtie");
defineSymbol(math, main, rel, "\u2323", "\\smile");
defineSymbol(math, main, rel, "\u2291", "\\sqsubseteq");
defineSymbol(math, main, rel, "\u2292", "\\sqsupseteq");
defineSymbol(math, main, rel, "\u2250", "\\doteq");
defineSymbol(math, main, rel, "\u2322", "\\frown");
defineSymbol(math, main, rel, "\u220b", "\\ni");
defineSymbol(math, main, rel, "\u221d", "\\propto");
defineSymbol(math, main, rel, "\u22a2", "\\vdash");
defineSymbol(math, main, rel, "\u22a3", "\\dashv");
defineSymbol(math, main, rel, "\u220b", "\\owns");

// Punctuation
defineSymbol(math, main, punct, "\u002e", "\\ldotp");
defineSymbol(math, main, punct, "\u22c5", "\\cdotp");

// Misc Symbols
defineSymbol(math, main, textord, "\u0023", "\\#");
defineSymbol(math, main, textord, "\u0026", "\\&");
defineSymbol(math, main, textord, "\u2135", "\\aleph");
defineSymbol(math, main, textord, "\u2200", "\\forall");
defineSymbol(math, main, textord, "\u210f", "\\hbar");
defineSymbol(math, main, textord, "\u2203", "\\exists");
defineSymbol(math, main, textord, "\u2207", "\\nabla");
defineSymbol(math, main, textord, "\u266d", "\\flat");
defineSymbol(math, main, textord, "\u2113", "\\ell");
defineSymbol(math, main, textord, "\u266e", "\\natural");
defineSymbol(math, main, textord, "\u2663", "\\clubsuit");
defineSymbol(math, main, textord, "\u2118", "\\wp");
defineSymbol(math, main, textord, "\u266f", "\\sharp");
defineSymbol(math, main, textord, "\u2662", "\\diamondsuit");
defineSymbol(math, main, textord, "\u211c", "\\Re");
defineSymbol(math, main, textord, "\u2661", "\\heartsuit");
defineSymbol(math, main, textord, "\u2111", "\\Im");
defineSymbol(math, main, textord, "\u2660", "\\spadesuit");

// Math and Text
defineSymbol(math, main, textord, "\u2020", "\\dag");
defineSymbol(math, main, textord, "\u2021", "\\ddag");

// Large Delimiters
defineSymbol(math, main, close, "\u23b1", "\\rmoustache");
defineSymbol(math, main, open, "\u23b0", "\\lmoustache");
defineSymbol(math, main, close, "\u27ef", "\\rgroup");
defineSymbol(math, main, open, "\u27ee", "\\lgroup");

// Binary Operators
defineSymbol(math, main, bin, "\u2213", "\\mp");
defineSymbol(math, main, bin, "\u2296", "\\ominus");
defineSymbol(math, main, bin, "\u228e", "\\uplus");
defineSymbol(math, main, bin, "\u2293", "\\sqcap");
defineSymbol(math, main, bin, "\u2217", "\\ast");
defineSymbol(math, main, bin, "\u2294", "\\sqcup");
defineSymbol(math, main, bin, "\u25ef", "\\bigcirc");
defineSymbol(math, main, bin, "\u2219", "\\bullet");
defineSymbol(math, main, bin, "\u2021", "\\ddagger");
defineSymbol(math, main, bin, "\u2240", "\\wr");
defineSymbol(math, main, bin, "\u2a3f", "\\amalg");

// Arrow Symbols
defineSymbol(math, main, rel, "\u27f5", "\\longleftarrow");
defineSymbol(math, main, rel, "\u21d0", "\\Leftarrow");
defineSymbol(math, main, rel, "\u27f8", "\\Longleftarrow");
defineSymbol(math, main, rel, "\u27f6", "\\longrightarrow");
defineSymbol(math, main, rel, "\u21d2", "\\Rightarrow");
defineSymbol(math, main, rel, "\u27f9", "\\Longrightarrow");
defineSymbol(math, main, rel, "\u2194", "\\leftrightarrow");
defineSymbol(math, main, rel, "\u27f7", "\\longleftrightarrow");
defineSymbol(math, main, rel, "\u21d4", "\\Leftrightarrow");
defineSymbol(math, main, rel, "\u27fa", "\\Longleftrightarrow");
defineSymbol(math, main, rel, "\u21a6", "\\mapsto");
defineSymbol(math, main, rel, "\u27fc", "\\longmapsto");
defineSymbol(math, main, rel, "\u2197", "\\nearrow");
defineSymbol(math, main, rel, "\u21a9", "\\hookleftarrow");
defineSymbol(math, main, rel, "\u21aa", "\\hookrightarrow");
defineSymbol(math, main, rel, "\u2198", "\\searrow");
defineSymbol(math, main, rel, "\u21bc", "\\leftharpoonup");
defineSymbol(math, main, rel, "\u21c0", "\\rightharpoonup");
defineSymbol(math, main, rel, "\u2199", "\\swarrow");
defineSymbol(math, main, rel, "\u21bd", "\\leftharpoondown");
defineSymbol(math, main, rel, "\u21c1", "\\rightharpoondown");
defineSymbol(math, main, rel, "\u2196", "\\nwarrow");
defineSymbol(math, main, rel, "\u21cc", "\\rightleftharpoons");

// AMS Negated Binary Relations
defineSymbol(math, ams, rel, "\u226e", "\\nless");
defineSymbol(math, ams, rel, "\ue010", "\\nleqslant");
defineSymbol(math, ams, rel, "\ue011", "\\nleqq");
defineSymbol(math, ams, rel, "\u2a87", "\\lneq");
defineSymbol(math, ams, rel, "\u2268", "\\lneqq");
defineSymbol(math, ams, rel, "\ue00c", "\\lvertneqq");
defineSymbol(math, ams, rel, "\u22e6", "\\lnsim");
defineSymbol(math, ams, rel, "\u2a89", "\\lnapprox");
defineSymbol(math, ams, rel, "\u2280", "\\nprec");
defineSymbol(math, ams, rel, "\u22e0", "\\npreceq");
defineSymbol(math, ams, rel, "\u22e8", "\\precnsim");
defineSymbol(math, ams, rel, "\u2ab9", "\\precnapprox");
defineSymbol(math, ams, rel, "\u2241", "\\nsim");
defineSymbol(math, ams, rel, "\ue006", "\\nshortmid");
defineSymbol(math, ams, rel, "\u2224", "\\nmid");
defineSymbol(math, ams, rel, "\u22ac", "\\nvdash");
defineSymbol(math, ams, rel, "\u22ad", "\\nvDash");
defineSymbol(math, ams, rel, "\u22ea", "\\ntriangleleft");
defineSymbol(math, ams, rel, "\u22ec", "\\ntrianglelefteq");
defineSymbol(math, ams, rel, "\u228a", "\\subsetneq");
defineSymbol(math, ams, rel, "\ue01a", "\\varsubsetneq");
defineSymbol(math, ams, rel, "\u2acb", "\\subsetneqq");
defineSymbol(math, ams, rel, "\ue017", "\\varsubsetneqq");
defineSymbol(math, ams, rel, "\u226f", "\\ngtr");
defineSymbol(math, ams, rel, "\ue00f", "\\ngeqslant");
defineSymbol(math, ams, rel, "\ue00e", "\\ngeqq");
defineSymbol(math, ams, rel, "\u2a88", "\\gneq");
defineSymbol(math, ams, rel, "\u2269", "\\gneqq");
defineSymbol(math, ams, rel, "\ue00d", "\\gvertneqq");
defineSymbol(math, ams, rel, "\u22e7", "\\gnsim");
defineSymbol(math, ams, rel, "\u2a8a", "\\gnapprox");
defineSymbol(math, ams, rel, "\u2281", "\\nsucc");
defineSymbol(math, ams, rel, "\u22e1", "\\nsucceq");
defineSymbol(math, ams, rel, "\u22e9", "\\succnsim");
defineSymbol(math, ams, rel, "\u2aba", "\\succnapprox");
defineSymbol(math, ams, rel, "\u2246", "\\ncong");
defineSymbol(math, ams, rel, "\ue007", "\\nshortparallel");
defineSymbol(math, ams, rel, "\u2226", "\\nparallel");
defineSymbol(math, ams, rel, "\u22af", "\\nVDash");
defineSymbol(math, ams, rel, "\u22eb", "\\ntriangleright");
defineSymbol(math, ams, rel, "\u22ed", "\\ntrianglerighteq");
defineSymbol(math, ams, rel, "\ue018", "\\nsupseteqq");
defineSymbol(math, ams, rel, "\u228b", "\\supsetneq");
defineSymbol(math, ams, rel, "\ue01b", "\\varsupsetneq");
defineSymbol(math, ams, rel, "\u2acc", "\\supsetneqq");
defineSymbol(math, ams, rel, "\ue019", "\\varsupsetneqq");
defineSymbol(math, ams, rel, "\u22ae", "\\nVdash");
defineSymbol(math, ams, rel, "\u2ab5", "\\precneqq");
defineSymbol(math, ams, rel, "\u2ab6", "\\succneqq");
defineSymbol(math, ams, rel, "\ue016", "\\nsubseteqq");
defineSymbol(math, ams, bin, "\u22b4", "\\unlhd");
defineSymbol(math, ams, bin, "\u22b5", "\\unrhd");

// AMS Negated Arrows
defineSymbol(math, ams, rel, "\u219a", "\\nleftarrow");
defineSymbol(math, ams, rel, "\u219b", "\\nrightarrow");
defineSymbol(math, ams, rel, "\u21cd", "\\nLeftarrow");
defineSymbol(math, ams, rel, "\u21cf", "\\nRightarrow");
defineSymbol(math, ams, rel, "\u21ae", "\\nleftrightarrow");
defineSymbol(math, ams, rel, "\u21ce", "\\nLeftrightarrow");

// AMS Misc
defineSymbol(math, ams, rel, "\u25b3", "\\vartriangle");
defineSymbol(math, ams, textord, "\u210f", "\\hslash");
defineSymbol(math, ams, textord, "\u25bd", "\\triangledown");
defineSymbol(math, ams, textord, "\u25ca", "\\lozenge");
defineSymbol(math, ams, textord, "\u24c8", "\\circledS");
defineSymbol(math, ams, textord, "\u00ae", "\\circledR");
defineSymbol(math, ams, textord, "\u2221", "\\measuredangle");
defineSymbol(math, ams, textord, "\u2204", "\\nexists");
defineSymbol(math, ams, textord, "\u2127", "\\mho");
defineSymbol(math, ams, textord, "\u2132", "\\Finv");
defineSymbol(math, ams, textord, "\u2141", "\\Game");
defineSymbol(math, ams, textord, "\u006b", "\\Bbbk");
defineSymbol(math, ams, textord, "\u2035", "\\backprime");
defineSymbol(math, ams, textord, "\u25b2", "\\blacktriangle");
defineSymbol(math, ams, textord, "\u25bc", "\\blacktriangledown");
defineSymbol(math, ams, textord, "\u25a0", "\\blacksquare");
defineSymbol(math, ams, textord, "\u29eb", "\\blacklozenge");
defineSymbol(math, ams, textord, "\u2605", "\\bigstar");
defineSymbol(math, ams, textord, "\u2222", "\\sphericalangle");
defineSymbol(math, ams, textord, "\u2201", "\\complement");
defineSymbol(math, ams, textord, "\u00f0", "\\eth");
defineSymbol(math, ams, textord, "\u2571", "\\diagup");
defineSymbol(math, ams, textord, "\u2572", "\\diagdown");
defineSymbol(math, ams, textord, "\u25a1", "\\square");
defineSymbol(math, ams, textord, "\u25a1", "\\Box");
defineSymbol(math, ams, textord, "\u25ca", "\\Diamond");
defineSymbol(math, ams, textord, "\u00a5", "\\yen");
defineSymbol(math, ams, textord, "\u2713", "\\checkmark");

// AMS Hebrew
defineSymbol(math, ams, textord, "\u2136", "\\beth");
defineSymbol(math, ams, textord, "\u2138", "\\daleth");
defineSymbol(math, ams, textord, "\u2137", "\\gimel");

// AMS Greek
defineSymbol(math, ams, textord, "\u03dd", "\\digamma");
defineSymbol(math, ams, textord, "\u03f0", "\\varkappa");

// AMS Delimiters
defineSymbol(math, ams, open, "\u250c", "\\ulcorner");
defineSymbol(math, ams, close, "\u2510", "\\urcorner");
defineSymbol(math, ams, open, "\u2514", "\\llcorner");
defineSymbol(math, ams, close, "\u2518", "\\lrcorner");

// AMS Binary Relations
defineSymbol(math, ams, rel, "\u2266", "\\leqq");
defineSymbol(math, ams, rel, "\u2a7d", "\\leqslant");
defineSymbol(math, ams, rel, "\u2a95", "\\eqslantless");
defineSymbol(math, ams, rel, "\u2272", "\\lesssim");
defineSymbol(math, ams, rel, "\u2a85", "\\lessapprox");
defineSymbol(math, ams, rel, "\u224a", "\\approxeq");
defineSymbol(math, ams, bin, "\u22d6", "\\lessdot");
defineSymbol(math, ams, rel, "\u22d8", "\\lll");
defineSymbol(math, ams, rel, "\u2276", "\\lessgtr");
defineSymbol(math, ams, rel, "\u22da", "\\lesseqgtr");
defineSymbol(math, ams, rel, "\u2a8b", "\\lesseqqgtr");
defineSymbol(math, ams, rel, "\u2251", "\\doteqdot");
defineSymbol(math, ams, rel, "\u2253", "\\risingdotseq");
defineSymbol(math, ams, rel, "\u2252", "\\fallingdotseq");
defineSymbol(math, ams, rel, "\u223d", "\\backsim");
defineSymbol(math, ams, rel, "\u22cd", "\\backsimeq");
defineSymbol(math, ams, rel, "\u2ac5", "\\subseteqq");
defineSymbol(math, ams, rel, "\u22d0", "\\Subset");
defineSymbol(math, ams, rel, "\u228f", "\\sqsubset");
defineSymbol(math, ams, rel, "\u227c", "\\preccurlyeq");
defineSymbol(math, ams, rel, "\u22de", "\\curlyeqprec");
defineSymbol(math, ams, rel, "\u227e", "\\precsim");
defineSymbol(math, ams, rel, "\u2ab7", "\\precapprox");
defineSymbol(math, ams, rel, "\u22b2", "\\vartriangleleft");
defineSymbol(math, ams, rel, "\u22b4", "\\trianglelefteq");
defineSymbol(math, ams, rel, "\u22a8", "\\vDash");
defineSymbol(math, ams, rel, "\u22aa", "\\Vvdash");
defineSymbol(math, ams, rel, "\u2323", "\\smallsmile");
defineSymbol(math, ams, rel, "\u2322", "\\smallfrown");
defineSymbol(math, ams, rel, "\u224f", "\\bumpeq");
defineSymbol(math, ams, rel, "\u224e", "\\Bumpeq");
defineSymbol(math, ams, rel, "\u2267", "\\geqq");
defineSymbol(math, ams, rel, "\u2a7e", "\\geqslant");
defineSymbol(math, ams, rel, "\u2a96", "\\eqslantgtr");
defineSymbol(math, ams, rel, "\u2273", "\\gtrsim");
defineSymbol(math, ams, rel, "\u2a86", "\\gtrapprox");
defineSymbol(math, ams, bin, "\u22d7", "\\gtrdot");
defineSymbol(math, ams, rel, "\u22d9", "\\ggg");
defineSymbol(math, ams, rel, "\u2277", "\\gtrless");
defineSymbol(math, ams, rel, "\u22db", "\\gtreqless");
defineSymbol(math, ams, rel, "\u2a8c", "\\gtreqqless");
defineSymbol(math, ams, rel, "\u2256", "\\eqcirc");
defineSymbol(math, ams, rel, "\u2257", "\\circeq");
defineSymbol(math, ams, rel, "\u225c", "\\triangleq");
defineSymbol(math, ams, rel, "\u223c", "\\thicksim");
defineSymbol(math, ams, rel, "\u2248", "\\thickapprox");
defineSymbol(math, ams, rel, "\u2ac6", "\\supseteqq");
defineSymbol(math, ams, rel, "\u22d1", "\\Supset");
defineSymbol(math, ams, rel, "\u2290", "\\sqsupset");
defineSymbol(math, ams, rel, "\u227d", "\\succcurlyeq");
defineSymbol(math, ams, rel, "\u22df", "\\curlyeqsucc");
defineSymbol(math, ams, rel, "\u227f", "\\succsim");
defineSymbol(math, ams, rel, "\u2ab8", "\\succapprox");
defineSymbol(math, ams, rel, "\u22b3", "\\vartriangleright");
defineSymbol(math, ams, rel, "\u22b5", "\\trianglerighteq");
defineSymbol(math, ams, rel, "\u22a9", "\\Vdash");
defineSymbol(math, ams, rel, "\u2223", "\\shortmid");
defineSymbol(math, ams, rel, "\u2225", "\\shortparallel");
defineSymbol(math, ams, rel, "\u226c", "\\between");
defineSymbol(math, ams, rel, "\u22d4", "\\pitchfork");
defineSymbol(math, ams, rel, "\u221d", "\\varpropto");
defineSymbol(math, ams, rel, "\u25c0", "\\blacktriangleleft");
defineSymbol(math, ams, rel, "\u2234", "\\therefore");
defineSymbol(math, ams, rel, "\u220d", "\\backepsilon");
defineSymbol(math, ams, rel, "\u25b6", "\\blacktriangleright");
defineSymbol(math, ams, rel, "\u2235", "\\because");
defineSymbol(math, ams, rel, "\u22d8", "\\llless");
defineSymbol(math, ams, rel, "\u22d9", "\\gggtr");
defineSymbol(math, ams, bin, "\u22b2", "\\lhd");
defineSymbol(math, ams, bin, "\u22b3", "\\rhd");
defineSymbol(math, ams, rel, "\u2242", "\\eqsim");
defineSymbol(math, main, rel, "\u22c8", "\\Join");
defineSymbol(math, ams, rel, "\u2251", "\\Doteq");

// AMS Binary Operators
defineSymbol(math, ams, bin, "\u2214", "\\dotplus");
defineSymbol(math, ams, bin, "\u2216", "\\smallsetminus");
defineSymbol(math, ams, bin, "\u22d2", "\\Cap");
defineSymbol(math, ams, bin, "\u22d3", "\\Cup");
defineSymbol(math, ams, bin, "\u2a5e", "\\doublebarwedge");
defineSymbol(math, ams, bin, "\u229f", "\\boxminus");
defineSymbol(math, ams, bin, "\u229e", "\\boxplus");
defineSymbol(math, ams, bin, "\u22c7", "\\divideontimes");
defineSymbol(math, ams, bin, "\u22c9", "\\ltimes");
defineSymbol(math, ams, bin, "\u22ca", "\\rtimes");
defineSymbol(math, ams, bin, "\u22cb", "\\leftthreetimes");
defineSymbol(math, ams, bin, "\u22cc", "\\rightthreetimes");
defineSymbol(math, ams, bin, "\u22cf", "\\curlywedge");
defineSymbol(math, ams, bin, "\u22ce", "\\curlyvee");
defineSymbol(math, ams, bin, "\u229d", "\\circleddash");
defineSymbol(math, ams, bin, "\u229b", "\\circledast");
defineSymbol(math, ams, bin, "\u22c5", "\\centerdot");
defineSymbol(math, ams, bin, "\u22ba", "\\intercal");
defineSymbol(math, ams, bin, "\u22d2", "\\doublecap");
defineSymbol(math, ams, bin, "\u22d3", "\\doublecup");
defineSymbol(math, ams, bin, "\u22a0", "\\boxtimes");

// AMS Arrows
defineSymbol(math, ams, rel, "\u21e2", "\\dashrightarrow");
defineSymbol(math, ams, rel, "\u21e0", "\\dashleftarrow");
defineSymbol(math, ams, rel, "\u21c7", "\\leftleftarrows");
defineSymbol(math, ams, rel, "\u21c6", "\\leftrightarrows");
defineSymbol(math, ams, rel, "\u21da", "\\Lleftarrow");
defineSymbol(math, ams, rel, "\u219e", "\\twoheadleftarrow");
defineSymbol(math, ams, rel, "\u21a2", "\\leftarrowtail");
defineSymbol(math, ams, rel, "\u21ab", "\\looparrowleft");
defineSymbol(math, ams, rel, "\u21cb", "\\leftrightharpoons");
defineSymbol(math, ams, rel, "\u21b6", "\\curvearrowleft");
defineSymbol(math, ams, rel, "\u21ba", "\\circlearrowleft");
defineSymbol(math, ams, rel, "\u21b0", "\\Lsh");
defineSymbol(math, ams, rel, "\u21c8", "\\upuparrows");
defineSymbol(math, ams, rel, "\u21bf", "\\upharpoonleft");
defineSymbol(math, ams, rel, "\u21c3", "\\downharpoonleft");
defineSymbol(math, ams, rel, "\u22b8", "\\multimap");
defineSymbol(math, ams, rel, "\u21ad", "\\leftrightsquigarrow");
defineSymbol(math, ams, rel, "\u21c9", "\\rightrightarrows");
defineSymbol(math, ams, rel, "\u21c4", "\\rightleftarrows");
defineSymbol(math, ams, rel, "\u21a0", "\\twoheadrightarrow");
defineSymbol(math, ams, rel, "\u21a3", "\\rightarrowtail");
defineSymbol(math, ams, rel, "\u21ac", "\\looparrowright");
defineSymbol(math, ams, rel, "\u21b7", "\\curvearrowright");
defineSymbol(math, ams, rel, "\u21bb", "\\circlearrowright");
defineSymbol(math, ams, rel, "\u21b1", "\\Rsh");
defineSymbol(math, ams, rel, "\u21ca", "\\downdownarrows");
defineSymbol(math, ams, rel, "\u21be", "\\upharpoonright");
defineSymbol(math, ams, rel, "\u21c2", "\\downharpoonright");
defineSymbol(math, ams, rel, "\u21dd", "\\rightsquigarrow");
defineSymbol(math, ams, rel, "\u21dd", "\\leadsto");
defineSymbol(math, ams, rel, "\u21db", "\\Rrightarrow");
defineSymbol(math, ams, rel, "\u21be", "\\restriction");

defineSymbol(math, main, textord, "\u2018", "`");
defineSymbol(math, main, textord, "$", "\\$");
defineSymbol(math, main, textord, "%", "\\%");
defineSymbol(math, main, textord, "_", "\\_");
defineSymbol(math, main, textord, "\u2220", "\\angle");
defineSymbol(math, main, textord, "\u221e", "\\infty");
defineSymbol(math, main, textord, "\u2032", "\\prime");
defineSymbol(math, main, textord, "\u25b3", "\\triangle");
defineSymbol(math, main, textord, "\u0393", "\\Gamma");
defineSymbol(math, main, textord, "\u0394", "\\Delta");
defineSymbol(math, main, textord, "\u0398", "\\Theta");
defineSymbol(math, main, textord, "\u039b", "\\Lambda");
defineSymbol(math, main, textord, "\u039e", "\\Xi");
defineSymbol(math, main, textord, "\u03a0", "\\Pi");
defineSymbol(math, main, textord, "\u03a3", "\\Sigma");
defineSymbol(math, main, textord, "\u03a5", "\\Upsilon");
defineSymbol(math, main, textord, "\u03a6", "\\Phi");
defineSymbol(math, main, textord, "\u03a8", "\\Psi");
defineSymbol(math, main, textord, "\u03a9", "\\Omega");
defineSymbol(math, main, textord, "\u00ac", "\\neg");
defineSymbol(math, main, textord, "\u00ac", "\\lnot");
defineSymbol(math, main, textord, "\u22a4", "\\top");
defineSymbol(math, main, textord, "\u22a5", "\\bot");
defineSymbol(math, main, textord, "\u2205", "\\emptyset");
defineSymbol(math, ams, textord, "\u2205", "\\varnothing");
defineSymbol(math, main, mathord, "\u03b1", "\\alpha");
defineSymbol(math, main, mathord, "\u03b2", "\\beta");
defineSymbol(math, main, mathord, "\u03b3", "\\gamma");
defineSymbol(math, main, mathord, "\u03b4", "\\delta");
defineSymbol(math, main, mathord, "\u03f5", "\\epsilon");
defineSymbol(math, main, mathord, "\u03b6", "\\zeta");
defineSymbol(math, main, mathord, "\u03b7", "\\eta");
defineSymbol(math, main, mathord, "\u03b8", "\\theta");
defineSymbol(math, main, mathord, "\u03b9", "\\iota");
defineSymbol(math, main, mathord, "\u03ba", "\\kappa");
defineSymbol(math, main, mathord, "\u03bb", "\\lambda");
defineSymbol(math, main, mathord, "\u03bc", "\\mu");
defineSymbol(math, main, mathord, "\u03bd", "\\nu");
defineSymbol(math, main, mathord, "\u03be", "\\xi");
defineSymbol(math, main, mathord, "o", "\\omicron");
defineSymbol(math, main, mathord, "\u03c0", "\\pi");
defineSymbol(math, main, mathord, "\u03c1", "\\rho");
defineSymbol(math, main, mathord, "\u03c3", "\\sigma");
defineSymbol(math, main, mathord, "\u03c4", "\\tau");
defineSymbol(math, main, mathord, "\u03c5", "\\upsilon");
defineSymbol(math, main, mathord, "\u03d5", "\\phi");
defineSymbol(math, main, mathord, "\u03c7", "\\chi");
defineSymbol(math, main, mathord, "\u03c8", "\\psi");
defineSymbol(math, main, mathord, "\u03c9", "\\omega");
defineSymbol(math, main, mathord, "\u03b5", "\\varepsilon");
defineSymbol(math, main, mathord, "\u03d1", "\\vartheta");
defineSymbol(math, main, mathord, "\u03d6", "\\varpi");
defineSymbol(math, main, mathord, "\u03f1", "\\varrho");
defineSymbol(math, main, mathord, "\u03c2", "\\varsigma");
defineSymbol(math, main, mathord, "\u03c6", "\\varphi");
defineSymbol(math, main, bin, "\u2217", "*");
defineSymbol(math, main, bin, "+", "+");
defineSymbol(math, main, bin, "\u2212", "-");
defineSymbol(math, main, bin, "\u22c5", "\\cdot");
defineSymbol(math, main, bin, "\u2218", "\\circ");
defineSymbol(math, main, bin, "\u00f7", "\\div");
defineSymbol(math, main, bin, "\u00b1", "\\pm");
defineSymbol(math, main, bin, "\u00d7", "\\times");
defineSymbol(math, main, bin, "\u2229", "\\cap");
defineSymbol(math, main, bin, "\u222a", "\\cup");
defineSymbol(math, main, bin, "\u2216", "\\setminus");
defineSymbol(math, main, bin, "\u2227", "\\land");
defineSymbol(math, main, bin, "\u2228", "\\lor");
defineSymbol(math, main, bin, "\u2227", "\\wedge");
defineSymbol(math, main, bin, "\u2228", "\\vee");
defineSymbol(math, main, textord, "\u221a", "\\surd");
defineSymbol(math, main, open, "(", "(");
defineSymbol(math, main, open, "[", "[");
defineSymbol(math, main, open, "\u27e8", "\\langle");
defineSymbol(math, main, open, "\u2223", "\\lvert");
defineSymbol(math, main, open, "\u2225", "\\lVert");
defineSymbol(math, main, close, ")", ")");
defineSymbol(math, main, close, "]", "]");
defineSymbol(math, main, close, "?", "?");
defineSymbol(math, main, close, "!", "!");
defineSymbol(math, main, close, "\u27e9", "\\rangle");
defineSymbol(math, main, close, "\u2223", "\\rvert");
defineSymbol(math, main, close, "\u2225", "\\rVert");
defineSymbol(math, main, rel, "=", "=");
defineSymbol(math, main, rel, "<", "<");
defineSymbol(math, main, rel, ">", ">");
defineSymbol(math, main, rel, ":", ":");
defineSymbol(math, main, rel, "\u2248", "\\approx");
defineSymbol(math, main, rel, "\u2245", "\\cong");
defineSymbol(math, main, rel, "\u2265", "\\ge");
defineSymbol(math, main, rel, "\u2265", "\\geq");
defineSymbol(math, main, rel, "\u2190", "\\gets");
defineSymbol(math, main, rel, ">", "\\gt");
defineSymbol(math, main, rel, "\u2208", "\\in");
defineSymbol(math, main, rel, "\u2209", "\\notin");
defineSymbol(math, main, rel, "\u2282", "\\subset");
defineSymbol(math, main, rel, "\u2283", "\\supset");
defineSymbol(math, main, rel, "\u2286", "\\subseteq");
defineSymbol(math, main, rel, "\u2287", "\\supseteq");
defineSymbol(math, ams, rel, "\u2288", "\\nsubseteq");
defineSymbol(math, ams, rel, "\u2289", "\\nsupseteq");
defineSymbol(math, main, rel, "\u22a8", "\\models");
defineSymbol(math, main, rel, "\u2190", "\\leftarrow");
defineSymbol(math, main, rel, "\u2264", "\\le");
defineSymbol(math, main, rel, "\u2264", "\\leq");
defineSymbol(math, main, rel, "<", "\\lt");
defineSymbol(math, main, rel, "\u2260", "\\ne");
defineSymbol(math, main, rel, "\u2260", "\\neq");
defineSymbol(math, main, rel, "\u2192", "\\rightarrow");
defineSymbol(math, main, rel, "\u2192", "\\to");
defineSymbol(math, ams, rel, "\u2271", "\\ngeq");
defineSymbol(math, ams, rel, "\u2270", "\\nleq");
defineSymbol(math, main, spacing, null, "\\!");
defineSymbol(math, main, spacing, "\u00a0", "\\ ");
defineSymbol(math, main, spacing, "\u00a0", "~");
defineSymbol(math, main, spacing, null, "\\,");
defineSymbol(math, main, spacing, null, "\\:");
defineSymbol(math, main, spacing, null, "\\;");
defineSymbol(math, main, spacing, null, "\\enspace");
defineSymbol(math, main, spacing, null, "\\qquad");
defineSymbol(math, main, spacing, null, "\\quad");
defineSymbol(math, main, spacing, "\u00a0", "\\space");
defineSymbol(math, main, punct, ",", ",");
defineSymbol(math, main, punct, ";", ";");
defineSymbol(math, main, punct, ":", "\\colon");
defineSymbol(math, ams, bin, "\u22bc", "\\barwedge");
defineSymbol(math, ams, bin, "\u22bb", "\\veebar");
defineSymbol(math, main, bin, "\u2299", "\\odot");
defineSymbol(math, main, bin, "\u2295", "\\oplus");
defineSymbol(math, main, bin, "\u2297", "\\otimes");
defineSymbol(math, main, textord, "\u2202", "\\partial");
defineSymbol(math, main, bin, "\u2298", "\\oslash");
defineSymbol(math, ams, bin, "\u229a", "\\circledcirc");
defineSymbol(math, ams, bin, "\u22a1", "\\boxdot");
defineSymbol(math, main, bin, "\u25b3", "\\bigtriangleup");
defineSymbol(math, main, bin, "\u25bd", "\\bigtriangledown");
defineSymbol(math, main, bin, "\u2020", "\\dagger");
defineSymbol(math, main, bin, "\u22c4", "\\diamond");
defineSymbol(math, main, bin, "\u22c6", "\\star");
defineSymbol(math, main, bin, "\u25c3", "\\triangleleft");
defineSymbol(math, main, bin, "\u25b9", "\\triangleright");
defineSymbol(math, main, open, "{", "\\{");
defineSymbol(math, main, close, "}", "\\}");
defineSymbol(math, main, open, "{", "\\lbrace");
defineSymbol(math, main, close, "}", "\\rbrace");
defineSymbol(math, main, open, "[", "\\lbrack");
defineSymbol(math, main, close, "]", "\\rbrack");
defineSymbol(math, main, open, "\u230a", "\\lfloor");
defineSymbol(math, main, close, "\u230b", "\\rfloor");
defineSymbol(math, main, open, "\u2308", "\\lceil");
defineSymbol(math, main, close, "\u2309", "\\rceil");
defineSymbol(math, main, textord, "\\", "\\backslash");
defineSymbol(math, main, textord, "\u2223", "|");
defineSymbol(math, main, textord, "\u2223", "\\vert");
defineSymbol(math, main, textord, "\u2225", "\\|");
defineSymbol(math, main, textord, "\u2225", "\\Vert");
defineSymbol(math, main, rel, "\u2191", "\\uparrow");
defineSymbol(math, main, rel, "\u21d1", "\\Uparrow");
defineSymbol(math, main, rel, "\u2193", "\\downarrow");
defineSymbol(math, main, rel, "\u21d3", "\\Downarrow");
defineSymbol(math, main, rel, "\u2195", "\\updownarrow");
defineSymbol(math, main, rel, "\u21d5", "\\Updownarrow");
defineSymbol(math, math, op, "\u2210", "\\coprod");
defineSymbol(math, math, op, "\u22c1", "\\bigvee");
defineSymbol(math, math, op, "\u22c0", "\\bigwedge");
defineSymbol(math, math, op, "\u2a04", "\\biguplus");
defineSymbol(math, math, op, "\u22c2", "\\bigcap");
defineSymbol(math, math, op, "\u22c3", "\\bigcup");
defineSymbol(math, math, op, "\u222b", "\\int");
defineSymbol(math, math, op, "\u222b", "\\intop");
defineSymbol(math, math, op, "\u222c", "\\iint");
defineSymbol(math, math, op, "\u222d", "\\iiint");
defineSymbol(math, math, op, "\u220f", "\\prod");
defineSymbol(math, math, op, "\u2211", "\\sum");
defineSymbol(math, math, op, "\u2a02", "\\bigotimes");
defineSymbol(math, math, op, "\u2a01", "\\bigoplus");
defineSymbol(math, math, op, "\u2a00", "\\bigodot");
defineSymbol(math, math, op, "\u222e", "\\oint");
defineSymbol(math, math, op, "\u2a06", "\\bigsqcup");
defineSymbol(math, math, op, "\u222b", "\\smallint");
defineSymbol(math, main, inner, "\u2026", "\\ldots");
defineSymbol(math, main, inner, "\u22ef", "\\cdots");
defineSymbol(math, main, inner, "\u22f1", "\\ddots");
defineSymbol(math, main, textord, "\u22ee", "\\vdots");
defineSymbol(math, main, accent, "\u00b4", "\\acute");
defineSymbol(math, main, accent, "\u0060", "\\grave");
defineSymbol(math, main, accent, "\u00a8", "\\ddot");
defineSymbol(math, main, accent, "\u007e", "\\tilde");
defineSymbol(math, main, accent, "\u00af", "\\bar");
defineSymbol(math, main, accent, "\u02d8", "\\breve");
defineSymbol(math, main, accent, "\u02c7", "\\check");
defineSymbol(math, main, accent, "\u005e", "\\hat");
defineSymbol(math, main, accent, "\u20d7", "\\vec");
defineSymbol(math, main, accent, "\u02d9", "\\dot");
defineSymbol(math, main, mathord, "\u0131", "\\imath");
defineSymbol(math, main, mathord, "\u0237", "\\jmath");

defineSymbol(text, main, spacing, "\u00a0", "\\ ");
defineSymbol(text, main, spacing, "\u00a0", " ");
defineSymbol(text, main, spacing, "\u00a0", "~");

// There are lots of symbols which are the same, so we add them in afterwards.
var i;
var ch;

// All of these are textords in math mode
var mathTextSymbols = "0123456789/@.\"";
for (i = 0; i < mathTextSymbols.length; i++) {
    ch = mathTextSymbols.charAt(i);
    defineSymbol(math, main, textord, ch, ch);
}

// All of these are textords in text mode
var textSymbols = "0123456789`!@*()-=+[]'\";:?/.,";
for (i = 0; i < textSymbols.length; i++) {
    ch = textSymbols.charAt(i);
    defineSymbol(text, main, textord, ch, ch);
}

// All of these are textords in text mode, and mathords in math mode
var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (i = 0; i < letters.length; i++) {
    ch = letters.charAt(i);
    defineSymbol(math, main, mathord, ch, ch);
    defineSymbol(text, main, textord, ch, ch);
}


/***/ }),

/***/ "M9y/":
/***/ (function(module, exports, __webpack_require__) {

var buildHTML = __webpack_require__("0xj5");
var buildMathML = __webpack_require__("5oZ/");
var buildCommon = __webpack_require__("ybOZ");
var Options = __webpack_require__("Wjn4");
var Settings = __webpack_require__("okAn");
var Style = __webpack_require__("aNjz");

var makeSpan = buildCommon.makeSpan;

var buildTree = function(tree, expression, settings) {
    settings = settings || new Settings({});

    var startStyle = Style.TEXT;
    if (settings.displayMode) {
        startStyle = Style.DISPLAY;
    }

    // Setup the default options
    var options = new Options({
        style: startStyle,
        size: "size5",
    });

    // `buildHTML` sometimes messes with the parse tree (like turning bins ->
    // ords), so we build the MathML version first.
    var mathMLNode = buildMathML(tree, expression, options);
    var htmlNode = buildHTML(tree, options);

    var katexNode = makeSpan(["katex"], [
        mathMLNode, htmlNode,
    ]);

    if (settings.displayMode) {
        return makeSpan(["katex-display"], [katexNode]);
    } else {
        return katexNode;
    }
};

module.exports = buildTree;


/***/ }),

/***/ "UGEY":
/***/ (function(module, exports, __webpack_require__) {

/**
 * These objects store data about MathML nodes. This is the MathML equivalent
 * of the types in domTree.js. Since MathML handles its own rendering, and
 * since we're mainly using MathML to improve accessibility, we don't manage
 * any of the styling state that the plain DOM nodes do.
 *
 * The `toNode` and `toMarkup` functions work simlarly to how they do in
 * domTree.js, creating namespaced DOM nodes and HTML text markup respectively.
 */

var utils = __webpack_require__("s847");

/**
 * This node represents a general purpose MathML node of any type. The
 * constructor requires the type of node to create (for example, `"mo"` or
 * `"mspace"`, corresponding to `<mo>` and `<mspace>` tags).
 */
function MathNode(type, children) {
    this.type = type;
    this.attributes = {};
    this.children = children || [];
}

/**
 * Sets an attribute on a MathML node. MathML depends on attributes to convey a
 * semantic content, so this is used heavily.
 */
MathNode.prototype.setAttribute = function(name, value) {
    this.attributes[name] = value;
};

/**
 * Converts the math node into a MathML-namespaced DOM element.
 */
MathNode.prototype.toNode = function() {
    var node = document.createElementNS(
        "http://www.w3.org/1998/Math/MathML", this.type);

    for (var attr in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
            node.setAttribute(attr, this.attributes[attr]);
        }
    }

    for (var i = 0; i < this.children.length; i++) {
        node.appendChild(this.children[i].toNode());
    }

    return node;
};

/**
 * Converts the math node into an HTML markup string.
 */
MathNode.prototype.toMarkup = function() {
    var markup = "<" + this.type;

    // Add the attributes
    for (var attr in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
            markup += " " + attr + "=\"";
            markup += utils.escape(this.attributes[attr]);
            markup += "\"";
        }
    }

    markup += ">";

    for (var i = 0; i < this.children.length; i++) {
        markup += this.children[i].toMarkup();
    }

    markup += "</" + this.type + ">";

    return markup;
};

/**
 * This node represents a piece of text.
 */
function TextNode(text) {
    this.text = text;
}

/**
 * Converts the text node into a DOM text node.
 */
TextNode.prototype.toNode = function() {
    return document.createTextNode(this.text);
};

/**
 * Converts the text node into HTML markup (which is just the text itself).
 */
TextNode.prototype.toMarkup = function() {
    return utils.escape(this.text);
};

module.exports = {
    MathNode: MathNode,
    TextNode: TextNode,
};


/***/ }),

/***/ "cstk":
/***/ (function(module, exports) {

module.exports = {
    "AMS-Regular": {
        "65": [0, 0.68889, 0, 0],
        "66": [0, 0.68889, 0, 0],
        "67": [0, 0.68889, 0, 0],
        "68": [0, 0.68889, 0, 0],
        "69": [0, 0.68889, 0, 0],
        "70": [0, 0.68889, 0, 0],
        "71": [0, 0.68889, 0, 0],
        "72": [0, 0.68889, 0, 0],
        "73": [0, 0.68889, 0, 0],
        "74": [0.16667, 0.68889, 0, 0],
        "75": [0, 0.68889, 0, 0],
        "76": [0, 0.68889, 0, 0],
        "77": [0, 0.68889, 0, 0],
        "78": [0, 0.68889, 0, 0],
        "79": [0.16667, 0.68889, 0, 0],
        "80": [0, 0.68889, 0, 0],
        "81": [0.16667, 0.68889, 0, 0],
        "82": [0, 0.68889, 0, 0],
        "83": [0, 0.68889, 0, 0],
        "84": [0, 0.68889, 0, 0],
        "85": [0, 0.68889, 0, 0],
        "86": [0, 0.68889, 0, 0],
        "87": [0, 0.68889, 0, 0],
        "88": [0, 0.68889, 0, 0],
        "89": [0, 0.68889, 0, 0],
        "90": [0, 0.68889, 0, 0],
        "107": [0, 0.68889, 0, 0],
        "165": [0, 0.675, 0.025, 0],
        "174": [0.15559, 0.69224, 0, 0],
        "240": [0, 0.68889, 0, 0],
        "295": [0, 0.68889, 0, 0],
        "710": [0, 0.825, 0, 0],
        "732": [0, 0.9, 0, 0],
        "770": [0, 0.825, 0, 0],
        "771": [0, 0.9, 0, 0],
        "989": [0.08167, 0.58167, 0, 0],
        "1008": [0, 0.43056, 0.04028, 0],
        "8245": [0, 0.54986, 0, 0],
        "8463": [0, 0.68889, 0, 0],
        "8487": [0, 0.68889, 0, 0],
        "8498": [0, 0.68889, 0, 0],
        "8502": [0, 0.68889, 0, 0],
        "8503": [0, 0.68889, 0, 0],
        "8504": [0, 0.68889, 0, 0],
        "8513": [0, 0.68889, 0, 0],
        "8592": [-0.03598, 0.46402, 0, 0],
        "8594": [-0.03598, 0.46402, 0, 0],
        "8602": [-0.13313, 0.36687, 0, 0],
        "8603": [-0.13313, 0.36687, 0, 0],
        "8606": [0.01354, 0.52239, 0, 0],
        "8608": [0.01354, 0.52239, 0, 0],
        "8610": [0.01354, 0.52239, 0, 0],
        "8611": [0.01354, 0.52239, 0, 0],
        "8619": [0, 0.54986, 0, 0],
        "8620": [0, 0.54986, 0, 0],
        "8621": [-0.13313, 0.37788, 0, 0],
        "8622": [-0.13313, 0.36687, 0, 0],
        "8624": [0, 0.69224, 0, 0],
        "8625": [0, 0.69224, 0, 0],
        "8630": [0, 0.43056, 0, 0],
        "8631": [0, 0.43056, 0, 0],
        "8634": [0.08198, 0.58198, 0, 0],
        "8635": [0.08198, 0.58198, 0, 0],
        "8638": [0.19444, 0.69224, 0, 0],
        "8639": [0.19444, 0.69224, 0, 0],
        "8642": [0.19444, 0.69224, 0, 0],
        "8643": [0.19444, 0.69224, 0, 0],
        "8644": [0.1808, 0.675, 0, 0],
        "8646": [0.1808, 0.675, 0, 0],
        "8647": [0.1808, 0.675, 0, 0],
        "8648": [0.19444, 0.69224, 0, 0],
        "8649": [0.1808, 0.675, 0, 0],
        "8650": [0.19444, 0.69224, 0, 0],
        "8651": [0.01354, 0.52239, 0, 0],
        "8652": [0.01354, 0.52239, 0, 0],
        "8653": [-0.13313, 0.36687, 0, 0],
        "8654": [-0.13313, 0.36687, 0, 0],
        "8655": [-0.13313, 0.36687, 0, 0],
        "8666": [0.13667, 0.63667, 0, 0],
        "8667": [0.13667, 0.63667, 0, 0],
        "8669": [-0.13313, 0.37788, 0, 0],
        "8672": [-0.064, 0.437, 0, 0],
        "8674": [-0.064, 0.437, 0, 0],
        "8705": [0, 0.825, 0, 0],
        "8708": [0, 0.68889, 0, 0],
        "8709": [0.08167, 0.58167, 0, 0],
        "8717": [0, 0.43056, 0, 0],
        "8722": [-0.03598, 0.46402, 0, 0],
        "8724": [0.08198, 0.69224, 0, 0],
        "8726": [0.08167, 0.58167, 0, 0],
        "8733": [0, 0.69224, 0, 0],
        "8736": [0, 0.69224, 0, 0],
        "8737": [0, 0.69224, 0, 0],
        "8738": [0.03517, 0.52239, 0, 0],
        "8739": [0.08167, 0.58167, 0, 0],
        "8740": [0.25142, 0.74111, 0, 0],
        "8741": [0.08167, 0.58167, 0, 0],
        "8742": [0.25142, 0.74111, 0, 0],
        "8756": [0, 0.69224, 0, 0],
        "8757": [0, 0.69224, 0, 0],
        "8764": [-0.13313, 0.36687, 0, 0],
        "8765": [-0.13313, 0.37788, 0, 0],
        "8769": [-0.13313, 0.36687, 0, 0],
        "8770": [-0.03625, 0.46375, 0, 0],
        "8774": [0.30274, 0.79383, 0, 0],
        "8776": [-0.01688, 0.48312, 0, 0],
        "8778": [0.08167, 0.58167, 0, 0],
        "8782": [0.06062, 0.54986, 0, 0],
        "8783": [0.06062, 0.54986, 0, 0],
        "8785": [0.08198, 0.58198, 0, 0],
        "8786": [0.08198, 0.58198, 0, 0],
        "8787": [0.08198, 0.58198, 0, 0],
        "8790": [0, 0.69224, 0, 0],
        "8791": [0.22958, 0.72958, 0, 0],
        "8796": [0.08198, 0.91667, 0, 0],
        "8806": [0.25583, 0.75583, 0, 0],
        "8807": [0.25583, 0.75583, 0, 0],
        "8808": [0.25142, 0.75726, 0, 0],
        "8809": [0.25142, 0.75726, 0, 0],
        "8812": [0.25583, 0.75583, 0, 0],
        "8814": [0.20576, 0.70576, 0, 0],
        "8815": [0.20576, 0.70576, 0, 0],
        "8816": [0.30274, 0.79383, 0, 0],
        "8817": [0.30274, 0.79383, 0, 0],
        "8818": [0.22958, 0.72958, 0, 0],
        "8819": [0.22958, 0.72958, 0, 0],
        "8822": [0.1808, 0.675, 0, 0],
        "8823": [0.1808, 0.675, 0, 0],
        "8828": [0.13667, 0.63667, 0, 0],
        "8829": [0.13667, 0.63667, 0, 0],
        "8830": [0.22958, 0.72958, 0, 0],
        "8831": [0.22958, 0.72958, 0, 0],
        "8832": [0.20576, 0.70576, 0, 0],
        "8833": [0.20576, 0.70576, 0, 0],
        "8840": [0.30274, 0.79383, 0, 0],
        "8841": [0.30274, 0.79383, 0, 0],
        "8842": [0.13597, 0.63597, 0, 0],
        "8843": [0.13597, 0.63597, 0, 0],
        "8847": [0.03517, 0.54986, 0, 0],
        "8848": [0.03517, 0.54986, 0, 0],
        "8858": [0.08198, 0.58198, 0, 0],
        "8859": [0.08198, 0.58198, 0, 0],
        "8861": [0.08198, 0.58198, 0, 0],
        "8862": [0, 0.675, 0, 0],
        "8863": [0, 0.675, 0, 0],
        "8864": [0, 0.675, 0, 0],
        "8865": [0, 0.675, 0, 0],
        "8872": [0, 0.69224, 0, 0],
        "8873": [0, 0.69224, 0, 0],
        "8874": [0, 0.69224, 0, 0],
        "8876": [0, 0.68889, 0, 0],
        "8877": [0, 0.68889, 0, 0],
        "8878": [0, 0.68889, 0, 0],
        "8879": [0, 0.68889, 0, 0],
        "8882": [0.03517, 0.54986, 0, 0],
        "8883": [0.03517, 0.54986, 0, 0],
        "8884": [0.13667, 0.63667, 0, 0],
        "8885": [0.13667, 0.63667, 0, 0],
        "8888": [0, 0.54986, 0, 0],
        "8890": [0.19444, 0.43056, 0, 0],
        "8891": [0.19444, 0.69224, 0, 0],
        "8892": [0.19444, 0.69224, 0, 0],
        "8901": [0, 0.54986, 0, 0],
        "8903": [0.08167, 0.58167, 0, 0],
        "8905": [0.08167, 0.58167, 0, 0],
        "8906": [0.08167, 0.58167, 0, 0],
        "8907": [0, 0.69224, 0, 0],
        "8908": [0, 0.69224, 0, 0],
        "8909": [-0.03598, 0.46402, 0, 0],
        "8910": [0, 0.54986, 0, 0],
        "8911": [0, 0.54986, 0, 0],
        "8912": [0.03517, 0.54986, 0, 0],
        "8913": [0.03517, 0.54986, 0, 0],
        "8914": [0, 0.54986, 0, 0],
        "8915": [0, 0.54986, 0, 0],
        "8916": [0, 0.69224, 0, 0],
        "8918": [0.0391, 0.5391, 0, 0],
        "8919": [0.0391, 0.5391, 0, 0],
        "8920": [0.03517, 0.54986, 0, 0],
        "8921": [0.03517, 0.54986, 0, 0],
        "8922": [0.38569, 0.88569, 0, 0],
        "8923": [0.38569, 0.88569, 0, 0],
        "8926": [0.13667, 0.63667, 0, 0],
        "8927": [0.13667, 0.63667, 0, 0],
        "8928": [0.30274, 0.79383, 0, 0],
        "8929": [0.30274, 0.79383, 0, 0],
        "8934": [0.23222, 0.74111, 0, 0],
        "8935": [0.23222, 0.74111, 0, 0],
        "8936": [0.23222, 0.74111, 0, 0],
        "8937": [0.23222, 0.74111, 0, 0],
        "8938": [0.20576, 0.70576, 0, 0],
        "8939": [0.20576, 0.70576, 0, 0],
        "8940": [0.30274, 0.79383, 0, 0],
        "8941": [0.30274, 0.79383, 0, 0],
        "8994": [0.19444, 0.69224, 0, 0],
        "8995": [0.19444, 0.69224, 0, 0],
        "9416": [0.15559, 0.69224, 0, 0],
        "9484": [0, 0.69224, 0, 0],
        "9488": [0, 0.69224, 0, 0],
        "9492": [0, 0.37788, 0, 0],
        "9496": [0, 0.37788, 0, 0],
        "9585": [0.19444, 0.68889, 0, 0],
        "9586": [0.19444, 0.74111, 0, 0],
        "9632": [0, 0.675, 0, 0],
        "9633": [0, 0.675, 0, 0],
        "9650": [0, 0.54986, 0, 0],
        "9651": [0, 0.54986, 0, 0],
        "9654": [0.03517, 0.54986, 0, 0],
        "9660": [0, 0.54986, 0, 0],
        "9661": [0, 0.54986, 0, 0],
        "9664": [0.03517, 0.54986, 0, 0],
        "9674": [0.11111, 0.69224, 0, 0],
        "9733": [0.19444, 0.69224, 0, 0],
        "10003": [0, 0.69224, 0, 0],
        "10016": [0, 0.69224, 0, 0],
        "10731": [0.11111, 0.69224, 0, 0],
        "10846": [0.19444, 0.75583, 0, 0],
        "10877": [0.13667, 0.63667, 0, 0],
        "10878": [0.13667, 0.63667, 0, 0],
        "10885": [0.25583, 0.75583, 0, 0],
        "10886": [0.25583, 0.75583, 0, 0],
        "10887": [0.13597, 0.63597, 0, 0],
        "10888": [0.13597, 0.63597, 0, 0],
        "10889": [0.26167, 0.75726, 0, 0],
        "10890": [0.26167, 0.75726, 0, 0],
        "10891": [0.48256, 0.98256, 0, 0],
        "10892": [0.48256, 0.98256, 0, 0],
        "10901": [0.13667, 0.63667, 0, 0],
        "10902": [0.13667, 0.63667, 0, 0],
        "10933": [0.25142, 0.75726, 0, 0],
        "10934": [0.25142, 0.75726, 0, 0],
        "10935": [0.26167, 0.75726, 0, 0],
        "10936": [0.26167, 0.75726, 0, 0],
        "10937": [0.26167, 0.75726, 0, 0],
        "10938": [0.26167, 0.75726, 0, 0],
        "10949": [0.25583, 0.75583, 0, 0],
        "10950": [0.25583, 0.75583, 0, 0],
        "10955": [0.28481, 0.79383, 0, 0],
        "10956": [0.28481, 0.79383, 0, 0],
        "57350": [0.08167, 0.58167, 0, 0],
        "57351": [0.08167, 0.58167, 0, 0],
        "57352": [0.08167, 0.58167, 0, 0],
        "57353": [0, 0.43056, 0.04028, 0],
        "57356": [0.25142, 0.75726, 0, 0],
        "57357": [0.25142, 0.75726, 0, 0],
        "57358": [0.41951, 0.91951, 0, 0],
        "57359": [0.30274, 0.79383, 0, 0],
        "57360": [0.30274, 0.79383, 0, 0],
        "57361": [0.41951, 0.91951, 0, 0],
        "57366": [0.25142, 0.75726, 0, 0],
        "57367": [0.25142, 0.75726, 0, 0],
        "57368": [0.25142, 0.75726, 0, 0],
        "57369": [0.25142, 0.75726, 0, 0],
        "57370": [0.13597, 0.63597, 0, 0],
        "57371": [0.13597, 0.63597, 0, 0],
    },
    "Caligraphic-Regular": {
        "48": [0, 0.43056, 0, 0],
        "49": [0, 0.43056, 0, 0],
        "50": [0, 0.43056, 0, 0],
        "51": [0.19444, 0.43056, 0, 0],
        "52": [0.19444, 0.43056, 0, 0],
        "53": [0.19444, 0.43056, 0, 0],
        "54": [0, 0.64444, 0, 0],
        "55": [0.19444, 0.43056, 0, 0],
        "56": [0, 0.64444, 0, 0],
        "57": [0.19444, 0.43056, 0, 0],
        "65": [0, 0.68333, 0, 0.19445],
        "66": [0, 0.68333, 0.03041, 0.13889],
        "67": [0, 0.68333, 0.05834, 0.13889],
        "68": [0, 0.68333, 0.02778, 0.08334],
        "69": [0, 0.68333, 0.08944, 0.11111],
        "70": [0, 0.68333, 0.09931, 0.11111],
        "71": [0.09722, 0.68333, 0.0593, 0.11111],
        "72": [0, 0.68333, 0.00965, 0.11111],
        "73": [0, 0.68333, 0.07382, 0],
        "74": [0.09722, 0.68333, 0.18472, 0.16667],
        "75": [0, 0.68333, 0.01445, 0.05556],
        "76": [0, 0.68333, 0, 0.13889],
        "77": [0, 0.68333, 0, 0.13889],
        "78": [0, 0.68333, 0.14736, 0.08334],
        "79": [0, 0.68333, 0.02778, 0.11111],
        "80": [0, 0.68333, 0.08222, 0.08334],
        "81": [0.09722, 0.68333, 0, 0.11111],
        "82": [0, 0.68333, 0, 0.08334],
        "83": [0, 0.68333, 0.075, 0.13889],
        "84": [0, 0.68333, 0.25417, 0],
        "85": [0, 0.68333, 0.09931, 0.08334],
        "86": [0, 0.68333, 0.08222, 0],
        "87": [0, 0.68333, 0.08222, 0.08334],
        "88": [0, 0.68333, 0.14643, 0.13889],
        "89": [0.09722, 0.68333, 0.08222, 0.08334],
        "90": [0, 0.68333, 0.07944, 0.13889],
    },
    "Fraktur-Regular": {
        "33": [0, 0.69141, 0, 0],
        "34": [0, 0.69141, 0, 0],
        "38": [0, 0.69141, 0, 0],
        "39": [0, 0.69141, 0, 0],
        "40": [0.24982, 0.74947, 0, 0],
        "41": [0.24982, 0.74947, 0, 0],
        "42": [0, 0.62119, 0, 0],
        "43": [0.08319, 0.58283, 0, 0],
        "44": [0, 0.10803, 0, 0],
        "45": [0.08319, 0.58283, 0, 0],
        "46": [0, 0.10803, 0, 0],
        "47": [0.24982, 0.74947, 0, 0],
        "48": [0, 0.47534, 0, 0],
        "49": [0, 0.47534, 0, 0],
        "50": [0, 0.47534, 0, 0],
        "51": [0.18906, 0.47534, 0, 0],
        "52": [0.18906, 0.47534, 0, 0],
        "53": [0.18906, 0.47534, 0, 0],
        "54": [0, 0.69141, 0, 0],
        "55": [0.18906, 0.47534, 0, 0],
        "56": [0, 0.69141, 0, 0],
        "57": [0.18906, 0.47534, 0, 0],
        "58": [0, 0.47534, 0, 0],
        "59": [0.12604, 0.47534, 0, 0],
        "61": [-0.13099, 0.36866, 0, 0],
        "63": [0, 0.69141, 0, 0],
        "65": [0, 0.69141, 0, 0],
        "66": [0, 0.69141, 0, 0],
        "67": [0, 0.69141, 0, 0],
        "68": [0, 0.69141, 0, 0],
        "69": [0, 0.69141, 0, 0],
        "70": [0.12604, 0.69141, 0, 0],
        "71": [0, 0.69141, 0, 0],
        "72": [0.06302, 0.69141, 0, 0],
        "73": [0, 0.69141, 0, 0],
        "74": [0.12604, 0.69141, 0, 0],
        "75": [0, 0.69141, 0, 0],
        "76": [0, 0.69141, 0, 0],
        "77": [0, 0.69141, 0, 0],
        "78": [0, 0.69141, 0, 0],
        "79": [0, 0.69141, 0, 0],
        "80": [0.18906, 0.69141, 0, 0],
        "81": [0.03781, 0.69141, 0, 0],
        "82": [0, 0.69141, 0, 0],
        "83": [0, 0.69141, 0, 0],
        "84": [0, 0.69141, 0, 0],
        "85": [0, 0.69141, 0, 0],
        "86": [0, 0.69141, 0, 0],
        "87": [0, 0.69141, 0, 0],
        "88": [0, 0.69141, 0, 0],
        "89": [0.18906, 0.69141, 0, 0],
        "90": [0.12604, 0.69141, 0, 0],
        "91": [0.24982, 0.74947, 0, 0],
        "93": [0.24982, 0.74947, 0, 0],
        "94": [0, 0.69141, 0, 0],
        "97": [0, 0.47534, 0, 0],
        "98": [0, 0.69141, 0, 0],
        "99": [0, 0.47534, 0, 0],
        "100": [0, 0.62119, 0, 0],
        "101": [0, 0.47534, 0, 0],
        "102": [0.18906, 0.69141, 0, 0],
        "103": [0.18906, 0.47534, 0, 0],
        "104": [0.18906, 0.69141, 0, 0],
        "105": [0, 0.69141, 0, 0],
        "106": [0, 0.69141, 0, 0],
        "107": [0, 0.69141, 0, 0],
        "108": [0, 0.69141, 0, 0],
        "109": [0, 0.47534, 0, 0],
        "110": [0, 0.47534, 0, 0],
        "111": [0, 0.47534, 0, 0],
        "112": [0.18906, 0.52396, 0, 0],
        "113": [0.18906, 0.47534, 0, 0],
        "114": [0, 0.47534, 0, 0],
        "115": [0, 0.47534, 0, 0],
        "116": [0, 0.62119, 0, 0],
        "117": [0, 0.47534, 0, 0],
        "118": [0, 0.52396, 0, 0],
        "119": [0, 0.52396, 0, 0],
        "120": [0.18906, 0.47534, 0, 0],
        "121": [0.18906, 0.47534, 0, 0],
        "122": [0.18906, 0.47534, 0, 0],
        "8216": [0, 0.69141, 0, 0],
        "8217": [0, 0.69141, 0, 0],
        "58112": [0, 0.62119, 0, 0],
        "58113": [0, 0.62119, 0, 0],
        "58114": [0.18906, 0.69141, 0, 0],
        "58115": [0.18906, 0.69141, 0, 0],
        "58116": [0.18906, 0.47534, 0, 0],
        "58117": [0, 0.69141, 0, 0],
        "58118": [0, 0.62119, 0, 0],
        "58119": [0, 0.47534, 0, 0],
    },
    "Main-Bold": {
        "33": [0, 0.69444, 0, 0],
        "34": [0, 0.69444, 0, 0],
        "35": [0.19444, 0.69444, 0, 0],
        "36": [0.05556, 0.75, 0, 0],
        "37": [0.05556, 0.75, 0, 0],
        "38": [0, 0.69444, 0, 0],
        "39": [0, 0.69444, 0, 0],
        "40": [0.25, 0.75, 0, 0],
        "41": [0.25, 0.75, 0, 0],
        "42": [0, 0.75, 0, 0],
        "43": [0.13333, 0.63333, 0, 0],
        "44": [0.19444, 0.15556, 0, 0],
        "45": [0, 0.44444, 0, 0],
        "46": [0, 0.15556, 0, 0],
        "47": [0.25, 0.75, 0, 0],
        "48": [0, 0.64444, 0, 0],
        "49": [0, 0.64444, 0, 0],
        "50": [0, 0.64444, 0, 0],
        "51": [0, 0.64444, 0, 0],
        "52": [0, 0.64444, 0, 0],
        "53": [0, 0.64444, 0, 0],
        "54": [0, 0.64444, 0, 0],
        "55": [0, 0.64444, 0, 0],
        "56": [0, 0.64444, 0, 0],
        "57": [0, 0.64444, 0, 0],
        "58": [0, 0.44444, 0, 0],
        "59": [0.19444, 0.44444, 0, 0],
        "60": [0.08556, 0.58556, 0, 0],
        "61": [-0.10889, 0.39111, 0, 0],
        "62": [0.08556, 0.58556, 0, 0],
        "63": [0, 0.69444, 0, 0],
        "64": [0, 0.69444, 0, 0],
        "65": [0, 0.68611, 0, 0],
        "66": [0, 0.68611, 0, 0],
        "67": [0, 0.68611, 0, 0],
        "68": [0, 0.68611, 0, 0],
        "69": [0, 0.68611, 0, 0],
        "70": [0, 0.68611, 0, 0],
        "71": [0, 0.68611, 0, 0],
        "72": [0, 0.68611, 0, 0],
        "73": [0, 0.68611, 0, 0],
        "74": [0, 0.68611, 0, 0],
        "75": [0, 0.68611, 0, 0],
        "76": [0, 0.68611, 0, 0],
        "77": [0, 0.68611, 0, 0],
        "78": [0, 0.68611, 0, 0],
        "79": [0, 0.68611, 0, 0],
        "80": [0, 0.68611, 0, 0],
        "81": [0.19444, 0.68611, 0, 0],
        "82": [0, 0.68611, 0, 0],
        "83": [0, 0.68611, 0, 0],
        "84": [0, 0.68611, 0, 0],
        "85": [0, 0.68611, 0, 0],
        "86": [0, 0.68611, 0.01597, 0],
        "87": [0, 0.68611, 0.01597, 0],
        "88": [0, 0.68611, 0, 0],
        "89": [0, 0.68611, 0.02875, 0],
        "90": [0, 0.68611, 0, 0],
        "91": [0.25, 0.75, 0, 0],
        "92": [0.25, 0.75, 0, 0],
        "93": [0.25, 0.75, 0, 0],
        "94": [0, 0.69444, 0, 0],
        "95": [0.31, 0.13444, 0.03194, 0],
        "96": [0, 0.69444, 0, 0],
        "97": [0, 0.44444, 0, 0],
        "98": [0, 0.69444, 0, 0],
        "99": [0, 0.44444, 0, 0],
        "100": [0, 0.69444, 0, 0],
        "101": [0, 0.44444, 0, 0],
        "102": [0, 0.69444, 0.10903, 0],
        "103": [0.19444, 0.44444, 0.01597, 0],
        "104": [0, 0.69444, 0, 0],
        "105": [0, 0.69444, 0, 0],
        "106": [0.19444, 0.69444, 0, 0],
        "107": [0, 0.69444, 0, 0],
        "108": [0, 0.69444, 0, 0],
        "109": [0, 0.44444, 0, 0],
        "110": [0, 0.44444, 0, 0],
        "111": [0, 0.44444, 0, 0],
        "112": [0.19444, 0.44444, 0, 0],
        "113": [0.19444, 0.44444, 0, 0],
        "114": [0, 0.44444, 0, 0],
        "115": [0, 0.44444, 0, 0],
        "116": [0, 0.63492, 0, 0],
        "117": [0, 0.44444, 0, 0],
        "118": [0, 0.44444, 0.01597, 0],
        "119": [0, 0.44444, 0.01597, 0],
        "120": [0, 0.44444, 0, 0],
        "121": [0.19444, 0.44444, 0.01597, 0],
        "122": [0, 0.44444, 0, 0],
        "123": [0.25, 0.75, 0, 0],
        "124": [0.25, 0.75, 0, 0],
        "125": [0.25, 0.75, 0, 0],
        "126": [0.35, 0.34444, 0, 0],
        "168": [0, 0.69444, 0, 0],
        "172": [0, 0.44444, 0, 0],
        "175": [0, 0.59611, 0, 0],
        "176": [0, 0.69444, 0, 0],
        "177": [0.13333, 0.63333, 0, 0],
        "180": [0, 0.69444, 0, 0],
        "215": [0.13333, 0.63333, 0, 0],
        "247": [0.13333, 0.63333, 0, 0],
        "305": [0, 0.44444, 0, 0],
        "567": [0.19444, 0.44444, 0, 0],
        "710": [0, 0.69444, 0, 0],
        "711": [0, 0.63194, 0, 0],
        "713": [0, 0.59611, 0, 0],
        "714": [0, 0.69444, 0, 0],
        "715": [0, 0.69444, 0, 0],
        "728": [0, 0.69444, 0, 0],
        "729": [0, 0.69444, 0, 0],
        "730": [0, 0.69444, 0, 0],
        "732": [0, 0.69444, 0, 0],
        "768": [0, 0.69444, 0, 0],
        "769": [0, 0.69444, 0, 0],
        "770": [0, 0.69444, 0, 0],
        "771": [0, 0.69444, 0, 0],
        "772": [0, 0.59611, 0, 0],
        "774": [0, 0.69444, 0, 0],
        "775": [0, 0.69444, 0, 0],
        "776": [0, 0.69444, 0, 0],
        "778": [0, 0.69444, 0, 0],
        "779": [0, 0.69444, 0, 0],
        "780": [0, 0.63194, 0, 0],
        "824": [0.19444, 0.69444, 0, 0],
        "915": [0, 0.68611, 0, 0],
        "916": [0, 0.68611, 0, 0],
        "920": [0, 0.68611, 0, 0],
        "923": [0, 0.68611, 0, 0],
        "926": [0, 0.68611, 0, 0],
        "928": [0, 0.68611, 0, 0],
        "931": [0, 0.68611, 0, 0],
        "933": [0, 0.68611, 0, 0],
        "934": [0, 0.68611, 0, 0],
        "936": [0, 0.68611, 0, 0],
        "937": [0, 0.68611, 0, 0],
        "8211": [0, 0.44444, 0.03194, 0],
        "8212": [0, 0.44444, 0.03194, 0],
        "8216": [0, 0.69444, 0, 0],
        "8217": [0, 0.69444, 0, 0],
        "8220": [0, 0.69444, 0, 0],
        "8221": [0, 0.69444, 0, 0],
        "8224": [0.19444, 0.69444, 0, 0],
        "8225": [0.19444, 0.69444, 0, 0],
        "8242": [0, 0.55556, 0, 0],
        "8407": [0, 0.72444, 0.15486, 0],
        "8463": [0, 0.69444, 0, 0],
        "8465": [0, 0.69444, 0, 0],
        "8467": [0, 0.69444, 0, 0],
        "8472": [0.19444, 0.44444, 0, 0],
        "8476": [0, 0.69444, 0, 0],
        "8501": [0, 0.69444, 0, 0],
        "8592": [-0.10889, 0.39111, 0, 0],
        "8593": [0.19444, 0.69444, 0, 0],
        "8594": [-0.10889, 0.39111, 0, 0],
        "8595": [0.19444, 0.69444, 0, 0],
        "8596": [-0.10889, 0.39111, 0, 0],
        "8597": [0.25, 0.75, 0, 0],
        "8598": [0.19444, 0.69444, 0, 0],
        "8599": [0.19444, 0.69444, 0, 0],
        "8600": [0.19444, 0.69444, 0, 0],
        "8601": [0.19444, 0.69444, 0, 0],
        "8636": [-0.10889, 0.39111, 0, 0],
        "8637": [-0.10889, 0.39111, 0, 0],
        "8640": [-0.10889, 0.39111, 0, 0],
        "8641": [-0.10889, 0.39111, 0, 0],
        "8656": [-0.10889, 0.39111, 0, 0],
        "8657": [0.19444, 0.69444, 0, 0],
        "8658": [-0.10889, 0.39111, 0, 0],
        "8659": [0.19444, 0.69444, 0, 0],
        "8660": [-0.10889, 0.39111, 0, 0],
        "8661": [0.25, 0.75, 0, 0],
        "8704": [0, 0.69444, 0, 0],
        "8706": [0, 0.69444, 0.06389, 0],
        "8707": [0, 0.69444, 0, 0],
        "8709": [0.05556, 0.75, 0, 0],
        "8711": [0, 0.68611, 0, 0],
        "8712": [0.08556, 0.58556, 0, 0],
        "8715": [0.08556, 0.58556, 0, 0],
        "8722": [0.13333, 0.63333, 0, 0],
        "8723": [0.13333, 0.63333, 0, 0],
        "8725": [0.25, 0.75, 0, 0],
        "8726": [0.25, 0.75, 0, 0],
        "8727": [-0.02778, 0.47222, 0, 0],
        "8728": [-0.02639, 0.47361, 0, 0],
        "8729": [-0.02639, 0.47361, 0, 0],
        "8730": [0.18, 0.82, 0, 0],
        "8733": [0, 0.44444, 0, 0],
        "8734": [0, 0.44444, 0, 0],
        "8736": [0, 0.69224, 0, 0],
        "8739": [0.25, 0.75, 0, 0],
        "8741": [0.25, 0.75, 0, 0],
        "8743": [0, 0.55556, 0, 0],
        "8744": [0, 0.55556, 0, 0],
        "8745": [0, 0.55556, 0, 0],
        "8746": [0, 0.55556, 0, 0],
        "8747": [0.19444, 0.69444, 0.12778, 0],
        "8764": [-0.10889, 0.39111, 0, 0],
        "8768": [0.19444, 0.69444, 0, 0],
        "8771": [0.00222, 0.50222, 0, 0],
        "8776": [0.02444, 0.52444, 0, 0],
        "8781": [0.00222, 0.50222, 0, 0],
        "8801": [0.00222, 0.50222, 0, 0],
        "8804": [0.19667, 0.69667, 0, 0],
        "8805": [0.19667, 0.69667, 0, 0],
        "8810": [0.08556, 0.58556, 0, 0],
        "8811": [0.08556, 0.58556, 0, 0],
        "8826": [0.08556, 0.58556, 0, 0],
        "8827": [0.08556, 0.58556, 0, 0],
        "8834": [0.08556, 0.58556, 0, 0],
        "8835": [0.08556, 0.58556, 0, 0],
        "8838": [0.19667, 0.69667, 0, 0],
        "8839": [0.19667, 0.69667, 0, 0],
        "8846": [0, 0.55556, 0, 0],
        "8849": [0.19667, 0.69667, 0, 0],
        "8850": [0.19667, 0.69667, 0, 0],
        "8851": [0, 0.55556, 0, 0],
        "8852": [0, 0.55556, 0, 0],
        "8853": [0.13333, 0.63333, 0, 0],
        "8854": [0.13333, 0.63333, 0, 0],
        "8855": [0.13333, 0.63333, 0, 0],
        "8856": [0.13333, 0.63333, 0, 0],
        "8857": [0.13333, 0.63333, 0, 0],
        "8866": [0, 0.69444, 0, 0],
        "8867": [0, 0.69444, 0, 0],
        "8868": [0, 0.69444, 0, 0],
        "8869": [0, 0.69444, 0, 0],
        "8900": [-0.02639, 0.47361, 0, 0],
        "8901": [-0.02639, 0.47361, 0, 0],
        "8902": [-0.02778, 0.47222, 0, 0],
        "8968": [0.25, 0.75, 0, 0],
        "8969": [0.25, 0.75, 0, 0],
        "8970": [0.25, 0.75, 0, 0],
        "8971": [0.25, 0.75, 0, 0],
        "8994": [-0.13889, 0.36111, 0, 0],
        "8995": [-0.13889, 0.36111, 0, 0],
        "9651": [0.19444, 0.69444, 0, 0],
        "9657": [-0.02778, 0.47222, 0, 0],
        "9661": [0.19444, 0.69444, 0, 0],
        "9667": [-0.02778, 0.47222, 0, 0],
        "9711": [0.19444, 0.69444, 0, 0],
        "9824": [0.12963, 0.69444, 0, 0],
        "9825": [0.12963, 0.69444, 0, 0],
        "9826": [0.12963, 0.69444, 0, 0],
        "9827": [0.12963, 0.69444, 0, 0],
        "9837": [0, 0.75, 0, 0],
        "9838": [0.19444, 0.69444, 0, 0],
        "9839": [0.19444, 0.69444, 0, 0],
        "10216": [0.25, 0.75, 0, 0],
        "10217": [0.25, 0.75, 0, 0],
        "10815": [0, 0.68611, 0, 0],
        "10927": [0.19667, 0.69667, 0, 0],
        "10928": [0.19667, 0.69667, 0, 0],
    },
    "Main-Italic": {
        "33": [0, 0.69444, 0.12417, 0],
        "34": [0, 0.69444, 0.06961, 0],
        "35": [0.19444, 0.69444, 0.06616, 0],
        "37": [0.05556, 0.75, 0.13639, 0],
        "38": [0, 0.69444, 0.09694, 0],
        "39": [0, 0.69444, 0.12417, 0],
        "40": [0.25, 0.75, 0.16194, 0],
        "41": [0.25, 0.75, 0.03694, 0],
        "42": [0, 0.75, 0.14917, 0],
        "43": [0.05667, 0.56167, 0.03694, 0],
        "44": [0.19444, 0.10556, 0, 0],
        "45": [0, 0.43056, 0.02826, 0],
        "46": [0, 0.10556, 0, 0],
        "47": [0.25, 0.75, 0.16194, 0],
        "48": [0, 0.64444, 0.13556, 0],
        "49": [0, 0.64444, 0.13556, 0],
        "50": [0, 0.64444, 0.13556, 0],
        "51": [0, 0.64444, 0.13556, 0],
        "52": [0.19444, 0.64444, 0.13556, 0],
        "53": [0, 0.64444, 0.13556, 0],
        "54": [0, 0.64444, 0.13556, 0],
        "55": [0.19444, 0.64444, 0.13556, 0],
        "56": [0, 0.64444, 0.13556, 0],
        "57": [0, 0.64444, 0.13556, 0],
        "58": [0, 0.43056, 0.0582, 0],
        "59": [0.19444, 0.43056, 0.0582, 0],
        "61": [-0.13313, 0.36687, 0.06616, 0],
        "63": [0, 0.69444, 0.1225, 0],
        "64": [0, 0.69444, 0.09597, 0],
        "65": [0, 0.68333, 0, 0],
        "66": [0, 0.68333, 0.10257, 0],
        "67": [0, 0.68333, 0.14528, 0],
        "68": [0, 0.68333, 0.09403, 0],
        "69": [0, 0.68333, 0.12028, 0],
        "70": [0, 0.68333, 0.13305, 0],
        "71": [0, 0.68333, 0.08722, 0],
        "72": [0, 0.68333, 0.16389, 0],
        "73": [0, 0.68333, 0.15806, 0],
        "74": [0, 0.68333, 0.14028, 0],
        "75": [0, 0.68333, 0.14528, 0],
        "76": [0, 0.68333, 0, 0],
        "77": [0, 0.68333, 0.16389, 0],
        "78": [0, 0.68333, 0.16389, 0],
        "79": [0, 0.68333, 0.09403, 0],
        "80": [0, 0.68333, 0.10257, 0],
        "81": [0.19444, 0.68333, 0.09403, 0],
        "82": [0, 0.68333, 0.03868, 0],
        "83": [0, 0.68333, 0.11972, 0],
        "84": [0, 0.68333, 0.13305, 0],
        "85": [0, 0.68333, 0.16389, 0],
        "86": [0, 0.68333, 0.18361, 0],
        "87": [0, 0.68333, 0.18361, 0],
        "88": [0, 0.68333, 0.15806, 0],
        "89": [0, 0.68333, 0.19383, 0],
        "90": [0, 0.68333, 0.14528, 0],
        "91": [0.25, 0.75, 0.1875, 0],
        "93": [0.25, 0.75, 0.10528, 0],
        "94": [0, 0.69444, 0.06646, 0],
        "95": [0.31, 0.12056, 0.09208, 0],
        "97": [0, 0.43056, 0.07671, 0],
        "98": [0, 0.69444, 0.06312, 0],
        "99": [0, 0.43056, 0.05653, 0],
        "100": [0, 0.69444, 0.10333, 0],
        "101": [0, 0.43056, 0.07514, 0],
        "102": [0.19444, 0.69444, 0.21194, 0],
        "103": [0.19444, 0.43056, 0.08847, 0],
        "104": [0, 0.69444, 0.07671, 0],
        "105": [0, 0.65536, 0.1019, 0],
        "106": [0.19444, 0.65536, 0.14467, 0],
        "107": [0, 0.69444, 0.10764, 0],
        "108": [0, 0.69444, 0.10333, 0],
        "109": [0, 0.43056, 0.07671, 0],
        "110": [0, 0.43056, 0.07671, 0],
        "111": [0, 0.43056, 0.06312, 0],
        "112": [0.19444, 0.43056, 0.06312, 0],
        "113": [0.19444, 0.43056, 0.08847, 0],
        "114": [0, 0.43056, 0.10764, 0],
        "115": [0, 0.43056, 0.08208, 0],
        "116": [0, 0.61508, 0.09486, 0],
        "117": [0, 0.43056, 0.07671, 0],
        "118": [0, 0.43056, 0.10764, 0],
        "119": [0, 0.43056, 0.10764, 0],
        "120": [0, 0.43056, 0.12042, 0],
        "121": [0.19444, 0.43056, 0.08847, 0],
        "122": [0, 0.43056, 0.12292, 0],
        "126": [0.35, 0.31786, 0.11585, 0],
        "163": [0, 0.69444, 0, 0],
        "305": [0, 0.43056, 0, 0.02778],
        "567": [0.19444, 0.43056, 0, 0.08334],
        "768": [0, 0.69444, 0, 0],
        "769": [0, 0.69444, 0.09694, 0],
        "770": [0, 0.69444, 0.06646, 0],
        "771": [0, 0.66786, 0.11585, 0],
        "772": [0, 0.56167, 0.10333, 0],
        "774": [0, 0.69444, 0.10806, 0],
        "775": [0, 0.66786, 0.11752, 0],
        "776": [0, 0.66786, 0.10474, 0],
        "778": [0, 0.69444, 0, 0],
        "779": [0, 0.69444, 0.1225, 0],
        "780": [0, 0.62847, 0.08295, 0],
        "915": [0, 0.68333, 0.13305, 0],
        "916": [0, 0.68333, 0, 0],
        "920": [0, 0.68333, 0.09403, 0],
        "923": [0, 0.68333, 0, 0],
        "926": [0, 0.68333, 0.15294, 0],
        "928": [0, 0.68333, 0.16389, 0],
        "931": [0, 0.68333, 0.12028, 0],
        "933": [0, 0.68333, 0.11111, 0],
        "934": [0, 0.68333, 0.05986, 0],
        "936": [0, 0.68333, 0.11111, 0],
        "937": [0, 0.68333, 0.10257, 0],
        "8211": [0, 0.43056, 0.09208, 0],
        "8212": [0, 0.43056, 0.09208, 0],
        "8216": [0, 0.69444, 0.12417, 0],
        "8217": [0, 0.69444, 0.12417, 0],
        "8220": [0, 0.69444, 0.1685, 0],
        "8221": [0, 0.69444, 0.06961, 0],
        "8463": [0, 0.68889, 0, 0],
    },
    "Main-Regular": {
        "32": [0, 0, 0, 0],
        "33": [0, 0.69444, 0, 0],
        "34": [0, 0.69444, 0, 0],
        "35": [0.19444, 0.69444, 0, 0],
        "36": [0.05556, 0.75, 0, 0],
        "37": [0.05556, 0.75, 0, 0],
        "38": [0, 0.69444, 0, 0],
        "39": [0, 0.69444, 0, 0],
        "40": [0.25, 0.75, 0, 0],
        "41": [0.25, 0.75, 0, 0],
        "42": [0, 0.75, 0, 0],
        "43": [0.08333, 0.58333, 0, 0],
        "44": [0.19444, 0.10556, 0, 0],
        "45": [0, 0.43056, 0, 0],
        "46": [0, 0.10556, 0, 0],
        "47": [0.25, 0.75, 0, 0],
        "48": [0, 0.64444, 0, 0],
        "49": [0, 0.64444, 0, 0],
        "50": [0, 0.64444, 0, 0],
        "51": [0, 0.64444, 0, 0],
        "52": [0, 0.64444, 0, 0],
        "53": [0, 0.64444, 0, 0],
        "54": [0, 0.64444, 0, 0],
        "55": [0, 0.64444, 0, 0],
        "56": [0, 0.64444, 0, 0],
        "57": [0, 0.64444, 0, 0],
        "58": [0, 0.43056, 0, 0],
        "59": [0.19444, 0.43056, 0, 0],
        "60": [0.0391, 0.5391, 0, 0],
        "61": [-0.13313, 0.36687, 0, 0],
        "62": [0.0391, 0.5391, 0, 0],
        "63": [0, 0.69444, 0, 0],
        "64": [0, 0.69444, 0, 0],
        "65": [0, 0.68333, 0, 0],
        "66": [0, 0.68333, 0, 0],
        "67": [0, 0.68333, 0, 0],
        "68": [0, 0.68333, 0, 0],
        "69": [0, 0.68333, 0, 0],
        "70": [0, 0.68333, 0, 0],
        "71": [0, 0.68333, 0, 0],
        "72": [0, 0.68333, 0, 0],
        "73": [0, 0.68333, 0, 0],
        "74": [0, 0.68333, 0, 0],
        "75": [0, 0.68333, 0, 0],
        "76": [0, 0.68333, 0, 0],
        "77": [0, 0.68333, 0, 0],
        "78": [0, 0.68333, 0, 0],
        "79": [0, 0.68333, 0, 0],
        "80": [0, 0.68333, 0, 0],
        "81": [0.19444, 0.68333, 0, 0],
        "82": [0, 0.68333, 0, 0],
        "83": [0, 0.68333, 0, 0],
        "84": [0, 0.68333, 0, 0],
        "85": [0, 0.68333, 0, 0],
        "86": [0, 0.68333, 0.01389, 0],
        "87": [0, 0.68333, 0.01389, 0],
        "88": [0, 0.68333, 0, 0],
        "89": [0, 0.68333, 0.025, 0],
        "90": [0, 0.68333, 0, 0],
        "91": [0.25, 0.75, 0, 0],
        "92": [0.25, 0.75, 0, 0],
        "93": [0.25, 0.75, 0, 0],
        "94": [0, 0.69444, 0, 0],
        "95": [0.31, 0.12056, 0.02778, 0],
        "96": [0, 0.69444, 0, 0],
        "97": [0, 0.43056, 0, 0],
        "98": [0, 0.69444, 0, 0],
        "99": [0, 0.43056, 0, 0],
        "100": [0, 0.69444, 0, 0],
        "101": [0, 0.43056, 0, 0],
        "102": [0, 0.69444, 0.07778, 0],
        "103": [0.19444, 0.43056, 0.01389, 0],
        "104": [0, 0.69444, 0, 0],
        "105": [0, 0.66786, 0, 0],
        "106": [0.19444, 0.66786, 0, 0],
        "107": [0, 0.69444, 0, 0],
        "108": [0, 0.69444, 0, 0],
        "109": [0, 0.43056, 0, 0],
        "110": [0, 0.43056, 0, 0],
        "111": [0, 0.43056, 0, 0],
        "112": [0.19444, 0.43056, 0, 0],
        "113": [0.19444, 0.43056, 0, 0],
        "114": [0, 0.43056, 0, 0],
        "115": [0, 0.43056, 0, 0],
        "116": [0, 0.61508, 0, 0],
        "117": [0, 0.43056, 0, 0],
        "118": [0, 0.43056, 0.01389, 0],
        "119": [0, 0.43056, 0.01389, 0],
        "120": [0, 0.43056, 0, 0],
        "121": [0.19444, 0.43056, 0.01389, 0],
        "122": [0, 0.43056, 0, 0],
        "123": [0.25, 0.75, 0, 0],
        "124": [0.25, 0.75, 0, 0],
        "125": [0.25, 0.75, 0, 0],
        "126": [0.35, 0.31786, 0, 0],
        "160": [0, 0, 0, 0],
        "168": [0, 0.66786, 0, 0],
        "172": [0, 0.43056, 0, 0],
        "175": [0, 0.56778, 0, 0],
        "176": [0, 0.69444, 0, 0],
        "177": [0.08333, 0.58333, 0, 0],
        "180": [0, 0.69444, 0, 0],
        "215": [0.08333, 0.58333, 0, 0],
        "247": [0.08333, 0.58333, 0, 0],
        "305": [0, 0.43056, 0, 0],
        "567": [0.19444, 0.43056, 0, 0],
        "710": [0, 0.69444, 0, 0],
        "711": [0, 0.62847, 0, 0],
        "713": [0, 0.56778, 0, 0],
        "714": [0, 0.69444, 0, 0],
        "715": [0, 0.69444, 0, 0],
        "728": [0, 0.69444, 0, 0],
        "729": [0, 0.66786, 0, 0],
        "730": [0, 0.69444, 0, 0],
        "732": [0, 0.66786, 0, 0],
        "768": [0, 0.69444, 0, 0],
        "769": [0, 0.69444, 0, 0],
        "770": [0, 0.69444, 0, 0],
        "771": [0, 0.66786, 0, 0],
        "772": [0, 0.56778, 0, 0],
        "774": [0, 0.69444, 0, 0],
        "775": [0, 0.66786, 0, 0],
        "776": [0, 0.66786, 0, 0],
        "778": [0, 0.69444, 0, 0],
        "779": [0, 0.69444, 0, 0],
        "780": [0, 0.62847, 0, 0],
        "824": [0.19444, 0.69444, 0, 0],
        "915": [0, 0.68333, 0, 0],
        "916": [0, 0.68333, 0, 0],
        "920": [0, 0.68333, 0, 0],
        "923": [0, 0.68333, 0, 0],
        "926": [0, 0.68333, 0, 0],
        "928": [0, 0.68333, 0, 0],
        "931": [0, 0.68333, 0, 0],
        "933": [0, 0.68333, 0, 0],
        "934": [0, 0.68333, 0, 0],
        "936": [0, 0.68333, 0, 0],
        "937": [0, 0.68333, 0, 0],
        "8211": [0, 0.43056, 0.02778, 0],
        "8212": [0, 0.43056, 0.02778, 0],
        "8216": [0, 0.69444, 0, 0],
        "8217": [0, 0.69444, 0, 0],
        "8220": [0, 0.69444, 0, 0],
        "8221": [0, 0.69444, 0, 0],
        "8224": [0.19444, 0.69444, 0, 0],
        "8225": [0.19444, 0.69444, 0, 0],
        "8230": [0, 0.12, 0, 0],
        "8242": [0, 0.55556, 0, 0],
        "8407": [0, 0.71444, 0.15382, 0],
        "8463": [0, 0.68889, 0, 0],
        "8465": [0, 0.69444, 0, 0],
        "8467": [0, 0.69444, 0, 0.11111],
        "8472": [0.19444, 0.43056, 0, 0.11111],
        "8476": [0, 0.69444, 0, 0],
        "8501": [0, 0.69444, 0, 0],
        "8592": [-0.13313, 0.36687, 0, 0],
        "8593": [0.19444, 0.69444, 0, 0],
        "8594": [-0.13313, 0.36687, 0, 0],
        "8595": [0.19444, 0.69444, 0, 0],
        "8596": [-0.13313, 0.36687, 0, 0],
        "8597": [0.25, 0.75, 0, 0],
        "8598": [0.19444, 0.69444, 0, 0],
        "8599": [0.19444, 0.69444, 0, 0],
        "8600": [0.19444, 0.69444, 0, 0],
        "8601": [0.19444, 0.69444, 0, 0],
        "8614": [0.011, 0.511, 0, 0],
        "8617": [0.011, 0.511, 0, 0],
        "8618": [0.011, 0.511, 0, 0],
        "8636": [-0.13313, 0.36687, 0, 0],
        "8637": [-0.13313, 0.36687, 0, 0],
        "8640": [-0.13313, 0.36687, 0, 0],
        "8641": [-0.13313, 0.36687, 0, 0],
        "8652": [0.011, 0.671, 0, 0],
        "8656": [-0.13313, 0.36687, 0, 0],
        "8657": [0.19444, 0.69444, 0, 0],
        "8658": [-0.13313, 0.36687, 0, 0],
        "8659": [0.19444, 0.69444, 0, 0],
        "8660": [-0.13313, 0.36687, 0, 0],
        "8661": [0.25, 0.75, 0, 0],
        "8704": [0, 0.69444, 0, 0],
        "8706": [0, 0.69444, 0.05556, 0.08334],
        "8707": [0, 0.69444, 0, 0],
        "8709": [0.05556, 0.75, 0, 0],
        "8711": [0, 0.68333, 0, 0],
        "8712": [0.0391, 0.5391, 0, 0],
        "8715": [0.0391, 0.5391, 0, 0],
        "8722": [0.08333, 0.58333, 0, 0],
        "8723": [0.08333, 0.58333, 0, 0],
        "8725": [0.25, 0.75, 0, 0],
        "8726": [0.25, 0.75, 0, 0],
        "8727": [-0.03472, 0.46528, 0, 0],
        "8728": [-0.05555, 0.44445, 0, 0],
        "8729": [-0.05555, 0.44445, 0, 0],
        "8730": [0.2, 0.8, 0, 0],
        "8733": [0, 0.43056, 0, 0],
        "8734": [0, 0.43056, 0, 0],
        "8736": [0, 0.69224, 0, 0],
        "8739": [0.25, 0.75, 0, 0],
        "8741": [0.25, 0.75, 0, 0],
        "8743": [0, 0.55556, 0, 0],
        "8744": [0, 0.55556, 0, 0],
        "8745": [0, 0.55556, 0, 0],
        "8746": [0, 0.55556, 0, 0],
        "8747": [0.19444, 0.69444, 0.11111, 0],
        "8764": [-0.13313, 0.36687, 0, 0],
        "8768": [0.19444, 0.69444, 0, 0],
        "8771": [-0.03625, 0.46375, 0, 0],
        "8773": [-0.022, 0.589, 0, 0],
        "8776": [-0.01688, 0.48312, 0, 0],
        "8781": [-0.03625, 0.46375, 0, 0],
        "8784": [-0.133, 0.67, 0, 0],
        "8800": [0.215, 0.716, 0, 0],
        "8801": [-0.03625, 0.46375, 0, 0],
        "8804": [0.13597, 0.63597, 0, 0],
        "8805": [0.13597, 0.63597, 0, 0],
        "8810": [0.0391, 0.5391, 0, 0],
        "8811": [0.0391, 0.5391, 0, 0],
        "8826": [0.0391, 0.5391, 0, 0],
        "8827": [0.0391, 0.5391, 0, 0],
        "8834": [0.0391, 0.5391, 0, 0],
        "8835": [0.0391, 0.5391, 0, 0],
        "8838": [0.13597, 0.63597, 0, 0],
        "8839": [0.13597, 0.63597, 0, 0],
        "8846": [0, 0.55556, 0, 0],
        "8849": [0.13597, 0.63597, 0, 0],
        "8850": [0.13597, 0.63597, 0, 0],
        "8851": [0, 0.55556, 0, 0],
        "8852": [0, 0.55556, 0, 0],
        "8853": [0.08333, 0.58333, 0, 0],
        "8854": [0.08333, 0.58333, 0, 0],
        "8855": [0.08333, 0.58333, 0, 0],
        "8856": [0.08333, 0.58333, 0, 0],
        "8857": [0.08333, 0.58333, 0, 0],
        "8866": [0, 0.69444, 0, 0],
        "8867": [0, 0.69444, 0, 0],
        "8868": [0, 0.69444, 0, 0],
        "8869": [0, 0.69444, 0, 0],
        "8872": [0.249, 0.75, 0, 0],
        "8900": [-0.05555, 0.44445, 0, 0],
        "8901": [-0.05555, 0.44445, 0, 0],
        "8902": [-0.03472, 0.46528, 0, 0],
        "8904": [0.005, 0.505, 0, 0],
        "8942": [0.03, 0.9, 0, 0],
        "8943": [-0.19, 0.31, 0, 0],
        "8945": [-0.1, 0.82, 0, 0],
        "8968": [0.25, 0.75, 0, 0],
        "8969": [0.25, 0.75, 0, 0],
        "8970": [0.25, 0.75, 0, 0],
        "8971": [0.25, 0.75, 0, 0],
        "8994": [-0.14236, 0.35764, 0, 0],
        "8995": [-0.14236, 0.35764, 0, 0],
        "9136": [0.244, 0.744, 0, 0],
        "9137": [0.244, 0.744, 0, 0],
        "9651": [0.19444, 0.69444, 0, 0],
        "9657": [-0.03472, 0.46528, 0, 0],
        "9661": [0.19444, 0.69444, 0, 0],
        "9667": [-0.03472, 0.46528, 0, 0],
        "9711": [0.19444, 0.69444, 0, 0],
        "9824": [0.12963, 0.69444, 0, 0],
        "9825": [0.12963, 0.69444, 0, 0],
        "9826": [0.12963, 0.69444, 0, 0],
        "9827": [0.12963, 0.69444, 0, 0],
        "9837": [0, 0.75, 0, 0],
        "9838": [0.19444, 0.69444, 0, 0],
        "9839": [0.19444, 0.69444, 0, 0],
        "10216": [0.25, 0.75, 0, 0],
        "10217": [0.25, 0.75, 0, 0],
        "10222": [0.244, 0.744, 0, 0],
        "10223": [0.244, 0.744, 0, 0],
        "10229": [0.011, 0.511, 0, 0],
        "10230": [0.011, 0.511, 0, 0],
        "10231": [0.011, 0.511, 0, 0],
        "10232": [0.024, 0.525, 0, 0],
        "10233": [0.024, 0.525, 0, 0],
        "10234": [0.024, 0.525, 0, 0],
        "10236": [0.011, 0.511, 0, 0],
        "10815": [0, 0.68333, 0, 0],
        "10927": [0.13597, 0.63597, 0, 0],
        "10928": [0.13597, 0.63597, 0, 0],
    },
    "Math-BoldItalic": {
        "47": [0.19444, 0.69444, 0, 0],
        "65": [0, 0.68611, 0, 0],
        "66": [0, 0.68611, 0.04835, 0],
        "67": [0, 0.68611, 0.06979, 0],
        "68": [0, 0.68611, 0.03194, 0],
        "69": [0, 0.68611, 0.05451, 0],
        "70": [0, 0.68611, 0.15972, 0],
        "71": [0, 0.68611, 0, 0],
        "72": [0, 0.68611, 0.08229, 0],
        "73": [0, 0.68611, 0.07778, 0],
        "74": [0, 0.68611, 0.10069, 0],
        "75": [0, 0.68611, 0.06979, 0],
        "76": [0, 0.68611, 0, 0],
        "77": [0, 0.68611, 0.11424, 0],
        "78": [0, 0.68611, 0.11424, 0],
        "79": [0, 0.68611, 0.03194, 0],
        "80": [0, 0.68611, 0.15972, 0],
        "81": [0.19444, 0.68611, 0, 0],
        "82": [0, 0.68611, 0.00421, 0],
        "83": [0, 0.68611, 0.05382, 0],
        "84": [0, 0.68611, 0.15972, 0],
        "85": [0, 0.68611, 0.11424, 0],
        "86": [0, 0.68611, 0.25555, 0],
        "87": [0, 0.68611, 0.15972, 0],
        "88": [0, 0.68611, 0.07778, 0],
        "89": [0, 0.68611, 0.25555, 0],
        "90": [0, 0.68611, 0.06979, 0],
        "97": [0, 0.44444, 0, 0],
        "98": [0, 0.69444, 0, 0],
        "99": [0, 0.44444, 0, 0],
        "100": [0, 0.69444, 0, 0],
        "101": [0, 0.44444, 0, 0],
        "102": [0.19444, 0.69444, 0.11042, 0],
        "103": [0.19444, 0.44444, 0.03704, 0],
        "104": [0, 0.69444, 0, 0],
        "105": [0, 0.69326, 0, 0],
        "106": [0.19444, 0.69326, 0.0622, 0],
        "107": [0, 0.69444, 0.01852, 0],
        "108": [0, 0.69444, 0.0088, 0],
        "109": [0, 0.44444, 0, 0],
        "110": [0, 0.44444, 0, 0],
        "111": [0, 0.44444, 0, 0],
        "112": [0.19444, 0.44444, 0, 0],
        "113": [0.19444, 0.44444, 0.03704, 0],
        "114": [0, 0.44444, 0.03194, 0],
        "115": [0, 0.44444, 0, 0],
        "116": [0, 0.63492, 0, 0],
        "117": [0, 0.44444, 0, 0],
        "118": [0, 0.44444, 0.03704, 0],
        "119": [0, 0.44444, 0.02778, 0],
        "120": [0, 0.44444, 0, 0],
        "121": [0.19444, 0.44444, 0.03704, 0],
        "122": [0, 0.44444, 0.04213, 0],
        "915": [0, 0.68611, 0.15972, 0],
        "916": [0, 0.68611, 0, 0],
        "920": [0, 0.68611, 0.03194, 0],
        "923": [0, 0.68611, 0, 0],
        "926": [0, 0.68611, 0.07458, 0],
        "928": [0, 0.68611, 0.08229, 0],
        "931": [0, 0.68611, 0.05451, 0],
        "933": [0, 0.68611, 0.15972, 0],
        "934": [0, 0.68611, 0, 0],
        "936": [0, 0.68611, 0.11653, 0],
        "937": [0, 0.68611, 0.04835, 0],
        "945": [0, 0.44444, 0, 0],
        "946": [0.19444, 0.69444, 0.03403, 0],
        "947": [0.19444, 0.44444, 0.06389, 0],
        "948": [0, 0.69444, 0.03819, 0],
        "949": [0, 0.44444, 0, 0],
        "950": [0.19444, 0.69444, 0.06215, 0],
        "951": [0.19444, 0.44444, 0.03704, 0],
        "952": [0, 0.69444, 0.03194, 0],
        "953": [0, 0.44444, 0, 0],
        "954": [0, 0.44444, 0, 0],
        "955": [0, 0.69444, 0, 0],
        "956": [0.19444, 0.44444, 0, 0],
        "957": [0, 0.44444, 0.06898, 0],
        "958": [0.19444, 0.69444, 0.03021, 0],
        "959": [0, 0.44444, 0, 0],
        "960": [0, 0.44444, 0.03704, 0],
        "961": [0.19444, 0.44444, 0, 0],
        "962": [0.09722, 0.44444, 0.07917, 0],
        "963": [0, 0.44444, 0.03704, 0],
        "964": [0, 0.44444, 0.13472, 0],
        "965": [0, 0.44444, 0.03704, 0],
        "966": [0.19444, 0.44444, 0, 0],
        "967": [0.19444, 0.44444, 0, 0],
        "968": [0.19444, 0.69444, 0.03704, 0],
        "969": [0, 0.44444, 0.03704, 0],
        "977": [0, 0.69444, 0, 0],
        "981": [0.19444, 0.69444, 0, 0],
        "982": [0, 0.44444, 0.03194, 0],
        "1009": [0.19444, 0.44444, 0, 0],
        "1013": [0, 0.44444, 0, 0],
    },
    "Math-Italic": {
        "47": [0.19444, 0.69444, 0, 0],
        "65": [0, 0.68333, 0, 0.13889],
        "66": [0, 0.68333, 0.05017, 0.08334],
        "67": [0, 0.68333, 0.07153, 0.08334],
        "68": [0, 0.68333, 0.02778, 0.05556],
        "69": [0, 0.68333, 0.05764, 0.08334],
        "70": [0, 0.68333, 0.13889, 0.08334],
        "71": [0, 0.68333, 0, 0.08334],
        "72": [0, 0.68333, 0.08125, 0.05556],
        "73": [0, 0.68333, 0.07847, 0.11111],
        "74": [0, 0.68333, 0.09618, 0.16667],
        "75": [0, 0.68333, 0.07153, 0.05556],
        "76": [0, 0.68333, 0, 0.02778],
        "77": [0, 0.68333, 0.10903, 0.08334],
        "78": [0, 0.68333, 0.10903, 0.08334],
        "79": [0, 0.68333, 0.02778, 0.08334],
        "80": [0, 0.68333, 0.13889, 0.08334],
        "81": [0.19444, 0.68333, 0, 0.08334],
        "82": [0, 0.68333, 0.00773, 0.08334],
        "83": [0, 0.68333, 0.05764, 0.08334],
        "84": [0, 0.68333, 0.13889, 0.08334],
        "85": [0, 0.68333, 0.10903, 0.02778],
        "86": [0, 0.68333, 0.22222, 0],
        "87": [0, 0.68333, 0.13889, 0],
        "88": [0, 0.68333, 0.07847, 0.08334],
        "89": [0, 0.68333, 0.22222, 0],
        "90": [0, 0.68333, 0.07153, 0.08334],
        "97": [0, 0.43056, 0, 0],
        "98": [0, 0.69444, 0, 0],
        "99": [0, 0.43056, 0, 0.05556],
        "100": [0, 0.69444, 0, 0.16667],
        "101": [0, 0.43056, 0, 0.05556],
        "102": [0.19444, 0.69444, 0.10764, 0.16667],
        "103": [0.19444, 0.43056, 0.03588, 0.02778],
        "104": [0, 0.69444, 0, 0],
        "105": [0, 0.65952, 0, 0],
        "106": [0.19444, 0.65952, 0.05724, 0],
        "107": [0, 0.69444, 0.03148, 0],
        "108": [0, 0.69444, 0.01968, 0.08334],
        "109": [0, 0.43056, 0, 0],
        "110": [0, 0.43056, 0, 0],
        "111": [0, 0.43056, 0, 0.05556],
        "112": [0.19444, 0.43056, 0, 0.08334],
        "113": [0.19444, 0.43056, 0.03588, 0.08334],
        "114": [0, 0.43056, 0.02778, 0.05556],
        "115": [0, 0.43056, 0, 0.05556],
        "116": [0, 0.61508, 0, 0.08334],
        "117": [0, 0.43056, 0, 0.02778],
        "118": [0, 0.43056, 0.03588, 0.02778],
        "119": [0, 0.43056, 0.02691, 0.08334],
        "120": [0, 0.43056, 0, 0.02778],
        "121": [0.19444, 0.43056, 0.03588, 0.05556],
        "122": [0, 0.43056, 0.04398, 0.05556],
        "915": [0, 0.68333, 0.13889, 0.08334],
        "916": [0, 0.68333, 0, 0.16667],
        "920": [0, 0.68333, 0.02778, 0.08334],
        "923": [0, 0.68333, 0, 0.16667],
        "926": [0, 0.68333, 0.07569, 0.08334],
        "928": [0, 0.68333, 0.08125, 0.05556],
        "931": [0, 0.68333, 0.05764, 0.08334],
        "933": [0, 0.68333, 0.13889, 0.05556],
        "934": [0, 0.68333, 0, 0.08334],
        "936": [0, 0.68333, 0.11, 0.05556],
        "937": [0, 0.68333, 0.05017, 0.08334],
        "945": [0, 0.43056, 0.0037, 0.02778],
        "946": [0.19444, 0.69444, 0.05278, 0.08334],
        "947": [0.19444, 0.43056, 0.05556, 0],
        "948": [0, 0.69444, 0.03785, 0.05556],
        "949": [0, 0.43056, 0, 0.08334],
        "950": [0.19444, 0.69444, 0.07378, 0.08334],
        "951": [0.19444, 0.43056, 0.03588, 0.05556],
        "952": [0, 0.69444, 0.02778, 0.08334],
        "953": [0, 0.43056, 0, 0.05556],
        "954": [0, 0.43056, 0, 0],
        "955": [0, 0.69444, 0, 0],
        "956": [0.19444, 0.43056, 0, 0.02778],
        "957": [0, 0.43056, 0.06366, 0.02778],
        "958": [0.19444, 0.69444, 0.04601, 0.11111],
        "959": [0, 0.43056, 0, 0.05556],
        "960": [0, 0.43056, 0.03588, 0],
        "961": [0.19444, 0.43056, 0, 0.08334],
        "962": [0.09722, 0.43056, 0.07986, 0.08334],
        "963": [0, 0.43056, 0.03588, 0],
        "964": [0, 0.43056, 0.1132, 0.02778],
        "965": [0, 0.43056, 0.03588, 0.02778],
        "966": [0.19444, 0.43056, 0, 0.08334],
        "967": [0.19444, 0.43056, 0, 0.05556],
        "968": [0.19444, 0.69444, 0.03588, 0.11111],
        "969": [0, 0.43056, 0.03588, 0],
        "977": [0, 0.69444, 0, 0.08334],
        "981": [0.19444, 0.69444, 0, 0.08334],
        "982": [0, 0.43056, 0.02778, 0],
        "1009": [0.19444, 0.43056, 0, 0.08334],
        "1013": [0, 0.43056, 0, 0.05556],
    },
    "Math-Regular": {
        "65": [0, 0.68333, 0, 0.13889],
        "66": [0, 0.68333, 0.05017, 0.08334],
        "67": [0, 0.68333, 0.07153, 0.08334],
        "68": [0, 0.68333, 0.02778, 0.05556],
        "69": [0, 0.68333, 0.05764, 0.08334],
        "70": [0, 0.68333, 0.13889, 0.08334],
        "71": [0, 0.68333, 0, 0.08334],
        "72": [0, 0.68333, 0.08125, 0.05556],
        "73": [0, 0.68333, 0.07847, 0.11111],
        "74": [0, 0.68333, 0.09618, 0.16667],
        "75": [0, 0.68333, 0.07153, 0.05556],
        "76": [0, 0.68333, 0, 0.02778],
        "77": [0, 0.68333, 0.10903, 0.08334],
        "78": [0, 0.68333, 0.10903, 0.08334],
        "79": [0, 0.68333, 0.02778, 0.08334],
        "80": [0, 0.68333, 0.13889, 0.08334],
        "81": [0.19444, 0.68333, 0, 0.08334],
        "82": [0, 0.68333, 0.00773, 0.08334],
        "83": [0, 0.68333, 0.05764, 0.08334],
        "84": [0, 0.68333, 0.13889, 0.08334],
        "85": [0, 0.68333, 0.10903, 0.02778],
        "86": [0, 0.68333, 0.22222, 0],
        "87": [0, 0.68333, 0.13889, 0],
        "88": [0, 0.68333, 0.07847, 0.08334],
        "89": [0, 0.68333, 0.22222, 0],
        "90": [0, 0.68333, 0.07153, 0.08334],
        "97": [0, 0.43056, 0, 0],
        "98": [0, 0.69444, 0, 0],
        "99": [0, 0.43056, 0, 0.05556],
        "100": [0, 0.69444, 0, 0.16667],
        "101": [0, 0.43056, 0, 0.05556],
        "102": [0.19444, 0.69444, 0.10764, 0.16667],
        "103": [0.19444, 0.43056, 0.03588, 0.02778],
        "104": [0, 0.69444, 0, 0],
        "105": [0, 0.65952, 0, 0],
        "106": [0.19444, 0.65952, 0.05724, 0],
        "107": [0, 0.69444, 0.03148, 0],
        "108": [0, 0.69444, 0.01968, 0.08334],
        "109": [0, 0.43056, 0, 0],
        "110": [0, 0.43056, 0, 0],
        "111": [0, 0.43056, 0, 0.05556],
        "112": [0.19444, 0.43056, 0, 0.08334],
        "113": [0.19444, 0.43056, 0.03588, 0.08334],
        "114": [0, 0.43056, 0.02778, 0.05556],
        "115": [0, 0.43056, 0, 0.05556],
        "116": [0, 0.61508, 0, 0.08334],
        "117": [0, 0.43056, 0, 0.02778],
        "118": [0, 0.43056, 0.03588, 0.02778],
        "119": [0, 0.43056, 0.02691, 0.08334],
        "120": [0, 0.43056, 0, 0.02778],
        "121": [0.19444, 0.43056, 0.03588, 0.05556],
        "122": [0, 0.43056, 0.04398, 0.05556],
        "915": [0, 0.68333, 0.13889, 0.08334],
        "916": [0, 0.68333, 0, 0.16667],
        "920": [0, 0.68333, 0.02778, 0.08334],
        "923": [0, 0.68333, 0, 0.16667],
        "926": [0, 0.68333, 0.07569, 0.08334],
        "928": [0, 0.68333, 0.08125, 0.05556],
        "931": [0, 0.68333, 0.05764, 0.08334],
        "933": [0, 0.68333, 0.13889, 0.05556],
        "934": [0, 0.68333, 0, 0.08334],
        "936": [0, 0.68333, 0.11, 0.05556],
        "937": [0, 0.68333, 0.05017, 0.08334],
        "945": [0, 0.43056, 0.0037, 0.02778],
        "946": [0.19444, 0.69444, 0.05278, 0.08334],
        "947": [0.19444, 0.43056, 0.05556, 0],
        "948": [0, 0.69444, 0.03785, 0.05556],
        "949": [0, 0.43056, 0, 0.08334],
        "950": [0.19444, 0.69444, 0.07378, 0.08334],
        "951": [0.19444, 0.43056, 0.03588, 0.05556],
        "952": [0, 0.69444, 0.02778, 0.08334],
        "953": [0, 0.43056, 0, 0.05556],
        "954": [0, 0.43056, 0, 0],
        "955": [0, 0.69444, 0, 0],
        "956": [0.19444, 0.43056, 0, 0.02778],
        "957": [0, 0.43056, 0.06366, 0.02778],
        "958": [0.19444, 0.69444, 0.04601, 0.11111],
        "959": [0, 0.43056, 0, 0.05556],
        "960": [0, 0.43056, 0.03588, 0],
        "961": [0.19444, 0.43056, 0, 0.08334],
        "962": [0.09722, 0.43056, 0.07986, 0.08334],
        "963": [0, 0.43056, 0.03588, 0],
        "964": [0, 0.43056, 0.1132, 0.02778],
        "965": [0, 0.43056, 0.03588, 0.02778],
        "966": [0.19444, 0.43056, 0, 0.08334],
        "967": [0.19444, 0.43056, 0, 0.05556],
        "968": [0.19444, 0.69444, 0.03588, 0.11111],
        "969": [0, 0.43056, 0.03588, 0],
        "977": [0, 0.69444, 0, 0.08334],
        "981": [0.19444, 0.69444, 0, 0.08334],
        "982": [0, 0.43056, 0.02778, 0],
        "1009": [0.19444, 0.43056, 0, 0.08334],
        "1013": [0, 0.43056, 0, 0.05556],
    },
    "SansSerif-Regular": {
        "33": [0, 0.69444, 0, 0],
        "34": [0, 0.69444, 0, 0],
        "35": [0.19444, 0.69444, 0, 0],
        "36": [0.05556, 0.75, 0, 0],
        "37": [0.05556, 0.75, 0, 0],
        "38": [0, 0.69444, 0, 0],
        "39": [0, 0.69444, 0, 0],
        "40": [0.25, 0.75, 0, 0],
        "41": [0.25, 0.75, 0, 0],
        "42": [0, 0.75, 0, 0],
        "43": [0.08333, 0.58333, 0, 0],
        "44": [0.125, 0.08333, 0, 0],
        "45": [0, 0.44444, 0, 0],
        "46": [0, 0.08333, 0, 0],
        "47": [0.25, 0.75, 0, 0],
        "48": [0, 0.65556, 0, 0],
        "49": [0, 0.65556, 0, 0],
        "50": [0, 0.65556, 0, 0],
        "51": [0, 0.65556, 0, 0],
        "52": [0, 0.65556, 0, 0],
        "53": [0, 0.65556, 0, 0],
        "54": [0, 0.65556, 0, 0],
        "55": [0, 0.65556, 0, 0],
        "56": [0, 0.65556, 0, 0],
        "57": [0, 0.65556, 0, 0],
        "58": [0, 0.44444, 0, 0],
        "59": [0.125, 0.44444, 0, 0],
        "61": [-0.13, 0.37, 0, 0],
        "63": [0, 0.69444, 0, 0],
        "64": [0, 0.69444, 0, 0],
        "65": [0, 0.69444, 0, 0],
        "66": [0, 0.69444, 0, 0],
        "67": [0, 0.69444, 0, 0],
        "68": [0, 0.69444, 0, 0],
        "69": [0, 0.69444, 0, 0],
        "70": [0, 0.69444, 0, 0],
        "71": [0, 0.69444, 0, 0],
        "72": [0, 0.69444, 0, 0],
        "73": [0, 0.69444, 0, 0],
        "74": [0, 0.69444, 0, 0],
        "75": [0, 0.69444, 0, 0],
        "76": [0, 0.69444, 0, 0],
        "77": [0, 0.69444, 0, 0],
        "78": [0, 0.69444, 0, 0],
        "79": [0, 0.69444, 0, 0],
        "80": [0, 0.69444, 0, 0],
        "81": [0.125, 0.69444, 0, 0],
        "82": [0, 0.69444, 0, 0],
        "83": [0, 0.69444, 0, 0],
        "84": [0, 0.69444, 0, 0],
        "85": [0, 0.69444, 0, 0],
        "86": [0, 0.69444, 0.01389, 0],
        "87": [0, 0.69444, 0.01389, 0],
        "88": [0, 0.69444, 0, 0],
        "89": [0, 0.69444, 0.025, 0],
        "90": [0, 0.69444, 0, 0],
        "91": [0.25, 0.75, 0, 0],
        "93": [0.25, 0.75, 0, 0],
        "94": [0, 0.69444, 0, 0],
        "95": [0.35, 0.09444, 0.02778, 0],
        "97": [0, 0.44444, 0, 0],
        "98": [0, 0.69444, 0, 0],
        "99": [0, 0.44444, 0, 0],
        "100": [0, 0.69444, 0, 0],
        "101": [0, 0.44444, 0, 0],
        "102": [0, 0.69444, 0.06944, 0],
        "103": [0.19444, 0.44444, 0.01389, 0],
        "104": [0, 0.69444, 0, 0],
        "105": [0, 0.67937, 0, 0],
        "106": [0.19444, 0.67937, 0, 0],
        "107": [0, 0.69444, 0, 0],
        "108": [0, 0.69444, 0, 0],
        "109": [0, 0.44444, 0, 0],
        "110": [0, 0.44444, 0, 0],
        "111": [0, 0.44444, 0, 0],
        "112": [0.19444, 0.44444, 0, 0],
        "113": [0.19444, 0.44444, 0, 0],
        "114": [0, 0.44444, 0.01389, 0],
        "115": [0, 0.44444, 0, 0],
        "116": [0, 0.57143, 0, 0],
        "117": [0, 0.44444, 0, 0],
        "118": [0, 0.44444, 0.01389, 0],
        "119": [0, 0.44444, 0.01389, 0],
        "120": [0, 0.44444, 0, 0],
        "121": [0.19444, 0.44444, 0.01389, 0],
        "122": [0, 0.44444, 0, 0],
        "126": [0.35, 0.32659, 0, 0],
        "305": [0, 0.44444, 0, 0],
        "567": [0.19444, 0.44444, 0, 0],
        "768": [0, 0.69444, 0, 0],
        "769": [0, 0.69444, 0, 0],
        "770": [0, 0.69444, 0, 0],
        "771": [0, 0.67659, 0, 0],
        "772": [0, 0.60889, 0, 0],
        "774": [0, 0.69444, 0, 0],
        "775": [0, 0.67937, 0, 0],
        "776": [0, 0.67937, 0, 0],
        "778": [0, 0.69444, 0, 0],
        "779": [0, 0.69444, 0, 0],
        "780": [0, 0.63194, 0, 0],
        "915": [0, 0.69444, 0, 0],
        "916": [0, 0.69444, 0, 0],
        "920": [0, 0.69444, 0, 0],
        "923": [0, 0.69444, 0, 0],
        "926": [0, 0.69444, 0, 0],
        "928": [0, 0.69444, 0, 0],
        "931": [0, 0.69444, 0, 0],
        "933": [0, 0.69444, 0, 0],
        "934": [0, 0.69444, 0, 0],
        "936": [0, 0.69444, 0, 0],
        "937": [0, 0.69444, 0, 0],
        "8211": [0, 0.44444, 0.02778, 0],
        "8212": [0, 0.44444, 0.02778, 0],
        "8216": [0, 0.69444, 0, 0],
        "8217": [0, 0.69444, 0, 0],
        "8220": [0, 0.69444, 0, 0],
        "8221": [0, 0.69444, 0, 0],
    },
    "Script-Regular": {
        "65": [0, 0.7, 0.22925, 0],
        "66": [0, 0.7, 0.04087, 0],
        "67": [0, 0.7, 0.1689, 0],
        "68": [0, 0.7, 0.09371, 0],
        "69": [0, 0.7, 0.18583, 0],
        "70": [0, 0.7, 0.13634, 0],
        "71": [0, 0.7, 0.17322, 0],
        "72": [0, 0.7, 0.29694, 0],
        "73": [0, 0.7, 0.19189, 0],
        "74": [0.27778, 0.7, 0.19189, 0],
        "75": [0, 0.7, 0.31259, 0],
        "76": [0, 0.7, 0.19189, 0],
        "77": [0, 0.7, 0.15981, 0],
        "78": [0, 0.7, 0.3525, 0],
        "79": [0, 0.7, 0.08078, 0],
        "80": [0, 0.7, 0.08078, 0],
        "81": [0, 0.7, 0.03305, 0],
        "82": [0, 0.7, 0.06259, 0],
        "83": [0, 0.7, 0.19189, 0],
        "84": [0, 0.7, 0.29087, 0],
        "85": [0, 0.7, 0.25815, 0],
        "86": [0, 0.7, 0.27523, 0],
        "87": [0, 0.7, 0.27523, 0],
        "88": [0, 0.7, 0.26006, 0],
        "89": [0, 0.7, 0.2939, 0],
        "90": [0, 0.7, 0.24037, 0],
    },
    "Size1-Regular": {
        "40": [0.35001, 0.85, 0, 0],
        "41": [0.35001, 0.85, 0, 0],
        "47": [0.35001, 0.85, 0, 0],
        "91": [0.35001, 0.85, 0, 0],
        "92": [0.35001, 0.85, 0, 0],
        "93": [0.35001, 0.85, 0, 0],
        "123": [0.35001, 0.85, 0, 0],
        "125": [0.35001, 0.85, 0, 0],
        "710": [0, 0.72222, 0, 0],
        "732": [0, 0.72222, 0, 0],
        "770": [0, 0.72222, 0, 0],
        "771": [0, 0.72222, 0, 0],
        "8214": [-0.00099, 0.601, 0, 0],
        "8593": [1e-05, 0.6, 0, 0],
        "8595": [1e-05, 0.6, 0, 0],
        "8657": [1e-05, 0.6, 0, 0],
        "8659": [1e-05, 0.6, 0, 0],
        "8719": [0.25001, 0.75, 0, 0],
        "8720": [0.25001, 0.75, 0, 0],
        "8721": [0.25001, 0.75, 0, 0],
        "8730": [0.35001, 0.85, 0, 0],
        "8739": [-0.00599, 0.606, 0, 0],
        "8741": [-0.00599, 0.606, 0, 0],
        "8747": [0.30612, 0.805, 0.19445, 0],
        "8748": [0.306, 0.805, 0.19445, 0],
        "8749": [0.306, 0.805, 0.19445, 0],
        "8750": [0.30612, 0.805, 0.19445, 0],
        "8896": [0.25001, 0.75, 0, 0],
        "8897": [0.25001, 0.75, 0, 0],
        "8898": [0.25001, 0.75, 0, 0],
        "8899": [0.25001, 0.75, 0, 0],
        "8968": [0.35001, 0.85, 0, 0],
        "8969": [0.35001, 0.85, 0, 0],
        "8970": [0.35001, 0.85, 0, 0],
        "8971": [0.35001, 0.85, 0, 0],
        "9168": [-0.00099, 0.601, 0, 0],
        "10216": [0.35001, 0.85, 0, 0],
        "10217": [0.35001, 0.85, 0, 0],
        "10752": [0.25001, 0.75, 0, 0],
        "10753": [0.25001, 0.75, 0, 0],
        "10754": [0.25001, 0.75, 0, 0],
        "10756": [0.25001, 0.75, 0, 0],
        "10758": [0.25001, 0.75, 0, 0],
    },
    "Size2-Regular": {
        "40": [0.65002, 1.15, 0, 0],
        "41": [0.65002, 1.15, 0, 0],
        "47": [0.65002, 1.15, 0, 0],
        "91": [0.65002, 1.15, 0, 0],
        "92": [0.65002, 1.15, 0, 0],
        "93": [0.65002, 1.15, 0, 0],
        "123": [0.65002, 1.15, 0, 0],
        "125": [0.65002, 1.15, 0, 0],
        "710": [0, 0.75, 0, 0],
        "732": [0, 0.75, 0, 0],
        "770": [0, 0.75, 0, 0],
        "771": [0, 0.75, 0, 0],
        "8719": [0.55001, 1.05, 0, 0],
        "8720": [0.55001, 1.05, 0, 0],
        "8721": [0.55001, 1.05, 0, 0],
        "8730": [0.65002, 1.15, 0, 0],
        "8747": [0.86225, 1.36, 0.44445, 0],
        "8748": [0.862, 1.36, 0.44445, 0],
        "8749": [0.862, 1.36, 0.44445, 0],
        "8750": [0.86225, 1.36, 0.44445, 0],
        "8896": [0.55001, 1.05, 0, 0],
        "8897": [0.55001, 1.05, 0, 0],
        "8898": [0.55001, 1.05, 0, 0],
        "8899": [0.55001, 1.05, 0, 0],
        "8968": [0.65002, 1.15, 0, 0],
        "8969": [0.65002, 1.15, 0, 0],
        "8970": [0.65002, 1.15, 0, 0],
        "8971": [0.65002, 1.15, 0, 0],
        "10216": [0.65002, 1.15, 0, 0],
        "10217": [0.65002, 1.15, 0, 0],
        "10752": [0.55001, 1.05, 0, 0],
        "10753": [0.55001, 1.05, 0, 0],
        "10754": [0.55001, 1.05, 0, 0],
        "10756": [0.55001, 1.05, 0, 0],
        "10758": [0.55001, 1.05, 0, 0],
    },
    "Size3-Regular": {
        "40": [0.95003, 1.45, 0, 0],
        "41": [0.95003, 1.45, 0, 0],
        "47": [0.95003, 1.45, 0, 0],
        "91": [0.95003, 1.45, 0, 0],
        "92": [0.95003, 1.45, 0, 0],
        "93": [0.95003, 1.45, 0, 0],
        "123": [0.95003, 1.45, 0, 0],
        "125": [0.95003, 1.45, 0, 0],
        "710": [0, 0.75, 0, 0],
        "732": [0, 0.75, 0, 0],
        "770": [0, 0.75, 0, 0],
        "771": [0, 0.75, 0, 0],
        "8730": [0.95003, 1.45, 0, 0],
        "8968": [0.95003, 1.45, 0, 0],
        "8969": [0.95003, 1.45, 0, 0],
        "8970": [0.95003, 1.45, 0, 0],
        "8971": [0.95003, 1.45, 0, 0],
        "10216": [0.95003, 1.45, 0, 0],
        "10217": [0.95003, 1.45, 0, 0],
    },
    "Size4-Regular": {
        "40": [1.25003, 1.75, 0, 0],
        "41": [1.25003, 1.75, 0, 0],
        "47": [1.25003, 1.75, 0, 0],
        "91": [1.25003, 1.75, 0, 0],
        "92": [1.25003, 1.75, 0, 0],
        "93": [1.25003, 1.75, 0, 0],
        "123": [1.25003, 1.75, 0, 0],
        "125": [1.25003, 1.75, 0, 0],
        "710": [0, 0.825, 0, 0],
        "732": [0, 0.825, 0, 0],
        "770": [0, 0.825, 0, 0],
        "771": [0, 0.825, 0, 0],
        "8730": [1.25003, 1.75, 0, 0],
        "8968": [1.25003, 1.75, 0, 0],
        "8969": [1.25003, 1.75, 0, 0],
        "8970": [1.25003, 1.75, 0, 0],
        "8971": [1.25003, 1.75, 0, 0],
        "9115": [0.64502, 1.155, 0, 0],
        "9116": [1e-05, 0.6, 0, 0],
        "9117": [0.64502, 1.155, 0, 0],
        "9118": [0.64502, 1.155, 0, 0],
        "9119": [1e-05, 0.6, 0, 0],
        "9120": [0.64502, 1.155, 0, 0],
        "9121": [0.64502, 1.155, 0, 0],
        "9122": [-0.00099, 0.601, 0, 0],
        "9123": [0.64502, 1.155, 0, 0],
        "9124": [0.64502, 1.155, 0, 0],
        "9125": [-0.00099, 0.601, 0, 0],
        "9126": [0.64502, 1.155, 0, 0],
        "9127": [1e-05, 0.9, 0, 0],
        "9128": [0.65002, 1.15, 0, 0],
        "9129": [0.90001, 0, 0, 0],
        "9130": [0, 0.3, 0, 0],
        "9131": [1e-05, 0.9, 0, 0],
        "9132": [0.65002, 1.15, 0, 0],
        "9133": [0.90001, 0, 0, 0],
        "9143": [0.88502, 0.915, 0, 0],
        "10216": [1.25003, 1.75, 0, 0],
        "10217": [1.25003, 1.75, 0, 0],
        "57344": [-0.00499, 0.605, 0, 0],
        "57345": [-0.00499, 0.605, 0, 0],
        "57680": [0, 0.12, 0, 0],
        "57681": [0, 0.12, 0, 0],
        "57682": [0, 0.12, 0, 0],
        "57683": [0, 0.12, 0, 0],
    },
    "Typewriter-Regular": {
        "33": [0, 0.61111, 0, 0],
        "34": [0, 0.61111, 0, 0],
        "35": [0, 0.61111, 0, 0],
        "36": [0.08333, 0.69444, 0, 0],
        "37": [0.08333, 0.69444, 0, 0],
        "38": [0, 0.61111, 0, 0],
        "39": [0, 0.61111, 0, 0],
        "40": [0.08333, 0.69444, 0, 0],
        "41": [0.08333, 0.69444, 0, 0],
        "42": [0, 0.52083, 0, 0],
        "43": [-0.08056, 0.53055, 0, 0],
        "44": [0.13889, 0.125, 0, 0],
        "45": [-0.08056, 0.53055, 0, 0],
        "46": [0, 0.125, 0, 0],
        "47": [0.08333, 0.69444, 0, 0],
        "48": [0, 0.61111, 0, 0],
        "49": [0, 0.61111, 0, 0],
        "50": [0, 0.61111, 0, 0],
        "51": [0, 0.61111, 0, 0],
        "52": [0, 0.61111, 0, 0],
        "53": [0, 0.61111, 0, 0],
        "54": [0, 0.61111, 0, 0],
        "55": [0, 0.61111, 0, 0],
        "56": [0, 0.61111, 0, 0],
        "57": [0, 0.61111, 0, 0],
        "58": [0, 0.43056, 0, 0],
        "59": [0.13889, 0.43056, 0, 0],
        "60": [-0.05556, 0.55556, 0, 0],
        "61": [-0.19549, 0.41562, 0, 0],
        "62": [-0.05556, 0.55556, 0, 0],
        "63": [0, 0.61111, 0, 0],
        "64": [0, 0.61111, 0, 0],
        "65": [0, 0.61111, 0, 0],
        "66": [0, 0.61111, 0, 0],
        "67": [0, 0.61111, 0, 0],
        "68": [0, 0.61111, 0, 0],
        "69": [0, 0.61111, 0, 0],
        "70": [0, 0.61111, 0, 0],
        "71": [0, 0.61111, 0, 0],
        "72": [0, 0.61111, 0, 0],
        "73": [0, 0.61111, 0, 0],
        "74": [0, 0.61111, 0, 0],
        "75": [0, 0.61111, 0, 0],
        "76": [0, 0.61111, 0, 0],
        "77": [0, 0.61111, 0, 0],
        "78": [0, 0.61111, 0, 0],
        "79": [0, 0.61111, 0, 0],
        "80": [0, 0.61111, 0, 0],
        "81": [0.13889, 0.61111, 0, 0],
        "82": [0, 0.61111, 0, 0],
        "83": [0, 0.61111, 0, 0],
        "84": [0, 0.61111, 0, 0],
        "85": [0, 0.61111, 0, 0],
        "86": [0, 0.61111, 0, 0],
        "87": [0, 0.61111, 0, 0],
        "88": [0, 0.61111, 0, 0],
        "89": [0, 0.61111, 0, 0],
        "90": [0, 0.61111, 0, 0],
        "91": [0.08333, 0.69444, 0, 0],
        "92": [0.08333, 0.69444, 0, 0],
        "93": [0.08333, 0.69444, 0, 0],
        "94": [0, 0.61111, 0, 0],
        "95": [0.09514, 0, 0, 0],
        "96": [0, 0.61111, 0, 0],
        "97": [0, 0.43056, 0, 0],
        "98": [0, 0.61111, 0, 0],
        "99": [0, 0.43056, 0, 0],
        "100": [0, 0.61111, 0, 0],
        "101": [0, 0.43056, 0, 0],
        "102": [0, 0.61111, 0, 0],
        "103": [0.22222, 0.43056, 0, 0],
        "104": [0, 0.61111, 0, 0],
        "105": [0, 0.61111, 0, 0],
        "106": [0.22222, 0.61111, 0, 0],
        "107": [0, 0.61111, 0, 0],
        "108": [0, 0.61111, 0, 0],
        "109": [0, 0.43056, 0, 0],
        "110": [0, 0.43056, 0, 0],
        "111": [0, 0.43056, 0, 0],
        "112": [0.22222, 0.43056, 0, 0],
        "113": [0.22222, 0.43056, 0, 0],
        "114": [0, 0.43056, 0, 0],
        "115": [0, 0.43056, 0, 0],
        "116": [0, 0.55358, 0, 0],
        "117": [0, 0.43056, 0, 0],
        "118": [0, 0.43056, 0, 0],
        "119": [0, 0.43056, 0, 0],
        "120": [0, 0.43056, 0, 0],
        "121": [0.22222, 0.43056, 0, 0],
        "122": [0, 0.43056, 0, 0],
        "123": [0.08333, 0.69444, 0, 0],
        "124": [0.08333, 0.69444, 0, 0],
        "125": [0.08333, 0.69444, 0, 0],
        "126": [0, 0.61111, 0, 0],
        "127": [0, 0.61111, 0, 0],
        "305": [0, 0.43056, 0, 0],
        "567": [0.22222, 0.43056, 0, 0],
        "768": [0, 0.61111, 0, 0],
        "769": [0, 0.61111, 0, 0],
        "770": [0, 0.61111, 0, 0],
        "771": [0, 0.61111, 0, 0],
        "772": [0, 0.56555, 0, 0],
        "774": [0, 0.61111, 0, 0],
        "776": [0, 0.61111, 0, 0],
        "778": [0, 0.61111, 0, 0],
        "780": [0, 0.56597, 0, 0],
        "915": [0, 0.61111, 0, 0],
        "916": [0, 0.61111, 0, 0],
        "920": [0, 0.61111, 0, 0],
        "923": [0, 0.61111, 0, 0],
        "926": [0, 0.61111, 0, 0],
        "928": [0, 0.61111, 0, 0],
        "931": [0, 0.61111, 0, 0],
        "933": [0, 0.61111, 0, 0],
        "934": [0, 0.61111, 0, 0],
        "936": [0, 0.61111, 0, 0],
        "937": [0, 0.61111, 0, 0],
        "2018": [0, 0.61111, 0, 0],
        "2019": [0, 0.61111, 0, 0],
        "8242": [0, 0.61111, 0, 0],
    },
};


/***/ }),

/***/ "eIiX":
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__("s847");
var ParseError = __webpack_require__("E0m9");

/* This file contains a list of functions that we parse, identified by
 * the calls to defineFunction.
 *
 * The first argument to defineFunction is a single name or a list of names.
 * All functions named in such a list will share a single implementation.
 *
 * Each declared function can have associated properties, which
 * include the following:
 *
 *  - numArgs: The number of arguments the function takes.
 *             If this is the only property, it can be passed as a number
 *             instead of an element of a properties object.
 *  - argTypes: (optional) An array corresponding to each argument of the
 *              function, giving the type of argument that should be parsed. Its
 *              length should be equal to `numArgs + numOptionalArgs`. Valid
 *              types:
 *               - "size": A size-like thing, such as "1em" or "5ex"
 *               - "color": An html color, like "#abc" or "blue"
 *               - "original": The same type as the environment that the
 *                             function being parsed is in (e.g. used for the
 *                             bodies of functions like \color where the first
 *                             argument is special and the second argument is
 *                             parsed normally)
 *              Other possible types (probably shouldn't be used)
 *               - "text": Text-like (e.g. \text)
 *               - "math": Normal math
 *              If undefined, this will be treated as an appropriate length
 *              array of "original" strings
 *  - greediness: (optional) The greediness of the function to use ungrouped
 *                arguments.
 *
 *                E.g. if you have an expression
 *                  \sqrt \frac 1 2
 *                since \frac has greediness=2 vs \sqrt's greediness=1, \frac
 *                will use the two arguments '1' and '2' as its two arguments,
 *                then that whole function will be used as the argument to
 *                \sqrt. On the other hand, the expressions
 *                  \frac \frac 1 2 3
 *                and
 *                  \frac \sqrt 1 2
 *                will fail because \frac and \frac have equal greediness
 *                and \sqrt has a lower greediness than \frac respectively. To
 *                make these parse, we would have to change them to:
 *                  \frac {\frac 1 2} 3
 *                and
 *                  \frac {\sqrt 1} 2
 *
 *                The default value is `1`
 *  - allowedInText: (optional) Whether or not the function is allowed inside
 *                   text mode (default false)
 *  - numOptionalArgs: (optional) The number of optional arguments the function
 *                     should parse. If the optional arguments aren't found,
 *                     `null` will be passed to the handler in their place.
 *                     (default 0)
 *
 * The last argument is that implementation, the handler for the function(s).
 * It is called to handle these functions and their arguments.
 * It receives two arguments:
 *  - context contains information and references provided by the parser
 *  - args is an array of arguments obtained from TeX input
 * The context contains the following properties:
 *  - funcName: the text (i.e. name) of the function, including \
 *  - parser: the parser object
 *  - lexer: the lexer object
 *  - positions: the positions in the overall string of the function
 *               and the arguments.
 * The latter three should only be used to produce error messages.
 *
 * The function should return an object with the following keys:
 *  - type: The type of element that this is. This is then used in
 *          buildHTML/buildMathML to determine which function
 *          should be called to build this node into a DOM node
 * Any other data can be added to the object, which will be passed
 * in to the function in buildHTML/buildMathML as `group.value`.
 */

function defineFunction(names, props, handler) {
    if (typeof names === "string") {
        names = [names];
    }
    if (typeof props === "number") {
        props = { numArgs: props };
    }
    // Set default values of functions
    var data = {
        numArgs: props.numArgs,
        argTypes: props.argTypes,
        greediness: (props.greediness === undefined) ? 1 : props.greediness,
        allowedInText: !!props.allowedInText,
        numOptionalArgs: props.numOptionalArgs || 0,
        handler: handler,
    };
    for (var i = 0; i < names.length; ++i) {
        module.exports[names[i]] = data;
    }
}

// A normal square root
defineFunction("\\sqrt", {
    numArgs: 1,
    numOptionalArgs: 1,
}, function(context, args) {
    var index = args[0];
    var body = args[1];
    return {
        type: "sqrt",
        body: body,
        index: index,
    };
});

// Some non-mathy text
defineFunction("\\text", {
    numArgs: 1,
    argTypes: ["text"],
    greediness: 2,
}, function(context, args) {
    var body = args[0];
    // Since the corresponding buildHTML/buildMathML function expects a
    // list of elements, we normalize for different kinds of arguments
    // TODO(emily): maybe this should be done somewhere else
    var inner;
    if (body.type === "ordgroup") {
        inner = body.value;
    } else {
        inner = [body];
    }

    return {
        type: "text",
        body: inner,
    };
});

// A two-argument custom color
defineFunction("\\color", {
    numArgs: 2,
    allowedInText: true,
    greediness: 3,
    argTypes: ["color", "original"],
}, function(context, args) {
    var color = args[0];
    var body = args[1];
    // Normalize the different kinds of bodies (see \text above)
    var inner;
    if (body.type === "ordgroup") {
        inner = body.value;
    } else {
        inner = [body];
    }

    return {
        type: "color",
        color: color.value,
        value: inner,
    };
});

// An overline
defineFunction("\\overline", {
    numArgs: 1,
}, function(context, args) {
    var body = args[0];
    return {
        type: "overline",
        body: body,
    };
});

// An underline
defineFunction("\\underline", {
    numArgs: 1,
}, function(context, args) {
    var body = args[0];
    return {
        type: "underline",
        body: body,
    };
});

// A box of the width and height
defineFunction("\\rule", {
    numArgs: 2,
    numOptionalArgs: 1,
    argTypes: ["size", "size", "size"],
}, function(context, args) {
    var shift = args[0];
    var width = args[1];
    var height = args[2];
    return {
        type: "rule",
        shift: shift && shift.value,
        width: width.value,
        height: height.value,
    };
});

// A KaTeX logo
defineFunction("\\KaTeX", {
    numArgs: 0,
}, function(context) {
    return {
        type: "katex",
    };
});

defineFunction("\\phantom", {
    numArgs: 1,
}, function(context, args) {
    var body = args[0];
    var inner;
    if (body.type === "ordgroup") {
        inner = body.value;
    } else {
        inner = [body];
    }

    return {
        type: "phantom",
        value: inner,
    };
});

// Extra data needed for the delimiter handler down below
var delimiterSizes = {
    "\\bigl" : {type: "open",    size: 1},
    "\\Bigl" : {type: "open",    size: 2},
    "\\biggl": {type: "open",    size: 3},
    "\\Biggl": {type: "open",    size: 4},
    "\\bigr" : {type: "close",   size: 1},
    "\\Bigr" : {type: "close",   size: 2},
    "\\biggr": {type: "close",   size: 3},
    "\\Biggr": {type: "close",   size: 4},
    "\\bigm" : {type: "rel",     size: 1},
    "\\Bigm" : {type: "rel",     size: 2},
    "\\biggm": {type: "rel",     size: 3},
    "\\Biggm": {type: "rel",     size: 4},
    "\\big"  : {type: "textord", size: 1},
    "\\Big"  : {type: "textord", size: 2},
    "\\bigg" : {type: "textord", size: 3},
    "\\Bigg" : {type: "textord", size: 4},
};

var delimiters = [
    "(", ")", "[", "\\lbrack", "]", "\\rbrack",
    "\\{", "\\lbrace", "\\}", "\\rbrace",
    "\\lfloor", "\\rfloor", "\\lceil", "\\rceil",
    "<", ">", "\\langle", "\\rangle", "\\lt", "\\gt",
    "\\lvert", "\\rvert", "\\lVert", "\\rVert",
    "\\lgroup", "\\rgroup", "\\lmoustache", "\\rmoustache",
    "/", "\\backslash",
    "|", "\\vert", "\\|", "\\Vert",
    "\\uparrow", "\\Uparrow",
    "\\downarrow", "\\Downarrow",
    "\\updownarrow", "\\Updownarrow",
    ".",
];

var fontAliases = {
    "\\Bbb": "\\mathbb",
    "\\bold": "\\mathbf",
    "\\frak": "\\mathfrak",
};

// Single-argument color functions
defineFunction([
    "\\blue", "\\orange", "\\pink", "\\red",
    "\\green", "\\gray", "\\purple",
    "\\blueA", "\\blueB", "\\blueC", "\\blueD", "\\blueE",
    "\\tealA", "\\tealB", "\\tealC", "\\tealD", "\\tealE",
    "\\greenA", "\\greenB", "\\greenC", "\\greenD", "\\greenE",
    "\\goldA", "\\goldB", "\\goldC", "\\goldD", "\\goldE",
    "\\redA", "\\redB", "\\redC", "\\redD", "\\redE",
    "\\maroonA", "\\maroonB", "\\maroonC", "\\maroonD", "\\maroonE",
    "\\purpleA", "\\purpleB", "\\purpleC", "\\purpleD", "\\purpleE",
    "\\mintA", "\\mintB", "\\mintC",
    "\\grayA", "\\grayB", "\\grayC", "\\grayD", "\\grayE",
    "\\grayF", "\\grayG", "\\grayH", "\\grayI",
    "\\kaBlue", "\\kaGreen",
], {
    numArgs: 1,
    allowedInText: true,
    greediness: 3,
}, function(context, args) {
    var body = args[0];
    var atoms;
    if (body.type === "ordgroup") {
        atoms = body.value;
    } else {
        atoms = [body];
    }

    return {
        type: "color",
        color: "katex-" + context.funcName.slice(1),
        value: atoms,
    };
});

// There are 2 flags for operators; whether they produce limits in
// displaystyle, and whether they are symbols and should grow in
// displaystyle. These four groups cover the four possible choices.

// No limits, not symbols
defineFunction([
    "\\arcsin", "\\arccos", "\\arctan", "\\arg", "\\cos", "\\cosh",
    "\\cot", "\\coth", "\\csc", "\\deg", "\\dim", "\\exp", "\\hom",
    "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh",
    "\\tan", "\\tanh",
], {
    numArgs: 0,
}, function(context) {
    return {
        type: "op",
        limits: false,
        symbol: false,
        body: context.funcName,
    };
});

// Limits, not symbols
defineFunction([
    "\\det", "\\gcd", "\\inf", "\\lim", "\\liminf", "\\limsup", "\\max",
    "\\min", "\\Pr", "\\sup",
], {
    numArgs: 0,
}, function(context) {
    return {
        type: "op",
        limits: true,
        symbol: false,
        body: context.funcName,
    };
});

// No limits, symbols
defineFunction([
    "\\int", "\\iint", "\\iiint", "\\oint",
], {
    numArgs: 0,
}, function(context) {
    return {
        type: "op",
        limits: false,
        symbol: true,
        body: context.funcName,
    };
});

// Limits, symbols
defineFunction([
    "\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap",
    "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes",
    "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint",
], {
    numArgs: 0,
}, function(context) {
    return {
        type: "op",
        limits: true,
        symbol: true,
        body: context.funcName,
    };
});

// Fractions
defineFunction([
    "\\dfrac", "\\frac", "\\tfrac",
    "\\dbinom", "\\binom", "\\tbinom",
], {
    numArgs: 2,
    greediness: 2,
}, function(context, args) {
    var numer = args[0];
    var denom = args[1];
    var hasBarLine;
    var leftDelim = null;
    var rightDelim = null;
    var size = "auto";

    switch (context.funcName) {
        case "\\dfrac":
        case "\\frac":
        case "\\tfrac":
            hasBarLine = true;
            break;
        case "\\dbinom":
        case "\\binom":
        case "\\tbinom":
            hasBarLine = false;
            leftDelim = "(";
            rightDelim = ")";
            break;
        default:
            throw new Error("Unrecognized genfrac command");
    }

    switch (context.funcName) {
        case "\\dfrac":
        case "\\dbinom":
            size = "display";
            break;
        case "\\tfrac":
        case "\\tbinom":
            size = "text";
            break;
    }

    return {
        type: "genfrac",
        numer: numer,
        denom: denom,
        hasBarLine: hasBarLine,
        leftDelim: leftDelim,
        rightDelim: rightDelim,
        size: size,
    };
});

// Left and right overlap functions
defineFunction(["\\llap", "\\rlap"], {
    numArgs: 1,
    allowedInText: true,
}, function(context, args) {
    var body = args[0];
    return {
        type: context.funcName.slice(1),
        body: body,
    };
});

// Delimiter functions
defineFunction([
    "\\bigl", "\\Bigl", "\\biggl", "\\Biggl",
    "\\bigr", "\\Bigr", "\\biggr", "\\Biggr",
    "\\bigm", "\\Bigm", "\\biggm", "\\Biggm",
    "\\big",  "\\Big",  "\\bigg",  "\\Bigg",
    "\\left", "\\right",
], {
    numArgs: 1,
}, function(context, args) {
    var delim = args[0];
    if (!utils.contains(delimiters, delim.value)) {
        throw new ParseError(
            "Invalid delimiter: '" + delim.value + "' after '" +
                context.funcName + "'",
            context.lexer, context.positions[1]);
    }

    // \left and \right are caught somewhere in Parser.js, which is
    // why this data doesn't match what is in buildHTML.
    if (context.funcName === "\\left" || context.funcName === "\\right") {
        return {
            type: "leftright",
            value: delim.value,
        };
    } else {
        return {
            type: "delimsizing",
            size: delimiterSizes[context.funcName].size,
            delimType: delimiterSizes[context.funcName].type,
            value: delim.value,
        };
    }
});

// Sizing functions (handled in Parser.js explicitly, hence no handler)
defineFunction([
    "\\tiny", "\\scriptsize", "\\footnotesize", "\\small",
    "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge",
], 0, null);

// Style changing functions (handled in Parser.js explicitly, hence no
// handler)
defineFunction([
    "\\displaystyle", "\\textstyle", "\\scriptstyle",
    "\\scriptscriptstyle",
], 0, null);

defineFunction([
    // styles
    "\\mathrm", "\\mathit", "\\mathbf",

    // families
    "\\mathbb", "\\mathcal", "\\mathfrak", "\\mathscr", "\\mathsf",
    "\\mathtt",

    // aliases
    "\\Bbb", "\\bold", "\\frak",
], {
    numArgs: 1,
    greediness: 2,
}, function(context, args) {
    var body = args[0];
    var func = context.funcName;
    if (func in fontAliases) {
        func = fontAliases[func];
    }
    return {
        type: "font",
        font: func.slice(1),
        body: body,
    };
});

// Accents
defineFunction([
    "\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve",
    "\\check", "\\hat", "\\vec", "\\dot",
    // We don't support expanding accents yet
    // "\\widetilde", "\\widehat"
], {
    numArgs: 1,
}, function(context, args) {
    var base = args[0];
    return {
        type: "accent",
        accent: context.funcName,
        base: base,
    };
});

// Infix generalized fractions
defineFunction(["\\over", "\\choose"], {
    numArgs: 0,
}, function(context) {
    var replaceWith;
    switch (context.funcName) {
        case "\\over":
            replaceWith = "\\frac";
            break;
        case "\\choose":
            replaceWith = "\\binom";
            break;
        default:
            throw new Error("Unrecognized infix genfrac command");
    }
    return {
        type: "infix",
        replaceWith: replaceWith,
    };
});

// Row breaks for aligned data
defineFunction(["\\\\", "\\cr"], {
    numArgs: 0,
    numOptionalArgs: 1,
    argTypes: ["size"],
}, function(context, args) {
    var size = args[0];
    return {
        type: "cr",
        size: size,
    };
});

// Environment delimiters
defineFunction(["\\begin", "\\end"], {
    numArgs: 1,
    argTypes: ["text"],
}, function(context, args) {
    var nameGroup = args[0];
    if (nameGroup.type !== "ordgroup") {
        throw new ParseError(
            "Invalid environment name",
            context.lexer, context.positions[1]);
    }
    var name = "";
    for (var i = 0; i < nameGroup.value.length; ++i) {
        name += nameGroup.value[i].value;
    }
    return {
        type: "environment",
        name: name,
        namepos: context.positions[1],
    };
});


/***/ }),

/***/ "gveB":
/***/ (function(module, exports, __webpack_require__) {

/* eslint no-constant-condition:0 */
var fontMetrics = __webpack_require__("zJjT");
var parseData = __webpack_require__("yqz1");
var ParseError = __webpack_require__("E0m9");

var ParseNode = parseData.ParseNode;

/**
 * Parse the body of the environment, with rows delimited by \\ and
 * columns delimited by &, and create a nested list in row-major order
 * with one group per cell.
 */
function parseArray(parser, result) {
    var row = [];
    var body = [row];
    var rowGaps = [];
    while (true) {
        var cell = parser.parseExpression(false, null);
        row.push(new ParseNode("ordgroup", cell, parser.mode));
        var next = parser.nextToken.text;
        if (next === "&") {
            parser.consume();
        } else if (next === "\\end") {
            break;
        } else if (next === "\\\\" || next === "\\cr") {
            var cr = parser.parseFunction();
            rowGaps.push(cr.value.size);
            row = [];
            body.push(row);
        } else {
            // TODO: Clean up the following hack once #385 got merged
            var pos = Math.min(parser.pos + 1, parser.lexer._input.length);
            throw new ParseError("Expected & or \\\\ or \\end",
                                 parser.lexer, pos);
        }
    }
    result.body = body;
    result.rowGaps = rowGaps;
    return new ParseNode(result.type, result, parser.mode);
}

/*
 * An environment definition is very similar to a function definition:
 * it is declared with a name or a list of names, a set of properties
 * and a handler containing the actual implementation.
 *
 * The properties include:
 *  - numArgs: The number of arguments after the \begin{name} function.
 *  - argTypes: (optional) Just like for a function
 *  - allowedInText: (optional) Whether or not the environment is allowed inside
 *                   text mode (default false) (not enforced yet)
 *  - numOptionalArgs: (optional) Just like for a function
 * A bare number instead of that object indicates the numArgs value.
 *
 * The handler function will receive two arguments
 *  - context: information and references provided by the parser
 *  - args: an array of arguments passed to \begin{name}
 * The context contains the following properties:
 *  - envName: the name of the environment, one of the listed names.
 *  - parser: the parser object
 *  - lexer: the lexer object
 *  - positions: the positions associated with these arguments from args.
 * The handler must return a ParseResult.
 */

function defineEnvironment(names, props, handler) {
    if (typeof names === "string") {
        names = [names];
    }
    if (typeof props === "number") {
        props = { numArgs: props };
    }
    // Set default values of environments
    var data = {
        numArgs: props.numArgs || 0,
        argTypes: props.argTypes,
        greediness: 1,
        allowedInText: !!props.allowedInText,
        numOptionalArgs: props.numOptionalArgs || 0,
        handler: handler,
    };
    for (var i = 0; i < names.length; ++i) {
        module.exports[names[i]] = data;
    }
}

// Arrays are part of LaTeX, defined in lttab.dtx so its documentation
// is part of the source2e.pdf file of LaTeX2e source documentation.
defineEnvironment("array", {
    numArgs: 1,
}, function(context, args) {
    var colalign = args[0];
    colalign = colalign.value.map ? colalign.value : [colalign];
    var cols = colalign.map(function(node) {
        var ca = node.value;
        if ("lcr".indexOf(ca) !== -1) {
            return {
                type: "align",
                align: ca,
            };
        } else if (ca === "|") {
            return {
                type: "separator",
                separator: "|",
            };
        }
        throw new ParseError(
            "Unknown column alignment: " + node.value,
            context.lexer, context.positions[1]);
    });
    var res = {
        type: "array",
        cols: cols,
        hskipBeforeAndAfter: true, // \@preamble in lttab.dtx
    };
    res = parseArray(context.parser, res);
    return res;
});

// The matrix environments of amsmath builds on the array environment
// of LaTeX, which is discussed above.
defineEnvironment([
    "matrix",
    "pmatrix",
    "bmatrix",
    "Bmatrix",
    "vmatrix",
    "Vmatrix",
], {
}, function(context) {
    var delimiters = {
        "matrix": null,
        "pmatrix": ["(", ")"],
        "bmatrix": ["[", "]"],
        "Bmatrix": ["\\{", "\\}"],
        "vmatrix": ["|", "|"],
        "Vmatrix": ["\\Vert", "\\Vert"],
    }[context.envName];
    var res = {
        type: "array",
        hskipBeforeAndAfter: false, // \hskip -\arraycolsep in amsmath
    };
    res = parseArray(context.parser, res);
    if (delimiters) {
        res = new ParseNode("leftright", {
            body: [res],
            left: delimiters[0],
            right: delimiters[1],
        }, context.mode);
    }
    return res;
});

// A cases environment (in amsmath.sty) is almost equivalent to
// \def\arraystretch{1.2}%
// \left\{\begin{array}{@{}l@{\quad}l@{}} … \end{array}\right.
defineEnvironment("cases", {
}, function(context) {
    var res = {
        type: "array",
        arraystretch: 1.2,
        cols: [{
            type: "align",
            align: "l",
            pregap: 0,
            postgap: fontMetrics.metrics.quad,
        }, {
            type: "align",
            align: "l",
            pregap: 0,
            postgap: 0,
        }],
    };
    res = parseArray(context.parser, res);
    res = new ParseNode("leftright", {
        body: [res],
        left: "\\{",
        right: ".",
    }, context.mode);
    return res;
});

// An aligned environment is like the align* environment
// except it operates within math mode.
// Note that we assume \nomallineskiplimit to be zero,
// so that \strut@ is the same as \strut.
defineEnvironment("aligned", {
}, function(context) {
    var res = {
        type: "array",
        cols: [],
    };
    res = parseArray(context.parser, res);
    var emptyGroup = new ParseNode("ordgroup", [], context.mode);
    var numCols = 0;
    res.value.body.forEach(function(row) {
        var i;
        for (i = 1; i < row.length; i += 2) {
            row[i].value.unshift(emptyGroup);
        }
        if (numCols < row.length) {
            numCols = row.length;
        }
    });
    for (var i = 0; i < numCols; ++i) {
        var align = "r";
        var pregap = 0;
        if (i % 2 === 1) {
            align = "l";
        } else if (i > 0) {
            pregap = 2; // one \qquad between columns
        }
        res.value.cols[i] = {
            type: "align",
            align: align,
            pregap: pregap,
            postgap: 0,
        };
    }
    return res;
});


/***/ }),

/***/ "s847":
/***/ (function(module, exports) {

/**
 * This file contains a list of utility functions which are useful in other
 * files.
 */

/**
 * Provide an `indexOf` function which works in IE8, but defers to native if
 * possible.
 */
var nativeIndexOf = Array.prototype.indexOf;
var indexOf = function(list, elem) {
    if (list == null) {
        return -1;
    }
    if (nativeIndexOf && list.indexOf === nativeIndexOf) {
        return list.indexOf(elem);
    }
    var i = 0;
    var l = list.length;
    for (; i < l; i++) {
        if (list[i] === elem) {
            return i;
        }
    }
    return -1;
};

/**
 * Return whether an element is contained in a list
 */
var contains = function(list, elem) {
    return indexOf(list, elem) !== -1;
};

/**
 * Provide a default value if a setting is undefined
 */
var deflt = function(setting, defaultIfUndefined) {
    return setting === undefined ? defaultIfUndefined : setting;
};

// hyphenate and escape adapted from Facebook's React under Apache 2 license

var uppercase = /([A-Z])/g;
var hyphenate = function(str) {
    return str.replace(uppercase, "-$1").toLowerCase();
};

var ESCAPE_LOOKUP = {
    "&": "&amp;",
    ">": "&gt;",
    "<": "&lt;",
    "\"": "&quot;",
    "'": "&#x27;",
};

var ESCAPE_REGEX = /[&><"']/g;

function escaper(match) {
    return ESCAPE_LOOKUP[match];
}

/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */
function escape(text) {
    return ("" + text).replace(ESCAPE_REGEX, escaper);
}

/**
 * A function to set the text content of a DOM element in all supported
 * browsers. Note that we don't define this if there is no document.
 */
var setTextContent;
if (typeof document !== "undefined") {
    var testNode = document.createElement("span");
    if ("textContent" in testNode) {
        setTextContent = function(node, text) {
            node.textContent = text;
        };
    } else {
        setTextContent = function(node, text) {
            node.innerText = text;
        };
    }
}

/**
 * A function to clear a node.
 */
function clearNode(node) {
    setTextContent(node, "");
}

module.exports = {
    contains: contains,
    deflt: deflt,
    escape: escape,
    hyphenate: hyphenate,
    indexOf: indexOf,
    setTextContent: setTextContent,
    clearNode: clearNode,
};


/***/ }),

/***/ "ybOZ":
/***/ (function(module, exports, __webpack_require__) {

/* eslint no-console:0 */
/**
 * This module contains general functions that can be used for building
 * different kinds of domTree nodes in a consistent manner.
 */

var domTree = __webpack_require__("DwkR");
var fontMetrics = __webpack_require__("zJjT");
var symbols = __webpack_require__("FdGB");
var utils = __webpack_require__("s847");

var greekCapitals = [
    "\\Gamma",
    "\\Delta",
    "\\Theta",
    "\\Lambda",
    "\\Xi",
    "\\Pi",
    "\\Sigma",
    "\\Upsilon",
    "\\Phi",
    "\\Psi",
    "\\Omega",
];

var dotlessLetters = [
    "\u0131",   // dotless i, \imath
    "\u0237",   // dotless j, \jmath
];

/**
 * Makes a symbolNode after translation via the list of symbols in symbols.js.
 * Correctly pulls out metrics for the character, and optionally takes a list of
 * classes to be attached to the node.
 */
var makeSymbol = function(value, style, mode, color, classes) {
    // Replace the value with its replaced value from symbol.js
    if (symbols[mode][value] && symbols[mode][value].replace) {
        value = symbols[mode][value].replace;
    }

    var metrics = fontMetrics.getCharacterMetrics(value, style);

    var symbolNode;
    if (metrics) {
        symbolNode = new domTree.symbolNode(
            value, metrics.height, metrics.depth, metrics.italic, metrics.skew,
            classes);
    } else {
        // TODO(emily): Figure out a good way to only print this in development
        typeof console !== "undefined" && console.warn(
            "No character metrics for '" + value + "' in style '" +
                style + "'");
        symbolNode = new domTree.symbolNode(value, 0, 0, 0, 0, classes);
    }

    if (color) {
        symbolNode.style.color = color;
    }

    return symbolNode;
};

/**
 * Makes a symbol in Main-Regular or AMS-Regular.
 * Used for rel, bin, open, close, inner, and punct.
 */
var mathsym = function(value, mode, color, classes) {
    // Decide what font to render the symbol in by its entry in the symbols
    // table.
    // Have a special case for when the value = \ because the \ is used as a
    // textord in unsupported command errors but cannot be parsed as a regular
    // text ordinal and is therefore not present as a symbol in the symbols
    // table for text
    if (value === "\\" || symbols[mode][value].font === "main") {
        return makeSymbol(value, "Main-Regular", mode, color, classes);
    } else {
        return makeSymbol(
            value, "AMS-Regular", mode, color, classes.concat(["amsrm"]));
    }
};

/**
 * Makes a symbol in the default font for mathords and textords.
 */
var mathDefault = function(value, mode, color, classes, type) {
    if (type === "mathord") {
        return mathit(value, mode, color, classes);
    } else if (type === "textord") {
        return makeSymbol(
            value, "Main-Regular", mode, color, classes.concat(["mathrm"]));
    } else {
        throw new Error("unexpected type: " + type + " in mathDefault");
    }
};

/**
 * Makes a symbol in the italic math font.
 */
var mathit = function(value, mode, color, classes) {
    if (/[0-9]/.test(value.charAt(0)) ||
            // glyphs for \imath and \jmath do not exist in Math-Italic so we
            // need to use Main-Italic instead
            utils.contains(dotlessLetters, value) ||
            utils.contains(greekCapitals, value)) {
        return makeSymbol(
            value, "Main-Italic", mode, color, classes.concat(["mainit"]));
    } else {
        return makeSymbol(
            value, "Math-Italic", mode, color, classes.concat(["mathit"]));
    }
};

/**
 * Makes either a mathord or textord in the correct font and color.
 */
var makeOrd = function(group, options, type) {
    var mode = group.mode;
    var value = group.value;
    if (symbols[mode][value] && symbols[mode][value].replace) {
        value = symbols[mode][value].replace;
    }

    var classes = ["mord"];
    var color = options.getColor();

    var font = options.font;
    if (font) {
        if (font === "mathit" || utils.contains(dotlessLetters, value)) {
            return mathit(value, mode, color, classes);
        } else {
            var fontName = fontMap[font].fontName;
            if (fontMetrics.getCharacterMetrics(value, fontName)) {
                return makeSymbol(
                    value, fontName, mode, color, classes.concat([font]));
            } else {
                return mathDefault(value, mode, color, classes, type);
            }
        }
    } else {
        return mathDefault(value, mode, color, classes, type);
    }
};

/**
 * Calculate the height, depth, and maxFontSize of an element based on its
 * children.
 */
var sizeElementFromChildren = function(elem) {
    var height = 0;
    var depth = 0;
    var maxFontSize = 0;

    if (elem.children) {
        for (var i = 0; i < elem.children.length; i++) {
            if (elem.children[i].height > height) {
                height = elem.children[i].height;
            }
            if (elem.children[i].depth > depth) {
                depth = elem.children[i].depth;
            }
            if (elem.children[i].maxFontSize > maxFontSize) {
                maxFontSize = elem.children[i].maxFontSize;
            }
        }
    }

    elem.height = height;
    elem.depth = depth;
    elem.maxFontSize = maxFontSize;
};

/**
 * Makes a span with the given list of classes, list of children, and color.
 */
var makeSpan = function(classes, children, color) {
    var span = new domTree.span(classes, children);

    sizeElementFromChildren(span);

    if (color) {
        span.style.color = color;
    }

    return span;
};

/**
 * Makes a document fragment with the given list of children.
 */
var makeFragment = function(children) {
    var fragment = new domTree.documentFragment(children);

    sizeElementFromChildren(fragment);

    return fragment;
};

/**
 * Makes an element placed in each of the vlist elements to ensure that each
 * element has the same max font size. To do this, we create a zero-width space
 * with the correct font size.
 */
var makeFontSizer = function(options, fontSize) {
    var fontSizeInner = makeSpan([], [new domTree.symbolNode("\u200b")]);
    fontSizeInner.style.fontSize =
        (fontSize / options.style.sizeMultiplier) + "em";

    var fontSizer = makeSpan(
        ["fontsize-ensurer", "reset-" + options.size, "size5"],
        [fontSizeInner]);

    return fontSizer;
};

/**
 * Makes a vertical list by stacking elements and kerns on top of each other.
 * Allows for many different ways of specifying the positioning method.
 *
 * Arguments:
 *  - children: A list of child or kern nodes to be stacked on top of each other
 *              (i.e. the first element will be at the bottom, and the last at
 *              the top). Element nodes are specified as
 *                {type: "elem", elem: node}
 *              while kern nodes are specified as
 *                {type: "kern", size: size}
 *  - positionType: The method by which the vlist should be positioned. Valid
 *                  values are:
 *                   - "individualShift": The children list only contains elem
 *                                        nodes, and each node contains an extra
 *                                        "shift" value of how much it should be
 *                                        shifted (note that shifting is always
 *                                        moving downwards). positionData is
 *                                        ignored.
 *                   - "top": The positionData specifies the topmost point of
 *                            the vlist (note this is expected to be a height,
 *                            so positive values move up)
 *                   - "bottom": The positionData specifies the bottommost point
 *                               of the vlist (note this is expected to be a
 *                               depth, so positive values move down
 *                   - "shift": The vlist will be positioned such that its
 *                              baseline is positionData away from the baseline
 *                              of the first child. Positive values move
 *                              downwards.
 *                   - "firstBaseline": The vlist will be positioned such that
 *                                      its baseline is aligned with the
 *                                      baseline of the first child.
 *                                      positionData is ignored. (this is
 *                                      equivalent to "shift" with
 *                                      positionData=0)
 *  - positionData: Data used in different ways depending on positionType
 *  - options: An Options object
 *
 */
var makeVList = function(children, positionType, positionData, options) {
    var depth;
    var currPos;
    var i;
    if (positionType === "individualShift") {
        var oldChildren = children;
        children = [oldChildren[0]];

        // Add in kerns to the list of children to get each element to be
        // shifted to the correct specified shift
        depth = -oldChildren[0].shift - oldChildren[0].elem.depth;
        currPos = depth;
        for (i = 1; i < oldChildren.length; i++) {
            var diff = -oldChildren[i].shift - currPos -
                oldChildren[i].elem.depth;
            var size = diff -
                (oldChildren[i - 1].elem.height +
                 oldChildren[i - 1].elem.depth);

            currPos = currPos + diff;

            children.push({type: "kern", size: size});
            children.push(oldChildren[i]);
        }
    } else if (positionType === "top") {
        // We always start at the bottom, so calculate the bottom by adding up
        // all the sizes
        var bottom = positionData;
        for (i = 0; i < children.length; i++) {
            if (children[i].type === "kern") {
                bottom -= children[i].size;
            } else {
                bottom -= children[i].elem.height + children[i].elem.depth;
            }
        }
        depth = bottom;
    } else if (positionType === "bottom") {
        depth = -positionData;
    } else if (positionType === "shift") {
        depth = -children[0].elem.depth - positionData;
    } else if (positionType === "firstBaseline") {
        depth = -children[0].elem.depth;
    } else {
        depth = 0;
    }

    // Make the fontSizer
    var maxFontSize = 0;
    for (i = 0; i < children.length; i++) {
        if (children[i].type === "elem") {
            maxFontSize = Math.max(maxFontSize, children[i].elem.maxFontSize);
        }
    }
    var fontSizer = makeFontSizer(options, maxFontSize);

    // Create a new list of actual children at the correct offsets
    var realChildren = [];
    currPos = depth;
    for (i = 0; i < children.length; i++) {
        if (children[i].type === "kern") {
            currPos += children[i].size;
        } else {
            var child = children[i].elem;

            var shift = -child.depth - currPos;
            currPos += child.height + child.depth;

            var childWrap = makeSpan([], [fontSizer, child]);
            childWrap.height -= shift;
            childWrap.depth += shift;
            childWrap.style.top = shift + "em";

            realChildren.push(childWrap);
        }
    }

    // Add in an element at the end with no offset to fix the calculation of
    // baselines in some browsers (namely IE, sometimes safari)
    var baselineFix = makeSpan(
        ["baseline-fix"], [fontSizer, new domTree.symbolNode("\u200b")]);
    realChildren.push(baselineFix);

    var vlist = makeSpan(["vlist"], realChildren);
    // Fix the final height and depth, in case there were kerns at the ends
    // since the makeSpan calculation won't take that in to account.
    vlist.height = Math.max(currPos, vlist.height);
    vlist.depth = Math.max(-depth, vlist.depth);
    return vlist;
};

// A table of size -> font size for the different sizing functions
var sizingMultiplier = {
    size1: 0.5,
    size2: 0.7,
    size3: 0.8,
    size4: 0.9,
    size5: 1.0,
    size6: 1.2,
    size7: 1.44,
    size8: 1.73,
    size9: 2.07,
    size10: 2.49,
};

// A map of spacing functions to their attributes, like size and corresponding
// CSS class
var spacingFunctions = {
    "\\qquad": {
        size: "2em",
        className: "qquad",
    },
    "\\quad": {
        size: "1em",
        className: "quad",
    },
    "\\enspace": {
        size: "0.5em",
        className: "enspace",
    },
    "\\;": {
        size: "0.277778em",
        className: "thickspace",
    },
    "\\:": {
        size: "0.22222em",
        className: "mediumspace",
    },
    "\\,": {
        size: "0.16667em",
        className: "thinspace",
    },
    "\\!": {
        size: "-0.16667em",
        className: "negativethinspace",
    },
};

/**
 * Maps TeX font commands to objects containing:
 * - variant: string used for "mathvariant" attribute in buildMathML.js
 * - fontName: the "style" parameter to fontMetrics.getCharacterMetrics
 */
// A map between tex font commands an MathML mathvariant attribute values
var fontMap = {
    // styles
    "mathbf": {
        variant: "bold",
        fontName: "Main-Bold",
    },
    "mathrm": {
        variant: "normal",
        fontName: "Main-Regular",
    },

    // "mathit" is missing because it requires the use of two fonts: Main-Italic
    // and Math-Italic.  This is handled by a special case in makeOrd which ends
    // up calling mathit.

    // families
    "mathbb": {
        variant: "double-struck",
        fontName: "AMS-Regular",
    },
    "mathcal": {
        variant: "script",
        fontName: "Caligraphic-Regular",
    },
    "mathfrak": {
        variant: "fraktur",
        fontName: "Fraktur-Regular",
    },
    "mathscr": {
        variant: "script",
        fontName: "Script-Regular",
    },
    "mathsf": {
        variant: "sans-serif",
        fontName: "SansSerif-Regular",
    },
    "mathtt": {
        variant: "monospace",
        fontName: "Typewriter-Regular",
    },
};

module.exports = {
    fontMap: fontMap,
    makeSymbol: makeSymbol,
    mathsym: mathsym,
    makeSpan: makeSpan,
    makeFragment: makeFragment,
    makeVList: makeVList,
    makeOrd: makeOrd,
    sizingMultiplier: sizingMultiplier,
    spacingFunctions: spacingFunctions,
};


/***/ }),

/***/ "yqz1":
/***/ (function(module, exports) {

/**
 * The resulting parse tree nodes of the parse tree.
 */
function ParseNode(type, value, mode) {
    this.type = type;
    this.value = value;
    this.mode = mode;
}

module.exports = {
    ParseNode: ParseNode,
};



/***/ }),

/***/ "zJjT":
/***/ (function(module, exports, __webpack_require__) {

/* eslint no-unused-vars:0 */

var Style = __webpack_require__("aNjz");

/**
 * This file contains metrics regarding fonts and individual symbols. The sigma
 * and xi variables, as well as the metricMap map contain data extracted from
 * TeX, TeX font metrics, and the TTF files. These data are then exposed via the
 * `metrics` variable and the getCharacterMetrics function.
 */

// These font metrics are extracted from TeX by using
// \font\a=cmmi10
// \showthe\fontdimenX\a
// where X is the corresponding variable number. These correspond to the font
// parameters of the symbol fonts. In TeX, there are actually three sets of
// dimensions, one for each of textstyle, scriptstyle, and scriptscriptstyle,
// but we only use the textstyle ones, and scale certain dimensions accordingly.
// See the TeXbook, page 441.
var sigma1 = 0.025;
var sigma2 = 0;
var sigma3 = 0;
var sigma4 = 0;
var sigma5 = 0.431;
var sigma6 = 1;
var sigma7 = 0;
var sigma8 = 0.677;
var sigma9 = 0.394;
var sigma10 = 0.444;
var sigma11 = 0.686;
var sigma12 = 0.345;
var sigma13 = 0.413;
var sigma14 = 0.363;
var sigma15 = 0.289;
var sigma16 = 0.150;
var sigma17 = 0.247;
var sigma18 = 0.386;
var sigma19 = 0.050;
var sigma20 = 2.390;
var sigma21 = 1.01;
var sigma21Script = 0.81;
var sigma21ScriptScript = 0.71;
var sigma22 = 0.250;

// These font metrics are extracted from TeX by using
// \font\a=cmex10
// \showthe\fontdimenX\a
// where X is the corresponding variable number. These correspond to the font
// parameters of the extension fonts (family 3). See the TeXbook, page 441.
var xi1 = 0;
var xi2 = 0;
var xi3 = 0;
var xi4 = 0;
var xi5 = 0.431;
var xi6 = 1;
var xi7 = 0;
var xi8 = 0.04;
var xi9 = 0.111;
var xi10 = 0.166;
var xi11 = 0.2;
var xi12 = 0.6;
var xi13 = 0.1;

// This value determines how large a pt is, for metrics which are defined in
// terms of pts.
// This value is also used in katex.less; if you change it make sure the values
// match.
var ptPerEm = 10.0;

// The space between adjacent `|` columns in an array definition. From
// `\showthe\doublerulesep` in LaTeX.
var doubleRuleSep = 2.0 / ptPerEm;

/**
 * This is just a mapping from common names to real metrics
 */
var metrics = {
    xHeight: sigma5,
    quad: sigma6,
    num1: sigma8,
    num2: sigma9,
    num3: sigma10,
    denom1: sigma11,
    denom2: sigma12,
    sup1: sigma13,
    sup2: sigma14,
    sup3: sigma15,
    sub1: sigma16,
    sub2: sigma17,
    supDrop: sigma18,
    subDrop: sigma19,
    axisHeight: sigma22,
    defaultRuleThickness: xi8,
    bigOpSpacing1: xi9,
    bigOpSpacing2: xi10,
    bigOpSpacing3: xi11,
    bigOpSpacing4: xi12,
    bigOpSpacing5: xi13,
    ptPerEm: ptPerEm,
    emPerEx: sigma5 / sigma6,
    doubleRuleSep: doubleRuleSep,

    // TODO(alpert): Missing parallel structure here. We should probably add
    // style-specific metrics for all of these.
    delim1: sigma20,
    getDelim2: function(style) {
        if (style.size === Style.TEXT.size) {
            return sigma21;
        } else if (style.size === Style.SCRIPT.size) {
            return sigma21Script;
        } else if (style.size === Style.SCRIPTSCRIPT.size) {
            return sigma21ScriptScript;
        }
        throw new Error("Unexpected style size: " + style.size);
    },
};

// This map contains a mapping from font name and character code to character
// metrics, including height, depth, italic correction, and skew (kern from the
// character to the corresponding \skewchar)
// This map is generated via `make metrics`. It should not be changed manually.
var metricMap = __webpack_require__("cstk");

/**
 * This function is a convenience function for looking up information in the
 * metricMap table. It takes a character as a string, and a style.
 *
 * Note: the `width` property may be undefined if fontMetricsData.js wasn't
 * built using `Make extended_metrics`.
 */
var getCharacterMetrics = function(character, style) {
    var metrics = metricMap[style][character.charCodeAt(0)];
    if (metrics) {
        return {
            depth: metrics[0],
            height: metrics[1],
            italic: metrics[2],
            skew: metrics[3],
            width: metrics[4],
        };
    }
};

module.exports = {
    metrics: metrics,
    getCharacterMetrics: getCharacterMetrics,
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMva2F0ZXgvc3JjL2J1aWxkSFRNTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMva2F0ZXgvc3JjL2J1aWxkTWF0aE1MLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9rYXRleC9zcmMvZGVsaW1pdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9rYXRleC9zcmMvcGFyc2VUcmVlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9rYXRleC9zcmMvZG9tVHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMva2F0ZXgvc3JjL3N5bWJvbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2thdGV4L3NyYy9idWlsZFRyZWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2thdGV4L3NyYy9tYXRoTUxUcmVlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9rYXRleC9zcmMvZm9udE1ldHJpY3NEYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9rYXRleC9zcmMvZnVuY3Rpb25zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9rYXRleC9zcmMvZW52aXJvbm1lbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9rYXRleC9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2thdGV4L3NyYy9idWlsZENvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMva2F0ZXgvc3JjL3BhcnNlRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMva2F0ZXgvc3JjL2ZvbnRNZXRyaWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLG1CQUFPLENBQUMsTUFBYztBQUN2QyxZQUFZLG1CQUFPLENBQUMsTUFBUzs7QUFFN0Isa0JBQWtCLG1CQUFPLENBQUMsTUFBZTtBQUN6QyxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFhO0FBQ3JDLGNBQWMsbUJBQU8sQ0FBQyxNQUFXO0FBQ2pDLGtCQUFrQixtQkFBTyxDQUFDLE1BQWU7QUFDekMsWUFBWSxtQkFBTyxDQUFDLE1BQVM7O0FBRTdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVCQUF1QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixLQUFLLElBQUk7QUFDakM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLDJCQUEyQjtBQUN4Qzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSwyQkFBMkI7QUFDeEM7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsNENBQTRDO0FBQ3pELGFBQWEsNkNBQTZDO0FBQzFEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsa0RBQWtEO0FBQy9ELGFBQWEsaURBQWlEO0FBQzlEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsYUFBYSxrREFBa0Q7QUFDL0QsYUFBYSxnREFBZ0Q7QUFDN0QsYUFBYSxpREFBaUQ7QUFDOUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4Qyx1Q0FBdUM7O0FBRXZDO0FBQ0EsZUFBZSw2QkFBNkI7QUFDNUM7QUFDQSxtQ0FBbUM7QUFDbkMsaUNBQWlDOztBQUVqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixRQUFRO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsdUNBQXVDO0FBQzdEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qiw2QkFBNkI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsc0RBQXNEO0FBQ3ZFLGlCQUFpQiwyQkFBMkI7QUFDNUMsaUJBQWlCLDRCQUE0QjtBQUM3QyxpQkFBaUIseUJBQXlCO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQSxpQkFBaUIseUJBQXlCO0FBQzFDLGlCQUFpQiw0QkFBNEI7QUFDN0MsaUJBQWlCLDJCQUEyQjtBQUM1QyxpQkFBaUIsc0RBQXNEO0FBQ3ZFOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsc0RBQXNEO0FBQ3ZFLGlCQUFpQiwyQkFBMkI7QUFDNUMsaUJBQWlCLDRCQUE0QjtBQUM3QyxpQkFBaUIseUJBQXlCO0FBQzFDLGlCQUFpQiw0QkFBNEI7QUFDN0MsaUJBQWlCLDJCQUEyQjtBQUM1QyxpQkFBaUIsc0RBQXNEO0FBQ3ZFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTLCtCQUErQjtBQUN4QyxTQUFTLGtDQUFrQztBQUMzQyxTQUFTLHlCQUF5QjtBQUNsQyxTQUFTLDhCQUE4QjtBQUN2Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVMsOEJBQThCO0FBQ3ZDLFNBQVMseUJBQXlCO0FBQ2xDLFNBQVMsa0NBQWtDO0FBQzNDLFNBQVMsK0JBQStCO0FBQ3hDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU0sR0FBRztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGFBQWEsMEJBQTBCO0FBQ3ZDLGFBQWEsa0NBQWtDO0FBQy9DLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEsOEJBQThCO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLDZCQUE2QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVMseUJBQXlCO0FBQ2xDLFNBQVMsK0JBQStCO0FBQ3hDLFNBQVMsK0JBQStCO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7QUN6M0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLG1CQUFPLENBQUMsTUFBZTtBQUN6QyxrQkFBa0IsbUJBQU8sQ0FBQyxNQUFlO0FBQ3pDLGlCQUFpQixtQkFBTyxDQUFDLE1BQWM7QUFDdkMsaUJBQWlCLG1CQUFPLENBQUMsTUFBYztBQUN2QyxjQUFjLG1CQUFPLENBQUMsTUFBVztBQUNqQyxZQUFZLG1CQUFPLENBQUMsTUFBUzs7QUFFN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVCQUF1QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDcGhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLG1CQUFPLENBQUMsTUFBYztBQUN2QyxZQUFZLG1CQUFPLENBQUMsTUFBUzs7QUFFN0Isa0JBQWtCLG1CQUFPLENBQUMsTUFBZTtBQUN6QyxrQkFBa0IsbUJBQU8sQ0FBQyxNQUFlO0FBQ3pDLGNBQWMsbUJBQU8sQ0FBQyxNQUFXO0FBQ2pDLFlBQVksbUJBQU8sQ0FBQyxNQUFTOztBQUU3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssd0JBQXdCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLHdCQUF3QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtQkFBbUI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLLHlDQUF5QztBQUM5QyxLQUFLLG1DQUFtQztBQUN4QyxLQUFLLGlDQUFpQztBQUN0QyxLQUFLLHVCQUF1QjtBQUM1QixLQUFLLHVCQUF1QjtBQUM1QixLQUFLLHVCQUF1QjtBQUM1QixLQUFLLHVCQUF1QjtBQUM1Qjs7QUFFQTtBQUNBO0FBQ0EsS0FBSyx5Q0FBeUM7QUFDOUMsS0FBSyxtQ0FBbUM7QUFDeEMsS0FBSyxpQ0FBaUM7QUFDdEMsS0FBSyxjQUFjO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUsseUNBQXlDO0FBQzlDLEtBQUssbUNBQW1DO0FBQ3hDLEtBQUssaUNBQWlDO0FBQ3RDLEtBQUssdUJBQXVCO0FBQzVCLEtBQUssdUJBQXVCO0FBQzVCLEtBQUssdUJBQXVCO0FBQzVCLEtBQUssdUJBQXVCO0FBQzVCLEtBQUssY0FBYztBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsR0FBRyxZQUFZLE9BQU8sT0FBTztBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM3aEJBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxNQUFVOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLG1CQUFPLENBQUMsTUFBUzs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFFBQVE7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyRUFBMkU7QUFDM0U7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG1CQUFtQiwwQkFBMEI7QUFDN0M7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLDBCQUEwQjtBQUM3QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQSwyRUFBMkU7QUFDM0U7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDNVFBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWixZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsS0FBSztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLE9BQU87QUFDeEMsa0NBQWtDLE9BQU87QUFDekMsaUNBQWlDO0FBQ2pDLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyw0QkFBNEI7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDO0FBQzVDLFdBQVcsd0JBQXdCO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxvQkFBb0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDM21CQSxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFhO0FBQ3JDLGtCQUFrQixtQkFBTyxDQUFDLE1BQWU7QUFDekMsa0JBQWtCLG1CQUFPLENBQUMsTUFBZTtBQUN6QyxjQUFjLG1CQUFPLENBQUMsTUFBVztBQUNqQyxlQUFlLG1CQUFPLENBQUMsTUFBWTtBQUNuQyxZQUFZLG1CQUFPLENBQUMsTUFBUzs7QUFFN0I7O0FBRUE7QUFDQSwwQ0FBMEM7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLG1CQUFPLENBQUMsTUFBUzs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLDBCQUEwQjtBQUM3QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQiwwQkFBMEI7QUFDN0M7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7QUN2dERBLFlBQVksbUJBQU8sQ0FBQyxNQUFTO0FBQzdCLGlCQUFpQixtQkFBTyxDQUFDLE1BQWM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFVBQVU7QUFDckM7QUFDQSwyQkFBMkIsUUFBUTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsZ0JBQWdCLHlCQUF5QjtBQUN6QyxnQkFBZ0IseUJBQXlCO0FBQ3pDLGdCQUFnQix5QkFBeUI7QUFDekMsZ0JBQWdCLHlCQUF5QjtBQUN6QyxnQkFBZ0IseUJBQXlCO0FBQ3pDLGdCQUFnQix5QkFBeUI7QUFDekMsZ0JBQWdCLHlCQUF5QjtBQUN6QyxnQkFBZ0IseUJBQXlCO0FBQ3pDLGdCQUFnQix5QkFBeUI7QUFDekMsZ0JBQWdCLHlCQUF5QjtBQUN6QyxnQkFBZ0IseUJBQXlCO0FBQ3pDLGdCQUFnQix5QkFBeUI7QUFDekMsZ0JBQWdCLHlCQUF5QjtBQUN6QyxnQkFBZ0IseUJBQXlCO0FBQ3pDLGdCQUFnQix5QkFBeUI7QUFDekMsZ0JBQWdCLHlCQUF5QjtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0EsUUFBUSxtQkFBbUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsbUNBQW1DO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw0QkFBNEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7OztBQ25rQkQ7QUFDQSxrQkFBa0IsbUJBQU8sQ0FBQyxNQUFlO0FBQ3pDLGdCQUFnQixtQkFBTyxDQUFDLE1BQWE7QUFDckMsaUJBQWlCLG1CQUFPLENBQUMsTUFBYzs7QUFFdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxLQUFLO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsSUFBSTtBQUN6QixVQUFVLE9BQU8sT0FBTyxHQUFHLEdBQUcsTUFBTSxLQUFLLFFBQVEsTUFBTTtBQUN2RDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxtQkFBbUIsYUFBYTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7QUM1TkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBTztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWU7QUFDZixjQUFjO0FBQ2QsY0FBYztBQUNkLGlCQUFpQjtBQUNqQixnQkFBZ0I7QUFDaEI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLG1CQUFPLENBQUMsTUFBVztBQUNqQyxrQkFBa0IsbUJBQU8sQ0FBQyxNQUFlO0FBQ3pDLGNBQWMsbUJBQU8sQ0FBQyxNQUFXO0FBQ2pDLFlBQVksbUJBQU8sQ0FBQyxNQUFTOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsMEJBQTBCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix3QkFBd0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwyQkFBMkIseUJBQXlCO0FBQ3BEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEM7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2pjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDWEE7O0FBRUEsWUFBWSxtQkFBTyxDQUFDLE1BQVM7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFtQjs7QUFFM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidmVuZG9yfmQ1MjE2ZjY0LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBuby1jb25zb2xlOjAgKi9cbi8qKlxuICogVGhpcyBmaWxlIGRvZXMgdGhlIG1haW4gd29yayBvZiBidWlsZGluZyBhIGRvbVRyZWUgc3RydWN0dXJlIGZyb20gYSBwYXJzZVxuICogdHJlZS4gVGhlIGVudHJ5IHBvaW50IGlzIHRoZSBgYnVpbGRIVE1MYCBmdW5jdGlvbiwgd2hpY2ggdGFrZXMgYSBwYXJzZSB0cmVlLlxuICogVGhlbiwgdGhlIGJ1aWxkRXhwcmVzc2lvbiwgYnVpbGRHcm91cCwgYW5kIHZhcmlvdXMgZ3JvdXBUeXBlcyBmdW5jdGlvbnMgYXJlXG4gKiBjYWxsZWQsIHRvIHByb2R1Y2UgYSBmaW5hbCBIVE1MIHRyZWUuXG4gKi9cblxudmFyIFBhcnNlRXJyb3IgPSByZXF1aXJlKFwiLi9QYXJzZUVycm9yXCIpO1xudmFyIFN0eWxlID0gcmVxdWlyZShcIi4vU3R5bGVcIik7XG5cbnZhciBidWlsZENvbW1vbiA9IHJlcXVpcmUoXCIuL2J1aWxkQ29tbW9uXCIpO1xudmFyIGRlbGltaXRlciA9IHJlcXVpcmUoXCIuL2RlbGltaXRlclwiKTtcbnZhciBkb21UcmVlID0gcmVxdWlyZShcIi4vZG9tVHJlZVwiKTtcbnZhciBmb250TWV0cmljcyA9IHJlcXVpcmUoXCIuL2ZvbnRNZXRyaWNzXCIpO1xudmFyIHV0aWxzID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5cbnZhciBtYWtlU3BhbiA9IGJ1aWxkQ29tbW9uLm1ha2VTcGFuO1xuXG4vKipcbiAqIFRha2UgYSBsaXN0IG9mIG5vZGVzLCBidWlsZCB0aGVtIGluIG9yZGVyLCBhbmQgcmV0dXJuIGEgbGlzdCBvZiB0aGUgYnVpbHRcbiAqIG5vZGVzLiBUaGlzIGZ1bmN0aW9uIGhhbmRsZXMgdGhlIGBwcmV2YCBub2RlIGNvcnJlY3RseSwgYW5kIHBhc3NlcyB0aGVcbiAqIHByZXZpb3VzIGVsZW1lbnQgZnJvbSB0aGUgbGlzdCBhcyB0aGUgcHJldiBvZiB0aGUgbmV4dCBlbGVtZW50LlxuICovXG52YXIgYnVpbGRFeHByZXNzaW9uID0gZnVuY3Rpb24oZXhwcmVzc2lvbiwgb3B0aW9ucywgcHJldikge1xuICAgIHZhciBncm91cHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cHJlc3Npb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGdyb3VwID0gZXhwcmVzc2lvbltpXTtcbiAgICAgICAgZ3JvdXBzLnB1c2goYnVpbGRHcm91cChncm91cCwgb3B0aW9ucywgcHJldikpO1xuICAgICAgICBwcmV2ID0gZ3JvdXA7XG4gICAgfVxuICAgIHJldHVybiBncm91cHM7XG59O1xuXG4vLyBMaXN0IG9mIHR5cGVzIHVzZWQgYnkgZ2V0VHlwZU9mR3JvdXAsXG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL0toYW4vS2FUZVgvd2lraS9FeGFtaW5pbmctVGVYI2dyb3VwLXR5cGVzXG52YXIgZ3JvdXBUb1R5cGUgPSB7XG4gICAgbWF0aG9yZDogXCJtb3JkXCIsXG4gICAgdGV4dG9yZDogXCJtb3JkXCIsXG4gICAgYmluOiBcIm1iaW5cIixcbiAgICByZWw6IFwibXJlbFwiLFxuICAgIHRleHQ6IFwibW9yZFwiLFxuICAgIG9wZW46IFwibW9wZW5cIixcbiAgICBjbG9zZTogXCJtY2xvc2VcIixcbiAgICBpbm5lcjogXCJtaW5uZXJcIixcbiAgICBnZW5mcmFjOiBcIm1vcmRcIixcbiAgICBhcnJheTogXCJtb3JkXCIsXG4gICAgc3BhY2luZzogXCJtb3JkXCIsXG4gICAgcHVuY3Q6IFwibXB1bmN0XCIsXG4gICAgb3JkZ3JvdXA6IFwibW9yZFwiLFxuICAgIG9wOiBcIm1vcFwiLFxuICAgIGthdGV4OiBcIm1vcmRcIixcbiAgICBvdmVybGluZTogXCJtb3JkXCIsXG4gICAgdW5kZXJsaW5lOiBcIm1vcmRcIixcbiAgICBydWxlOiBcIm1vcmRcIixcbiAgICBsZWZ0cmlnaHQ6IFwibWlubmVyXCIsXG4gICAgc3FydDogXCJtb3JkXCIsXG4gICAgYWNjZW50OiBcIm1vcmRcIixcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgZmluYWwgbWF0aCB0eXBlIG9mIGFuIGV4cHJlc3Npb24sIGdpdmVuIGl0cyBncm91cCB0eXBlLiBUaGlzIHR5cGUgaXNcbiAqIHVzZWQgdG8gZGV0ZXJtaW5lIHNwYWNpbmcgYmV0d2VlbiBlbGVtZW50cywgYW5kIGFmZmVjdHMgYmluIGVsZW1lbnRzIGJ5XG4gKiBjYXVzaW5nIHRoZW0gdG8gY2hhbmdlIGRlcGVuZGluZyBvbiB3aGF0IHR5cGVzIGFyZSBhcm91bmQgdGhlbS4gVGhpcyB0eXBlXG4gKiBtdXN0IGJlIGF0dGFjaGVkIHRvIHRoZSBvdXRlcm1vc3Qgbm9kZSBvZiBhbiBlbGVtZW50IGFzIGEgQ1NTIGNsYXNzIHNvIHRoYXRcbiAqIHNwYWNpbmcgd2l0aCBpdHMgc3Vycm91bmRpbmcgZWxlbWVudHMgd29ya3MgY29ycmVjdGx5LlxuICpcbiAqIFNvbWUgZWxlbWVudHMgY2FuIGJlIG1hcHBlZCBvbmUtdG8tb25lIGZyb20gZ3JvdXAgdHlwZSB0byBtYXRoIHR5cGUsIGFuZFxuICogdGhvc2UgYXJlIGxpc3RlZCBpbiB0aGUgYGdyb3VwVG9UeXBlYCB0YWJsZS5cbiAqXG4gKiBPdGhlcnMgKHVzdWFsbHkgZWxlbWVudHMgdGhhdCB3cmFwIGFyb3VuZCBvdGhlciBlbGVtZW50cykgb2Z0ZW4gaGF2ZVxuICogcmVjdXJzaXZlIGRlZmluaXRpb25zLCBhbmQgdGh1cyBjYWxsIGBnZXRUeXBlT2ZHcm91cGAgb24gdGhlaXIgaW5uZXJcbiAqIGVsZW1lbnRzLlxuICovXG52YXIgZ2V0VHlwZU9mR3JvdXAgPSBmdW5jdGlvbihncm91cCkge1xuICAgIGlmIChncm91cCA9PSBudWxsKSB7XG4gICAgICAgIC8vIExpa2Ugd2hlbiB0eXBlc2V0dGluZyAkXjMkXG4gICAgICAgIHJldHVybiBncm91cFRvVHlwZS5tYXRob3JkO1xuICAgIH0gZWxzZSBpZiAoZ3JvdXAudHlwZSA9PT0gXCJzdXBzdWJcIikge1xuICAgICAgICByZXR1cm4gZ2V0VHlwZU9mR3JvdXAoZ3JvdXAudmFsdWUuYmFzZSk7XG4gICAgfSBlbHNlIGlmIChncm91cC50eXBlID09PSBcImxsYXBcIiB8fCBncm91cC50eXBlID09PSBcInJsYXBcIikge1xuICAgICAgICByZXR1cm4gZ2V0VHlwZU9mR3JvdXAoZ3JvdXAudmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoZ3JvdXAudHlwZSA9PT0gXCJjb2xvclwiKSB7XG4gICAgICAgIHJldHVybiBnZXRUeXBlT2ZHcm91cChncm91cC52YWx1ZS52YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChncm91cC50eXBlID09PSBcInNpemluZ1wiKSB7XG4gICAgICAgIHJldHVybiBnZXRUeXBlT2ZHcm91cChncm91cC52YWx1ZS52YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChncm91cC50eXBlID09PSBcInN0eWxpbmdcIikge1xuICAgICAgICByZXR1cm4gZ2V0VHlwZU9mR3JvdXAoZ3JvdXAudmFsdWUudmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoZ3JvdXAudHlwZSA9PT0gXCJkZWxpbXNpemluZ1wiKSB7XG4gICAgICAgIHJldHVybiBncm91cFRvVHlwZVtncm91cC52YWx1ZS5kZWxpbVR5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBncm91cFRvVHlwZVtncm91cC50eXBlXTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFNvbWV0aW1lcywgZ3JvdXBzIHBlcmZvcm0gc3BlY2lhbCBydWxlcyB3aGVuIHRoZXkgaGF2ZSBzdXBlcnNjcmlwdHMgb3JcbiAqIHN1YnNjcmlwdHMgYXR0YWNoZWQgdG8gdGhlbS4gVGhpcyBmdW5jdGlvbiBsZXRzIHRoZSBgc3Vwc3ViYCBncm91cCBrbm93IHRoYXRcbiAqIGl0cyBpbm5lciBlbGVtZW50IHNob3VsZCBoYW5kbGUgdGhlIHN1cGVyc2NyaXB0cyBhbmQgc3Vic2NyaXB0cyBpbnN0ZWFkIG9mXG4gKiBoYW5kbGluZyB0aGVtIGl0c2VsZi5cbiAqL1xudmFyIHNob3VsZEhhbmRsZVN1cFN1YiA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zKSB7XG4gICAgaWYgKCFncm91cCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChncm91cC50eXBlID09PSBcIm9wXCIpIHtcbiAgICAgICAgLy8gT3BlcmF0b3JzIGhhbmRsZSBzdXBzdWJzIGRpZmZlcmVudGx5IHdoZW4gdGhleSBoYXZlIGxpbWl0c1xuICAgICAgICAvLyAoZS5nLiBgXFxkaXNwbGF5c3R5bGVcXHN1bV8yXjNgKVxuICAgICAgICByZXR1cm4gZ3JvdXAudmFsdWUubGltaXRzICYmXG4gICAgICAgICAgICAob3B0aW9ucy5zdHlsZS5zaXplID09PSBTdHlsZS5ESVNQTEFZLnNpemUgfHxcbiAgICAgICAgICAgIGdyb3VwLnZhbHVlLmFsd2F5c0hhbmRsZVN1cFN1Yik7XG4gICAgfSBlbHNlIGlmIChncm91cC50eXBlID09PSBcImFjY2VudFwiKSB7XG4gICAgICAgIHJldHVybiBpc0NoYXJhY3RlckJveChncm91cC52YWx1ZS5iYXNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuXG4vKipcbiAqIFNvbWV0aW1lcyB3ZSB3YW50IHRvIHB1bGwgb3V0IHRoZSBpbm5lcm1vc3QgZWxlbWVudCBvZiBhIGdyb3VwLiBJbiBtb3N0XG4gKiBjYXNlcywgdGhpcyB3aWxsIGp1c3QgYmUgdGhlIGdyb3VwIGl0c2VsZiwgYnV0IHdoZW4gb3JkZ3JvdXBzIGFuZCBjb2xvcnMgaGF2ZVxuICogYSBzaW5nbGUgZWxlbWVudCwgd2Ugd2FudCB0byBwdWxsIHRoYXQgb3V0LlxuICovXG52YXIgZ2V0QmFzZUVsZW0gPSBmdW5jdGlvbihncm91cCkge1xuICAgIGlmICghZ3JvdXApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZ3JvdXAudHlwZSA9PT0gXCJvcmRncm91cFwiKSB7XG4gICAgICAgIGlmIChncm91cC52YWx1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRCYXNlRWxlbShncm91cC52YWx1ZVswXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGdyb3VwLnR5cGUgPT09IFwiY29sb3JcIikge1xuICAgICAgICBpZiAoZ3JvdXAudmFsdWUudmFsdWUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0QmFzZUVsZW0oZ3JvdXAudmFsdWUudmFsdWVbMF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgIH1cbn07XG5cbi8qKlxuICogVGVYYm9vayBhbGdvcml0aG1zIG9mdGVuIHJlZmVyZW5jZSBcImNoYXJhY3RlciBib3hlc1wiLCB3aGljaCBhcmUgc2ltcGx5IGdyb3Vwc1xuICogd2l0aCBhIHNpbmdsZSBjaGFyYWN0ZXIgaW4gdGhlbS4gVG8gZGVjaWRlIGlmIHNvbWV0aGluZyBpcyBhIGNoYXJhY3RlciBib3gsXG4gKiB3ZSBmaW5kIGl0cyBpbm5lcm1vc3QgZ3JvdXAsIGFuZCBzZWUgaWYgaXQgaXMgYSBzaW5nbGUgY2hhcmFjdGVyLlxuICovXG52YXIgaXNDaGFyYWN0ZXJCb3ggPSBmdW5jdGlvbihncm91cCkge1xuICAgIHZhciBiYXNlRWxlbSA9IGdldEJhc2VFbGVtKGdyb3VwKTtcblxuICAgIC8vIFRoZXNlIGFyZSBhbGwgdGhleSB0eXBlcyBvZiBncm91cHMgd2hpY2ggaG9sZCBzaW5nbGUgY2hhcmFjdGVyc1xuICAgIHJldHVybiBiYXNlRWxlbS50eXBlID09PSBcIm1hdGhvcmRcIiB8fFxuICAgICAgICBiYXNlRWxlbS50eXBlID09PSBcInRleHRvcmRcIiB8fFxuICAgICAgICBiYXNlRWxlbS50eXBlID09PSBcImJpblwiIHx8XG4gICAgICAgIGJhc2VFbGVtLnR5cGUgPT09IFwicmVsXCIgfHxcbiAgICAgICAgYmFzZUVsZW0udHlwZSA9PT0gXCJpbm5lclwiIHx8XG4gICAgICAgIGJhc2VFbGVtLnR5cGUgPT09IFwib3BlblwiIHx8XG4gICAgICAgIGJhc2VFbGVtLnR5cGUgPT09IFwiY2xvc2VcIiB8fFxuICAgICAgICBiYXNlRWxlbS50eXBlID09PSBcInB1bmN0XCI7XG59O1xuXG52YXIgbWFrZU51bGxEZWxpbWl0ZXIgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIG1ha2VTcGFuKFtcbiAgICAgICAgXCJzaXppbmdcIiwgXCJyZXNldC1cIiArIG9wdGlvbnMuc2l6ZSwgXCJzaXplNVwiLFxuICAgICAgICBvcHRpb25zLnN0eWxlLnJlc2V0KCksIFN0eWxlLlRFWFQuY2xzKCksXG4gICAgICAgIFwibnVsbGRlbGltaXRlclwiLFxuICAgIF0pO1xufTtcblxuLyoqXG4gKiBUaGlzIGlzIGEgbWFwIG9mIGdyb3VwIHR5cGVzIHRvIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGhhbmRsZSB0aGF0IHR5cGUuXG4gKiBTaW1wbGVyIHR5cGVzIGNvbWUgYXQgdGhlIGJlZ2lubmluZywgd2hpbGUgY29tcGxpY2F0ZWQgdHlwZXMgY29tZSBhZnRlcndhcmRzLlxuICovXG52YXIgZ3JvdXBUeXBlcyA9IHt9O1xuXG5ncm91cFR5cGVzLm1hdGhvcmQgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucywgcHJldikge1xuICAgIHJldHVybiBidWlsZENvbW1vbi5tYWtlT3JkKGdyb3VwLCBvcHRpb25zLCBcIm1hdGhvcmRcIik7XG59O1xuXG5ncm91cFR5cGVzLnRleHRvcmQgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucywgcHJldikge1xuICAgIHJldHVybiBidWlsZENvbW1vbi5tYWtlT3JkKGdyb3VwLCBvcHRpb25zLCBcInRleHRvcmRcIik7XG59O1xuXG5ncm91cFR5cGVzLmJpbiA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zLCBwcmV2KSB7XG4gICAgdmFyIGNsYXNzTmFtZSA9IFwibWJpblwiO1xuICAgIC8vIFB1bGwgb3V0IHRoZSBtb3N0IHJlY2VudCBlbGVtZW50LiBEbyBzb21lIHNwZWNpYWwgaGFuZGxpbmcgdG8gZmluZFxuICAgIC8vIHRoaW5ncyBhdCB0aGUgZW5kIG9mIGEgXFxjb2xvciBncm91cC4gTm90ZSB0aGF0IHdlIGRvbid0IHVzZSB0aGUgc2FtZVxuICAgIC8vIGxvZ2ljIGZvciBvcmRncm91cHMgKHdoaWNoIGNvdW50IGFzIG9yZHMpLlxuICAgIHZhciBwcmV2QXRvbSA9IHByZXY7XG4gICAgd2hpbGUgKHByZXZBdG9tICYmIHByZXZBdG9tLnR5cGUgPT09IFwiY29sb3JcIikge1xuICAgICAgICB2YXIgYXRvbXMgPSBwcmV2QXRvbS52YWx1ZS52YWx1ZTtcbiAgICAgICAgcHJldkF0b20gPSBhdG9tc1thdG9tcy5sZW5ndGggLSAxXTtcbiAgICB9XG4gICAgLy8gU2VlIFRlWGJvb2sgcGcuIDQ0Mi00NDYsIFJ1bGVzIDUgYW5kIDYsIGFuZCB0aGUgdGV4dCBiZWZvcmUgUnVsZSAxOS5cbiAgICAvLyBIZXJlLCB3ZSBkZXRlcm1pbmUgd2hldGhlciB0aGUgYmluIHNob3VsZCB0dXJuIGludG8gYW4gb3JkLiBXZVxuICAgIC8vIGN1cnJlbnRseSBvbmx5IGFwcGx5IFJ1bGUgNS5cbiAgICBpZiAoIXByZXYgfHwgdXRpbHMuY29udGFpbnMoW1wibWJpblwiLCBcIm1vcGVuXCIsIFwibXJlbFwiLCBcIm1vcFwiLCBcIm1wdW5jdFwiXSxcbiAgICAgICAgICAgIGdldFR5cGVPZkdyb3VwKHByZXZBdG9tKSkpIHtcbiAgICAgICAgZ3JvdXAudHlwZSA9IFwidGV4dG9yZFwiO1xuICAgICAgICBjbGFzc05hbWUgPSBcIm1vcmRcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVpbGRDb21tb24ubWF0aHN5bShcbiAgICAgICAgZ3JvdXAudmFsdWUsIGdyb3VwLm1vZGUsIG9wdGlvbnMuZ2V0Q29sb3IoKSwgW2NsYXNzTmFtZV0pO1xufTtcblxuZ3JvdXBUeXBlcy5yZWwgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucywgcHJldikge1xuICAgIHJldHVybiBidWlsZENvbW1vbi5tYXRoc3ltKFxuICAgICAgICBncm91cC52YWx1ZSwgZ3JvdXAubW9kZSwgb3B0aW9ucy5nZXRDb2xvcigpLCBbXCJtcmVsXCJdKTtcbn07XG5cbmdyb3VwVHlwZXMub3BlbiA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zLCBwcmV2KSB7XG4gICAgcmV0dXJuIGJ1aWxkQ29tbW9uLm1hdGhzeW0oXG4gICAgICAgIGdyb3VwLnZhbHVlLCBncm91cC5tb2RlLCBvcHRpb25zLmdldENvbG9yKCksIFtcIm1vcGVuXCJdKTtcbn07XG5cbmdyb3VwVHlwZXMuY2xvc2UgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucywgcHJldikge1xuICAgIHJldHVybiBidWlsZENvbW1vbi5tYXRoc3ltKFxuICAgICAgICBncm91cC52YWx1ZSwgZ3JvdXAubW9kZSwgb3B0aW9ucy5nZXRDb2xvcigpLCBbXCJtY2xvc2VcIl0pO1xufTtcblxuZ3JvdXBUeXBlcy5pbm5lciA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zLCBwcmV2KSB7XG4gICAgcmV0dXJuIGJ1aWxkQ29tbW9uLm1hdGhzeW0oXG4gICAgICAgIGdyb3VwLnZhbHVlLCBncm91cC5tb2RlLCBvcHRpb25zLmdldENvbG9yKCksIFtcIm1pbm5lclwiXSk7XG59O1xuXG5ncm91cFR5cGVzLnB1bmN0ID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMsIHByZXYpIHtcbiAgICByZXR1cm4gYnVpbGRDb21tb24ubWF0aHN5bShcbiAgICAgICAgZ3JvdXAudmFsdWUsIGdyb3VwLm1vZGUsIG9wdGlvbnMuZ2V0Q29sb3IoKSwgW1wibXB1bmN0XCJdKTtcbn07XG5cbmdyb3VwVHlwZXMub3JkZ3JvdXAgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucywgcHJldikge1xuICAgIHJldHVybiBtYWtlU3BhbihcbiAgICAgICAgW1wibW9yZFwiLCBvcHRpb25zLnN0eWxlLmNscygpXSxcbiAgICAgICAgYnVpbGRFeHByZXNzaW9uKGdyb3VwLnZhbHVlLCBvcHRpb25zLnJlc2V0KCkpXG4gICAgKTtcbn07XG5cbmdyb3VwVHlwZXMudGV4dCA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zLCBwcmV2KSB7XG4gICAgcmV0dXJuIG1ha2VTcGFuKFtcInRleHRcIiwgXCJtb3JkXCIsIG9wdGlvbnMuc3R5bGUuY2xzKCldLFxuICAgICAgICBidWlsZEV4cHJlc3Npb24oZ3JvdXAudmFsdWUuYm9keSwgb3B0aW9ucy5yZXNldCgpKSk7XG59O1xuXG5ncm91cFR5cGVzLmNvbG9yID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMsIHByZXYpIHtcbiAgICB2YXIgZWxlbWVudHMgPSBidWlsZEV4cHJlc3Npb24oXG4gICAgICAgIGdyb3VwLnZhbHVlLnZhbHVlLFxuICAgICAgICBvcHRpb25zLndpdGhDb2xvcihncm91cC52YWx1ZS5jb2xvciksXG4gICAgICAgIHByZXZcbiAgICApO1xuXG4gICAgLy8gXFxjb2xvciBpc24ndCBzdXBwb3NlZCB0byBhZmZlY3QgdGhlIHR5cGUgb2YgdGhlIGVsZW1lbnRzIGl0IGNvbnRhaW5zLlxuICAgIC8vIFRvIGFjY29tcGxpc2ggdGhpcywgd2Ugd3JhcCB0aGUgcmVzdWx0cyBpbiBhIGZyYWdtZW50LCBzbyB0aGUgaW5uZXJcbiAgICAvLyBlbGVtZW50cyB3aWxsIGJlIGFibGUgdG8gZGlyZWN0bHkgaW50ZXJhY3Qgd2l0aCB0aGVpciBuZWlnaGJvcnMuIEZvclxuICAgIC8vIGV4YW1wbGUsIGBcXGNvbG9ye3JlZH17MiArfSAzYCBoYXMgdGhlIHNhbWUgc3BhY2luZyBhcyBgMiArIDNgXG4gICAgcmV0dXJuIG5ldyBidWlsZENvbW1vbi5tYWtlRnJhZ21lbnQoZWxlbWVudHMpO1xufTtcblxuZ3JvdXBUeXBlcy5zdXBzdWIgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucywgcHJldikge1xuICAgIC8vIFN1cGVyc2NyaXB0IGFuZCBzdWJzY3JpcHRzIGFyZSBoYW5kbGVkIGluIHRoZSBUZVhib29rIG9uIHBhZ2VcbiAgICAvLyA0NDUtNDQ2LCBydWxlcyAxOChhLWYpLlxuXG4gICAgLy8gSGVyZSBpcyB3aGVyZSB3ZSBkZWZlciB0byB0aGUgaW5uZXIgZ3JvdXAgaWYgaXQgc2hvdWxkIGhhbmRsZVxuICAgIC8vIHN1cGVyc2NyaXB0cyBhbmQgc3Vic2NyaXB0cyBpdHNlbGYuXG4gICAgaWYgKHNob3VsZEhhbmRsZVN1cFN1Yihncm91cC52YWx1ZS5iYXNlLCBvcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gZ3JvdXBUeXBlc1tncm91cC52YWx1ZS5iYXNlLnR5cGVdKGdyb3VwLCBvcHRpb25zLCBwcmV2KTtcbiAgICB9XG5cbiAgICB2YXIgYmFzZSA9IGJ1aWxkR3JvdXAoZ3JvdXAudmFsdWUuYmFzZSwgb3B0aW9ucy5yZXNldCgpKTtcbiAgICB2YXIgc3VwbWlkO1xuICAgIHZhciBzdWJtaWQ7XG4gICAgdmFyIHN1cDtcbiAgICB2YXIgc3ViO1xuXG4gICAgaWYgKGdyb3VwLnZhbHVlLnN1cCkge1xuICAgICAgICBzdXAgPSBidWlsZEdyb3VwKGdyb3VwLnZhbHVlLnN1cCxcbiAgICAgICAgICAgICAgICBvcHRpb25zLndpdGhTdHlsZShvcHRpb25zLnN0eWxlLnN1cCgpKSk7XG4gICAgICAgIHN1cG1pZCA9IG1ha2VTcGFuKFxuICAgICAgICAgICAgICAgIFtvcHRpb25zLnN0eWxlLnJlc2V0KCksIG9wdGlvbnMuc3R5bGUuc3VwKCkuY2xzKCldLCBbc3VwXSk7XG4gICAgfVxuXG4gICAgaWYgKGdyb3VwLnZhbHVlLnN1Yikge1xuICAgICAgICBzdWIgPSBidWlsZEdyb3VwKGdyb3VwLnZhbHVlLnN1YixcbiAgICAgICAgICAgICAgICBvcHRpb25zLndpdGhTdHlsZShvcHRpb25zLnN0eWxlLnN1YigpKSk7XG4gICAgICAgIHN1Ym1pZCA9IG1ha2VTcGFuKFxuICAgICAgICAgICAgICAgIFtvcHRpb25zLnN0eWxlLnJlc2V0KCksIG9wdGlvbnMuc3R5bGUuc3ViKCkuY2xzKCldLCBbc3ViXSk7XG4gICAgfVxuXG4gICAgLy8gUnVsZSAxOGFcbiAgICB2YXIgc3VwU2hpZnQ7XG4gICAgdmFyIHN1YlNoaWZ0O1xuICAgIGlmIChpc0NoYXJhY3RlckJveChncm91cC52YWx1ZS5iYXNlKSkge1xuICAgICAgICBzdXBTaGlmdCA9IDA7XG4gICAgICAgIHN1YlNoaWZ0ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdXBTaGlmdCA9IGJhc2UuaGVpZ2h0IC0gZm9udE1ldHJpY3MubWV0cmljcy5zdXBEcm9wO1xuICAgICAgICBzdWJTaGlmdCA9IGJhc2UuZGVwdGggKyBmb250TWV0cmljcy5tZXRyaWNzLnN1YkRyb3A7XG4gICAgfVxuXG4gICAgLy8gUnVsZSAxOGNcbiAgICB2YXIgbWluU3VwU2hpZnQ7XG4gICAgaWYgKG9wdGlvbnMuc3R5bGUgPT09IFN0eWxlLkRJU1BMQVkpIHtcbiAgICAgICAgbWluU3VwU2hpZnQgPSBmb250TWV0cmljcy5tZXRyaWNzLnN1cDE7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnN0eWxlLmNyYW1wZWQpIHtcbiAgICAgICAgbWluU3VwU2hpZnQgPSBmb250TWV0cmljcy5tZXRyaWNzLnN1cDM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbWluU3VwU2hpZnQgPSBmb250TWV0cmljcy5tZXRyaWNzLnN1cDI7XG4gICAgfVxuXG4gICAgLy8gc2NyaXB0c3BhY2UgaXMgYSBmb250LXNpemUtaW5kZXBlbmRlbnQgc2l6ZSwgc28gc2NhbGUgaXRcbiAgICAvLyBhcHByb3ByaWF0ZWx5XG4gICAgdmFyIG11bHRpcGxpZXIgPSBTdHlsZS5URVhULnNpemVNdWx0aXBsaWVyICpcbiAgICAgICAgICAgIG9wdGlvbnMuc3R5bGUuc2l6ZU11bHRpcGxpZXI7XG4gICAgdmFyIHNjcmlwdHNwYWNlID1cbiAgICAgICAgKDAuNSAvIGZvbnRNZXRyaWNzLm1ldHJpY3MucHRQZXJFbSkgLyBtdWx0aXBsaWVyICsgXCJlbVwiO1xuXG4gICAgdmFyIHN1cHN1YjtcbiAgICBpZiAoIWdyb3VwLnZhbHVlLnN1cCkge1xuICAgICAgICAvLyBSdWxlIDE4YlxuICAgICAgICBzdWJTaGlmdCA9IE1hdGgubWF4KFxuICAgICAgICAgICAgc3ViU2hpZnQsIGZvbnRNZXRyaWNzLm1ldHJpY3Muc3ViMSxcbiAgICAgICAgICAgIHN1Yi5oZWlnaHQgLSAwLjggKiBmb250TWV0cmljcy5tZXRyaWNzLnhIZWlnaHQpO1xuXG4gICAgICAgIHN1cHN1YiA9IGJ1aWxkQ29tbW9uLm1ha2VWTGlzdChbXG4gICAgICAgICAgICB7dHlwZTogXCJlbGVtXCIsIGVsZW06IHN1Ym1pZH0sXG4gICAgICAgIF0sIFwic2hpZnRcIiwgc3ViU2hpZnQsIG9wdGlvbnMpO1xuXG4gICAgICAgIHN1cHN1Yi5jaGlsZHJlblswXS5zdHlsZS5tYXJnaW5SaWdodCA9IHNjcmlwdHNwYWNlO1xuXG4gICAgICAgIC8vIFN1YnNjcmlwdHMgc2hvdWxkbid0IGJlIHNoaWZ0ZWQgYnkgdGhlIGJhc2UncyBpdGFsaWMgY29ycmVjdGlvbi5cbiAgICAgICAgLy8gQWNjb3VudCBmb3IgdGhhdCBieSBzaGlmdGluZyB0aGUgc3Vic2NyaXB0IGJhY2sgdGhlIGFwcHJvcHJpYXRlXG4gICAgICAgIC8vIGFtb3VudC4gTm90ZSB3ZSBvbmx5IGRvIHRoaXMgd2hlbiB0aGUgYmFzZSBpcyBhIHNpbmdsZSBzeW1ib2wuXG4gICAgICAgIGlmIChiYXNlIGluc3RhbmNlb2YgZG9tVHJlZS5zeW1ib2xOb2RlKSB7XG4gICAgICAgICAgICBzdXBzdWIuY2hpbGRyZW5bMF0uc3R5bGUubWFyZ2luTGVmdCA9IC1iYXNlLml0YWxpYyArIFwiZW1cIjtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWdyb3VwLnZhbHVlLnN1Yikge1xuICAgICAgICAvLyBSdWxlIDE4YywgZFxuICAgICAgICBzdXBTaGlmdCA9IE1hdGgubWF4KHN1cFNoaWZ0LCBtaW5TdXBTaGlmdCxcbiAgICAgICAgICAgIHN1cC5kZXB0aCArIDAuMjUgKiBmb250TWV0cmljcy5tZXRyaWNzLnhIZWlnaHQpO1xuXG4gICAgICAgIHN1cHN1YiA9IGJ1aWxkQ29tbW9uLm1ha2VWTGlzdChbXG4gICAgICAgICAgICB7dHlwZTogXCJlbGVtXCIsIGVsZW06IHN1cG1pZH0sXG4gICAgICAgIF0sIFwic2hpZnRcIiwgLXN1cFNoaWZ0LCBvcHRpb25zKTtcblxuICAgICAgICBzdXBzdWIuY2hpbGRyZW5bMF0uc3R5bGUubWFyZ2luUmlnaHQgPSBzY3JpcHRzcGFjZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdXBTaGlmdCA9IE1hdGgubWF4KFxuICAgICAgICAgICAgc3VwU2hpZnQsIG1pblN1cFNoaWZ0LFxuICAgICAgICAgICAgc3VwLmRlcHRoICsgMC4yNSAqIGZvbnRNZXRyaWNzLm1ldHJpY3MueEhlaWdodCk7XG4gICAgICAgIHN1YlNoaWZ0ID0gTWF0aC5tYXgoc3ViU2hpZnQsIGZvbnRNZXRyaWNzLm1ldHJpY3Muc3ViMik7XG5cbiAgICAgICAgdmFyIHJ1bGVXaWR0aCA9IGZvbnRNZXRyaWNzLm1ldHJpY3MuZGVmYXVsdFJ1bGVUaGlja25lc3M7XG5cbiAgICAgICAgLy8gUnVsZSAxOGVcbiAgICAgICAgaWYgKChzdXBTaGlmdCAtIHN1cC5kZXB0aCkgLSAoc3ViLmhlaWdodCAtIHN1YlNoaWZ0KSA8XG4gICAgICAgICAgICAgICAgNCAqIHJ1bGVXaWR0aCkge1xuICAgICAgICAgICAgc3ViU2hpZnQgPSA0ICogcnVsZVdpZHRoIC0gKHN1cFNoaWZ0IC0gc3VwLmRlcHRoKSArIHN1Yi5oZWlnaHQ7XG4gICAgICAgICAgICB2YXIgcHNpID0gMC44ICogZm9udE1ldHJpY3MubWV0cmljcy54SGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAoc3VwU2hpZnQgLSBzdXAuZGVwdGgpO1xuICAgICAgICAgICAgaWYgKHBzaSA+IDApIHtcbiAgICAgICAgICAgICAgICBzdXBTaGlmdCArPSBwc2k7XG4gICAgICAgICAgICAgICAgc3ViU2hpZnQgLT0gcHNpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3Vwc3ViID0gYnVpbGRDb21tb24ubWFrZVZMaXN0KFtcbiAgICAgICAgICAgIHt0eXBlOiBcImVsZW1cIiwgZWxlbTogc3VibWlkLCBzaGlmdDogc3ViU2hpZnR9LFxuICAgICAgICAgICAge3R5cGU6IFwiZWxlbVwiLCBlbGVtOiBzdXBtaWQsIHNoaWZ0OiAtc3VwU2hpZnR9LFxuICAgICAgICBdLCBcImluZGl2aWR1YWxTaGlmdFwiLCBudWxsLCBvcHRpb25zKTtcblxuICAgICAgICAvLyBTZWUgY29tbWVudCBhYm92ZSBhYm91dCBzdWJzY3JpcHRzIG5vdCBiZWluZyBzaGlmdGVkXG4gICAgICAgIGlmIChiYXNlIGluc3RhbmNlb2YgZG9tVHJlZS5zeW1ib2xOb2RlKSB7XG4gICAgICAgICAgICBzdXBzdWIuY2hpbGRyZW5bMF0uc3R5bGUubWFyZ2luTGVmdCA9IC1iYXNlLml0YWxpYyArIFwiZW1cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cHN1Yi5jaGlsZHJlblswXS5zdHlsZS5tYXJnaW5SaWdodCA9IHNjcmlwdHNwYWNlO1xuICAgICAgICBzdXBzdWIuY2hpbGRyZW5bMV0uc3R5bGUubWFyZ2luUmlnaHQgPSBzY3JpcHRzcGFjZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFrZVNwYW4oW2dldFR5cGVPZkdyb3VwKGdyb3VwLnZhbHVlLmJhc2UpXSxcbiAgICAgICAgW2Jhc2UsIHN1cHN1Yl0pO1xufTtcblxuZ3JvdXBUeXBlcy5nZW5mcmFjID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMsIHByZXYpIHtcbiAgICAvLyBGcmFjdGlvbnMgYXJlIGhhbmRsZWQgaW4gdGhlIFRlWGJvb2sgb24gcGFnZXMgNDQ0LTQ0NSwgcnVsZXMgMTUoYS1lKS5cbiAgICAvLyBGaWd1cmUgb3V0IHdoYXQgc3R5bGUgdGhpcyBmcmFjdGlvbiBzaG91bGQgYmUgaW4gYmFzZWQgb24gdGhlXG4gICAgLy8gZnVuY3Rpb24gdXNlZFxuICAgIHZhciBmc3R5bGUgPSBvcHRpb25zLnN0eWxlO1xuICAgIGlmIChncm91cC52YWx1ZS5zaXplID09PSBcImRpc3BsYXlcIikge1xuICAgICAgICBmc3R5bGUgPSBTdHlsZS5ESVNQTEFZO1xuICAgIH0gZWxzZSBpZiAoZ3JvdXAudmFsdWUuc2l6ZSA9PT0gXCJ0ZXh0XCIpIHtcbiAgICAgICAgZnN0eWxlID0gU3R5bGUuVEVYVDtcbiAgICB9XG5cbiAgICB2YXIgbnN0eWxlID0gZnN0eWxlLmZyYWNOdW0oKTtcbiAgICB2YXIgZHN0eWxlID0gZnN0eWxlLmZyYWNEZW4oKTtcblxuICAgIHZhciBudW1lciA9IGJ1aWxkR3JvdXAoZ3JvdXAudmFsdWUubnVtZXIsIG9wdGlvbnMud2l0aFN0eWxlKG5zdHlsZSkpO1xuICAgIHZhciBudW1lcnJlc2V0ID0gbWFrZVNwYW4oW2ZzdHlsZS5yZXNldCgpLCBuc3R5bGUuY2xzKCldLCBbbnVtZXJdKTtcblxuICAgIHZhciBkZW5vbSA9IGJ1aWxkR3JvdXAoZ3JvdXAudmFsdWUuZGVub20sIG9wdGlvbnMud2l0aFN0eWxlKGRzdHlsZSkpO1xuICAgIHZhciBkZW5vbXJlc2V0ID0gbWFrZVNwYW4oW2ZzdHlsZS5yZXNldCgpLCBkc3R5bGUuY2xzKCldLCBbZGVub21dKTtcblxuICAgIHZhciBydWxlV2lkdGg7XG4gICAgaWYgKGdyb3VwLnZhbHVlLmhhc0JhckxpbmUpIHtcbiAgICAgICAgcnVsZVdpZHRoID0gZm9udE1ldHJpY3MubWV0cmljcy5kZWZhdWx0UnVsZVRoaWNrbmVzcyAvXG4gICAgICAgICAgICBvcHRpb25zLnN0eWxlLnNpemVNdWx0aXBsaWVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJ1bGVXaWR0aCA9IDA7XG4gICAgfVxuXG4gICAgLy8gUnVsZSAxNWJcbiAgICB2YXIgbnVtU2hpZnQ7XG4gICAgdmFyIGNsZWFyYW5jZTtcbiAgICB2YXIgZGVub21TaGlmdDtcbiAgICBpZiAoZnN0eWxlLnNpemUgPT09IFN0eWxlLkRJU1BMQVkuc2l6ZSkge1xuICAgICAgICBudW1TaGlmdCA9IGZvbnRNZXRyaWNzLm1ldHJpY3MubnVtMTtcbiAgICAgICAgaWYgKHJ1bGVXaWR0aCA+IDApIHtcbiAgICAgICAgICAgIGNsZWFyYW5jZSA9IDMgKiBydWxlV2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGVhcmFuY2UgPSA3ICogZm9udE1ldHJpY3MubWV0cmljcy5kZWZhdWx0UnVsZVRoaWNrbmVzcztcbiAgICAgICAgfVxuICAgICAgICBkZW5vbVNoaWZ0ID0gZm9udE1ldHJpY3MubWV0cmljcy5kZW5vbTE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJ1bGVXaWR0aCA+IDApIHtcbiAgICAgICAgICAgIG51bVNoaWZ0ID0gZm9udE1ldHJpY3MubWV0cmljcy5udW0yO1xuICAgICAgICAgICAgY2xlYXJhbmNlID0gcnVsZVdpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbnVtU2hpZnQgPSBmb250TWV0cmljcy5tZXRyaWNzLm51bTM7XG4gICAgICAgICAgICBjbGVhcmFuY2UgPSAzICogZm9udE1ldHJpY3MubWV0cmljcy5kZWZhdWx0UnVsZVRoaWNrbmVzcztcbiAgICAgICAgfVxuICAgICAgICBkZW5vbVNoaWZ0ID0gZm9udE1ldHJpY3MubWV0cmljcy5kZW5vbTI7XG4gICAgfVxuXG4gICAgdmFyIGZyYWM7XG4gICAgaWYgKHJ1bGVXaWR0aCA9PT0gMCkge1xuICAgICAgICAvLyBSdWxlIDE1Y1xuICAgICAgICB2YXIgY2FuZGlhdGVDbGVhcmFuY2UgPVxuICAgICAgICAgICAgKG51bVNoaWZ0IC0gbnVtZXIuZGVwdGgpIC0gKGRlbm9tLmhlaWdodCAtIGRlbm9tU2hpZnQpO1xuICAgICAgICBpZiAoY2FuZGlhdGVDbGVhcmFuY2UgPCBjbGVhcmFuY2UpIHtcbiAgICAgICAgICAgIG51bVNoaWZ0ICs9IDAuNSAqIChjbGVhcmFuY2UgLSBjYW5kaWF0ZUNsZWFyYW5jZSk7XG4gICAgICAgICAgICBkZW5vbVNoaWZ0ICs9IDAuNSAqIChjbGVhcmFuY2UgLSBjYW5kaWF0ZUNsZWFyYW5jZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmcmFjID0gYnVpbGRDb21tb24ubWFrZVZMaXN0KFtcbiAgICAgICAgICAgIHt0eXBlOiBcImVsZW1cIiwgZWxlbTogZGVub21yZXNldCwgc2hpZnQ6IGRlbm9tU2hpZnR9LFxuICAgICAgICAgICAge3R5cGU6IFwiZWxlbVwiLCBlbGVtOiBudW1lcnJlc2V0LCBzaGlmdDogLW51bVNoaWZ0fSxcbiAgICAgICAgXSwgXCJpbmRpdmlkdWFsU2hpZnRcIiwgbnVsbCwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUnVsZSAxNWRcbiAgICAgICAgdmFyIGF4aXNIZWlnaHQgPSBmb250TWV0cmljcy5tZXRyaWNzLmF4aXNIZWlnaHQ7XG5cbiAgICAgICAgaWYgKChudW1TaGlmdCAtIG51bWVyLmRlcHRoKSAtIChheGlzSGVpZ2h0ICsgMC41ICogcnVsZVdpZHRoKSA8XG4gICAgICAgICAgICAgICAgY2xlYXJhbmNlKSB7XG4gICAgICAgICAgICBudW1TaGlmdCArPVxuICAgICAgICAgICAgICAgIGNsZWFyYW5jZSAtICgobnVtU2hpZnQgLSBudW1lci5kZXB0aCkgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYXhpc0hlaWdodCArIDAuNSAqIHJ1bGVXaWR0aCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChheGlzSGVpZ2h0IC0gMC41ICogcnVsZVdpZHRoKSAtIChkZW5vbS5oZWlnaHQgLSBkZW5vbVNoaWZ0KSA8XG4gICAgICAgICAgICAgICAgY2xlYXJhbmNlKSB7XG4gICAgICAgICAgICBkZW5vbVNoaWZ0ICs9XG4gICAgICAgICAgICAgICAgY2xlYXJhbmNlIC0gKChheGlzSGVpZ2h0IC0gMC41ICogcnVsZVdpZHRoKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkZW5vbS5oZWlnaHQgLSBkZW5vbVNoaWZ0KSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWlkID0gbWFrZVNwYW4oXG4gICAgICAgICAgICBbb3B0aW9ucy5zdHlsZS5yZXNldCgpLCBTdHlsZS5URVhULmNscygpLCBcImZyYWMtbGluZVwiXSk7XG4gICAgICAgIC8vIE1hbnVhbGx5IHNldCB0aGUgaGVpZ2h0IG9mIHRoZSBsaW5lIGJlY2F1c2UgaXRzIGhlaWdodCBpc1xuICAgICAgICAvLyBjcmVhdGVkIGluIENTU1xuICAgICAgICBtaWQuaGVpZ2h0ID0gcnVsZVdpZHRoO1xuXG4gICAgICAgIHZhciBtaWRTaGlmdCA9IC0oYXhpc0hlaWdodCAtIDAuNSAqIHJ1bGVXaWR0aCk7XG5cbiAgICAgICAgZnJhYyA9IGJ1aWxkQ29tbW9uLm1ha2VWTGlzdChbXG4gICAgICAgICAgICB7dHlwZTogXCJlbGVtXCIsIGVsZW06IGRlbm9tcmVzZXQsIHNoaWZ0OiBkZW5vbVNoaWZ0fSxcbiAgICAgICAgICAgIHt0eXBlOiBcImVsZW1cIiwgZWxlbTogbWlkLCAgICAgICAgc2hpZnQ6IG1pZFNoaWZ0fSxcbiAgICAgICAgICAgIHt0eXBlOiBcImVsZW1cIiwgZWxlbTogbnVtZXJyZXNldCwgc2hpZnQ6IC1udW1TaGlmdH0sXG4gICAgICAgIF0sIFwiaW5kaXZpZHVhbFNoaWZ0XCIsIG51bGwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIFNpbmNlIHdlIG1hbnVhbGx5IGNoYW5nZSB0aGUgc3R5bGUgc29tZXRpbWVzICh3aXRoIFxcZGZyYWMgb3IgXFx0ZnJhYyksXG4gICAgLy8gYWNjb3VudCBmb3IgdGhlIHBvc3NpYmxlIHNpemUgY2hhbmdlIGhlcmUuXG4gICAgZnJhYy5oZWlnaHQgKj0gZnN0eWxlLnNpemVNdWx0aXBsaWVyIC8gb3B0aW9ucy5zdHlsZS5zaXplTXVsdGlwbGllcjtcbiAgICBmcmFjLmRlcHRoICo9IGZzdHlsZS5zaXplTXVsdGlwbGllciAvIG9wdGlvbnMuc3R5bGUuc2l6ZU11bHRpcGxpZXI7XG5cbiAgICAvLyBSdWxlIDE1ZVxuICAgIHZhciBkZWxpbVNpemU7XG4gICAgaWYgKGZzdHlsZS5zaXplID09PSBTdHlsZS5ESVNQTEFZLnNpemUpIHtcbiAgICAgICAgZGVsaW1TaXplID0gZm9udE1ldHJpY3MubWV0cmljcy5kZWxpbTE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGVsaW1TaXplID0gZm9udE1ldHJpY3MubWV0cmljcy5nZXREZWxpbTIoZnN0eWxlKTtcbiAgICB9XG5cbiAgICB2YXIgbGVmdERlbGltO1xuICAgIHZhciByaWdodERlbGltO1xuICAgIGlmIChncm91cC52YWx1ZS5sZWZ0RGVsaW0gPT0gbnVsbCkge1xuICAgICAgICBsZWZ0RGVsaW0gPSBtYWtlTnVsbERlbGltaXRlcihvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZWZ0RGVsaW0gPSBkZWxpbWl0ZXIuY3VzdG9tU2l6ZWREZWxpbShcbiAgICAgICAgICAgIGdyb3VwLnZhbHVlLmxlZnREZWxpbSwgZGVsaW1TaXplLCB0cnVlLFxuICAgICAgICAgICAgb3B0aW9ucy53aXRoU3R5bGUoZnN0eWxlKSwgZ3JvdXAubW9kZSk7XG4gICAgfVxuICAgIGlmIChncm91cC52YWx1ZS5yaWdodERlbGltID09IG51bGwpIHtcbiAgICAgICAgcmlnaHREZWxpbSA9IG1ha2VOdWxsRGVsaW1pdGVyKG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJpZ2h0RGVsaW0gPSBkZWxpbWl0ZXIuY3VzdG9tU2l6ZWREZWxpbShcbiAgICAgICAgICAgIGdyb3VwLnZhbHVlLnJpZ2h0RGVsaW0sIGRlbGltU2l6ZSwgdHJ1ZSxcbiAgICAgICAgICAgIG9wdGlvbnMud2l0aFN0eWxlKGZzdHlsZSksIGdyb3VwLm1vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBtYWtlU3BhbihcbiAgICAgICAgW1wibW9yZFwiLCBvcHRpb25zLnN0eWxlLnJlc2V0KCksIGZzdHlsZS5jbHMoKV0sXG4gICAgICAgIFtsZWZ0RGVsaW0sIG1ha2VTcGFuKFtcIm1mcmFjXCJdLCBbZnJhY10pLCByaWdodERlbGltXSxcbiAgICAgICAgb3B0aW9ucy5nZXRDb2xvcigpKTtcbn07XG5cbmdyb3VwVHlwZXMuYXJyYXkgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucywgcHJldikge1xuICAgIHZhciByO1xuICAgIHZhciBjO1xuICAgIHZhciBuciA9IGdyb3VwLnZhbHVlLmJvZHkubGVuZ3RoO1xuICAgIHZhciBuYyA9IDA7XG4gICAgdmFyIGJvZHkgPSBuZXcgQXJyYXkobnIpO1xuXG4gICAgLy8gSG9yaXpvbnRhbCBzcGFjaW5nXG4gICAgdmFyIHB0ID0gMSAvIGZvbnRNZXRyaWNzLm1ldHJpY3MucHRQZXJFbTtcbiAgICB2YXIgYXJyYXljb2xzZXAgPSA1ICogcHQ7IC8vIFxcYXJyYXljb2xzZXAgaW4gYXJ0aWNsZS5jbHNcblxuICAgIC8vIFZlcnRpY2FsIHNwYWNpbmdcbiAgICB2YXIgYmFzZWxpbmVza2lwID0gMTIgKiBwdDsgLy8gc2VlIHNpemUxMC5jbG9cbiAgICAvLyBEZWZhdWx0IFxcYXJyYXlzdHJldGNoIGZyb20gbHR0YWIuZHR4XG4gICAgLy8gVE9ETyhnYWdlcm4pOiBtYXkgZ2V0IHJlZGVmaW5lZCBvbmNlIHdlIGhhdmUgdXNlci1kZWZpbmVkIG1hY3Jvc1xuICAgIHZhciBhcnJheXN0cmV0Y2ggPSB1dGlscy5kZWZsdChncm91cC52YWx1ZS5hcnJheXN0cmV0Y2gsIDEpO1xuICAgIHZhciBhcnJheXNraXAgPSBhcnJheXN0cmV0Y2ggKiBiYXNlbGluZXNraXA7XG4gICAgdmFyIGFyc3RydXRIZWlnaHQgPSAwLjcgKiBhcnJheXNraXA7IC8vIFxcc3RydXRib3ggaW4gbHRmc3N0cmMuZHR4IGFuZFxuICAgIHZhciBhcnN0cnV0RGVwdGggPSAwLjMgKiBhcnJheXNraXA7ICAvLyBcXEBhcnN0cnV0Ym94IGluIGx0dGFiLmR0eFxuXG4gICAgdmFyIHRvdGFsSGVpZ2h0ID0gMDtcbiAgICBmb3IgKHIgPSAwOyByIDwgZ3JvdXAudmFsdWUuYm9keS5sZW5ndGg7ICsrcikge1xuICAgICAgICB2YXIgaW5yb3cgPSBncm91cC52YWx1ZS5ib2R5W3JdO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gYXJzdHJ1dEhlaWdodDsgLy8gXFxAYXJyYXkgYWRkcyBhbiBcXEBhcnN0cnV0XG4gICAgICAgIHZhciBkZXB0aCA9IGFyc3RydXREZXB0aDsgICAvLyB0byBlYWNoIHRvdyAodmlhIHRoZSB0ZW1wbGF0ZSlcblxuICAgICAgICBpZiAobmMgPCBpbnJvdy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5jID0gaW5yb3cubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG91dHJvdyA9IG5ldyBBcnJheShpbnJvdy5sZW5ndGgpO1xuICAgICAgICBmb3IgKGMgPSAwOyBjIDwgaW5yb3cubGVuZ3RoOyArK2MpIHtcbiAgICAgICAgICAgIHZhciBlbHQgPSBidWlsZEdyb3VwKGlucm93W2NdLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChkZXB0aCA8IGVsdC5kZXB0aCkge1xuICAgICAgICAgICAgICAgIGRlcHRoID0gZWx0LmRlcHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhlaWdodCA8IGVsdC5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBlbHQuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0cm93W2NdID0gZWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGdhcCA9IDA7XG4gICAgICAgIGlmIChncm91cC52YWx1ZS5yb3dHYXBzW3JdKSB7XG4gICAgICAgICAgICBnYXAgPSBncm91cC52YWx1ZS5yb3dHYXBzW3JdLnZhbHVlO1xuICAgICAgICAgICAgc3dpdGNoIChnYXAudW5pdCkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJlbVwiOlxuICAgICAgICAgICAgICAgICAgICBnYXAgPSBnYXAubnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZXhcIjpcbiAgICAgICAgICAgICAgICAgICAgZ2FwID0gZ2FwLm51bWJlciAqIGZvbnRNZXRyaWNzLm1ldHJpY3MuZW1QZXJFeDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbid0IGhhbmRsZSB1bml0IFwiICsgZ2FwLnVuaXQpO1xuICAgICAgICAgICAgICAgICAgICBnYXAgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdhcCA+IDApIHsgLy8gXFxAYXJnYXJyYXljclxuICAgICAgICAgICAgICAgIGdhcCArPSBhcnN0cnV0RGVwdGg7XG4gICAgICAgICAgICAgICAgaWYgKGRlcHRoIDwgZ2FwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlcHRoID0gZ2FwOyAvLyBcXEB4YXJnYXJyYXljclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBnYXAgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb3V0cm93LmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgb3V0cm93LmRlcHRoID0gZGVwdGg7XG4gICAgICAgIHRvdGFsSGVpZ2h0ICs9IGhlaWdodDtcbiAgICAgICAgb3V0cm93LnBvcyA9IHRvdGFsSGVpZ2h0O1xuICAgICAgICB0b3RhbEhlaWdodCArPSBkZXB0aCArIGdhcDsgLy8gXFxAeWFyZ2FycmF5Y3JcbiAgICAgICAgYm9keVtyXSA9IG91dHJvdztcbiAgICB9XG5cbiAgICB2YXIgb2Zmc2V0ID0gdG90YWxIZWlnaHQgLyAyICsgZm9udE1ldHJpY3MubWV0cmljcy5heGlzSGVpZ2h0O1xuICAgIHZhciBjb2xEZXNjcmlwdGlvbnMgPSBncm91cC52YWx1ZS5jb2xzIHx8IFtdO1xuICAgIHZhciBjb2xzID0gW107XG4gICAgdmFyIGNvbFNlcDtcbiAgICB2YXIgY29sRGVzY3JOdW07XG4gICAgZm9yIChjID0gMCwgY29sRGVzY3JOdW0gPSAwO1xuICAgICAgICAgLy8gQ29udGludWUgd2hpbGUgZWl0aGVyIHRoZXJlIGFyZSBtb3JlIGNvbHVtbnMgb3IgbW9yZSBjb2x1bW5cbiAgICAgICAgIC8vIGRlc2NyaXB0aW9ucywgc28gdHJhaWxpbmcgc2VwYXJhdG9ycyBkb24ndCBnZXQgbG9zdC5cbiAgICAgICAgIGMgPCBuYyB8fCBjb2xEZXNjck51bSA8IGNvbERlc2NyaXB0aW9ucy5sZW5ndGg7XG4gICAgICAgICArK2MsICsrY29sRGVzY3JOdW0pIHtcblxuICAgICAgICB2YXIgY29sRGVzY3IgPSBjb2xEZXNjcmlwdGlvbnNbY29sRGVzY3JOdW1dIHx8IHt9O1xuXG4gICAgICAgIHZhciBmaXJzdFNlcGFyYXRvciA9IHRydWU7XG4gICAgICAgIHdoaWxlIChjb2xEZXNjci50eXBlID09PSBcInNlcGFyYXRvclwiKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBtb3JlIHRoYW4gb25lIHNlcGFyYXRvciBpbiBhIHJvdywgYWRkIGEgc3BhY2VcbiAgICAgICAgICAgIC8vIGJldHdlZW4gdGhlbS5cbiAgICAgICAgICAgIGlmICghZmlyc3RTZXBhcmF0b3IpIHtcbiAgICAgICAgICAgICAgICBjb2xTZXAgPSBtYWtlU3BhbihbXCJhcnJheWNvbHNlcFwiXSwgW10pO1xuICAgICAgICAgICAgICAgIGNvbFNlcC5zdHlsZS53aWR0aCA9XG4gICAgICAgICAgICAgICAgICAgIGZvbnRNZXRyaWNzLm1ldHJpY3MuZG91YmxlUnVsZVNlcCArIFwiZW1cIjtcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2goY29sU2VwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvbERlc2NyLnNlcGFyYXRvciA9PT0gXCJ8XCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VwYXJhdG9yID0gbWFrZVNwYW4oXG4gICAgICAgICAgICAgICAgICAgIFtcInZlcnRpY2FsLXNlcGFyYXRvclwiXSxcbiAgICAgICAgICAgICAgICAgICAgW10pO1xuICAgICAgICAgICAgICAgIHNlcGFyYXRvci5zdHlsZS5oZWlnaHQgPSB0b3RhbEhlaWdodCArIFwiZW1cIjtcbiAgICAgICAgICAgICAgICBzZXBhcmF0b3Iuc3R5bGUudmVydGljYWxBbGlnbiA9XG4gICAgICAgICAgICAgICAgICAgIC0odG90YWxIZWlnaHQgLSBvZmZzZXQpICsgXCJlbVwiO1xuXG4gICAgICAgICAgICAgICAgY29scy5wdXNoKHNlcGFyYXRvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUVycm9yKFxuICAgICAgICAgICAgICAgICAgICBcIkludmFsaWQgc2VwYXJhdG9yIHR5cGU6IFwiICsgY29sRGVzY3Iuc2VwYXJhdG9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29sRGVzY3JOdW0rKztcbiAgICAgICAgICAgIGNvbERlc2NyID0gY29sRGVzY3JpcHRpb25zW2NvbERlc2NyTnVtXSB8fCB7fTtcbiAgICAgICAgICAgIGZpcnN0U2VwYXJhdG9yID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA+PSBuYykge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2Vwd2lkdGg7XG4gICAgICAgIGlmIChjID4gMCB8fCBncm91cC52YWx1ZS5oc2tpcEJlZm9yZUFuZEFmdGVyKSB7XG4gICAgICAgICAgICBzZXB3aWR0aCA9IHV0aWxzLmRlZmx0KGNvbERlc2NyLnByZWdhcCwgYXJyYXljb2xzZXApO1xuICAgICAgICAgICAgaWYgKHNlcHdpZHRoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29sU2VwID0gbWFrZVNwYW4oW1wiYXJyYXljb2xzZXBcIl0sIFtdKTtcbiAgICAgICAgICAgICAgICBjb2xTZXAuc3R5bGUud2lkdGggPSBzZXB3aWR0aCArIFwiZW1cIjtcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2goY29sU2VwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb2wgPSBbXTtcbiAgICAgICAgZm9yIChyID0gMDsgciA8IG5yOyArK3IpIHtcbiAgICAgICAgICAgIHZhciByb3cgPSBib2R5W3JdO1xuICAgICAgICAgICAgdmFyIGVsZW0gPSByb3dbY107XG4gICAgICAgICAgICBpZiAoIWVsZW0pIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzaGlmdCA9IHJvdy5wb3MgLSBvZmZzZXQ7XG4gICAgICAgICAgICBlbGVtLmRlcHRoID0gcm93LmRlcHRoO1xuICAgICAgICAgICAgZWxlbS5oZWlnaHQgPSByb3cuaGVpZ2h0O1xuICAgICAgICAgICAgY29sLnB1c2goe3R5cGU6IFwiZWxlbVwiLCBlbGVtOiBlbGVtLCBzaGlmdDogc2hpZnR9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbCA9IGJ1aWxkQ29tbW9uLm1ha2VWTGlzdChjb2wsIFwiaW5kaXZpZHVhbFNoaWZ0XCIsIG51bGwsIG9wdGlvbnMpO1xuICAgICAgICBjb2wgPSBtYWtlU3BhbihcbiAgICAgICAgICAgIFtcImNvbC1hbGlnbi1cIiArIChjb2xEZXNjci5hbGlnbiB8fCBcImNcIildLFxuICAgICAgICAgICAgW2NvbF0pO1xuICAgICAgICBjb2xzLnB1c2goY29sKTtcblxuICAgICAgICBpZiAoYyA8IG5jIC0gMSB8fCBncm91cC52YWx1ZS5oc2tpcEJlZm9yZUFuZEFmdGVyKSB7XG4gICAgICAgICAgICBzZXB3aWR0aCA9IHV0aWxzLmRlZmx0KGNvbERlc2NyLnBvc3RnYXAsIGFycmF5Y29sc2VwKTtcbiAgICAgICAgICAgIGlmIChzZXB3aWR0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbFNlcCA9IG1ha2VTcGFuKFtcImFycmF5Y29sc2VwXCJdLCBbXSk7XG4gICAgICAgICAgICAgICAgY29sU2VwLnN0eWxlLndpZHRoID0gc2Vwd2lkdGggKyBcImVtXCI7XG4gICAgICAgICAgICAgICAgY29scy5wdXNoKGNvbFNlcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgYm9keSA9IG1ha2VTcGFuKFtcIm10YWJsZVwiXSwgY29scyk7XG4gICAgcmV0dXJuIG1ha2VTcGFuKFtcIm1vcmRcIl0sIFtib2R5XSwgb3B0aW9ucy5nZXRDb2xvcigpKTtcbn07XG5cbmdyb3VwVHlwZXMuc3BhY2luZyA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zLCBwcmV2KSB7XG4gICAgaWYgKGdyb3VwLnZhbHVlID09PSBcIlxcXFwgXCIgfHwgZ3JvdXAudmFsdWUgPT09IFwiXFxcXHNwYWNlXCIgfHxcbiAgICAgICAgZ3JvdXAudmFsdWUgPT09IFwiIFwiIHx8IGdyb3VwLnZhbHVlID09PSBcIn5cIikge1xuICAgICAgICAvLyBTcGFjZXMgYXJlIGdlbmVyYXRlZCBieSBhZGRpbmcgYW4gYWN0dWFsIHNwYWNlLiBFYWNoIG9mIHRoZXNlXG4gICAgICAgIC8vIHRoaW5ncyBoYXMgYW4gZW50cnkgaW4gdGhlIHN5bWJvbHMgdGFibGUsIHNvIHRoZXNlIHdpbGwgYmUgdHVybmVkXG4gICAgICAgIC8vIGludG8gYXBwcm9wcmlhdGUgb3V0cHV0cy5cbiAgICAgICAgcmV0dXJuIG1ha2VTcGFuKFxuICAgICAgICAgICAgW1wibW9yZFwiLCBcIm1zcGFjZVwiXSxcbiAgICAgICAgICAgIFtidWlsZENvbW1vbi5tYXRoc3ltKGdyb3VwLnZhbHVlLCBncm91cC5tb2RlKV1cbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPdGhlciBraW5kcyBvZiBzcGFjZXMgYXJlIG9mIGFyYml0cmFyeSB3aWR0aC4gV2UgdXNlIENTUyB0b1xuICAgICAgICAvLyBnZW5lcmF0ZSB0aGVzZS5cbiAgICAgICAgcmV0dXJuIG1ha2VTcGFuKFxuICAgICAgICAgICAgW1wibW9yZFwiLCBcIm1zcGFjZVwiLFxuICAgICAgICAgICAgIGJ1aWxkQ29tbW9uLnNwYWNpbmdGdW5jdGlvbnNbZ3JvdXAudmFsdWVdLmNsYXNzTmFtZV0pO1xuICAgIH1cbn07XG5cbmdyb3VwVHlwZXMubGxhcCA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zLCBwcmV2KSB7XG4gICAgdmFyIGlubmVyID0gbWFrZVNwYW4oXG4gICAgICAgIFtcImlubmVyXCJdLCBbYnVpbGRHcm91cChncm91cC52YWx1ZS5ib2R5LCBvcHRpb25zLnJlc2V0KCkpXSk7XG4gICAgdmFyIGZpeCA9IG1ha2VTcGFuKFtcImZpeFwiXSwgW10pO1xuICAgIHJldHVybiBtYWtlU3BhbihcbiAgICAgICAgW1wibGxhcFwiLCBvcHRpb25zLnN0eWxlLmNscygpXSwgW2lubmVyLCBmaXhdKTtcbn07XG5cbmdyb3VwVHlwZXMucmxhcCA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zLCBwcmV2KSB7XG4gICAgdmFyIGlubmVyID0gbWFrZVNwYW4oXG4gICAgICAgIFtcImlubmVyXCJdLCBbYnVpbGRHcm91cChncm91cC52YWx1ZS5ib2R5LCBvcHRpb25zLnJlc2V0KCkpXSk7XG4gICAgdmFyIGZpeCA9IG1ha2VTcGFuKFtcImZpeFwiXSwgW10pO1xuICAgIHJldHVybiBtYWtlU3BhbihcbiAgICAgICAgW1wicmxhcFwiLCBvcHRpb25zLnN0eWxlLmNscygpXSwgW2lubmVyLCBmaXhdKTtcbn07XG5cbmdyb3VwVHlwZXMub3AgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucywgcHJldikge1xuICAgIC8vIE9wZXJhdG9ycyBhcmUgaGFuZGxlZCBpbiB0aGUgVGVYYm9vayBwZy4gNDQzLTQ0NCwgcnVsZSAxMyhhKS5cbiAgICB2YXIgc3VwR3JvdXA7XG4gICAgdmFyIHN1Ykdyb3VwO1xuICAgIHZhciBoYXNMaW1pdHMgPSBmYWxzZTtcbiAgICBpZiAoZ3JvdXAudHlwZSA9PT0gXCJzdXBzdWJcIiApIHtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBsaW1pdHMsIHN1cHN1YiB3aWxsIHBhc3MgdXMgaXRzIGdyb3VwIHRvIGhhbmRsZS4gUHVsbFxuICAgICAgICAvLyBvdXQgdGhlIHN1cGVyc2NyaXB0IGFuZCBzdWJzY3JpcHQgYW5kIHNldCB0aGUgZ3JvdXAgdG8gdGhlIG9wIGluXG4gICAgICAgIC8vIGl0cyBiYXNlLlxuICAgICAgICBzdXBHcm91cCA9IGdyb3VwLnZhbHVlLnN1cDtcbiAgICAgICAgc3ViR3JvdXAgPSBncm91cC52YWx1ZS5zdWI7XG4gICAgICAgIGdyb3VwID0gZ3JvdXAudmFsdWUuYmFzZTtcbiAgICAgICAgaGFzTGltaXRzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBNb3N0IG9wZXJhdG9ycyBoYXZlIGEgbGFyZ2Ugc3VjY2Vzc29yIHN5bWJvbCwgYnV0IHRoZXNlIGRvbid0LlxuICAgIHZhciBub1N1Y2Nlc3NvciA9IFtcbiAgICAgICAgXCJcXFxcc21hbGxpbnRcIixcbiAgICBdO1xuXG4gICAgdmFyIGxhcmdlID0gZmFsc2U7XG4gICAgaWYgKG9wdGlvbnMuc3R5bGUuc2l6ZSA9PT0gU3R5bGUuRElTUExBWS5zaXplICYmXG4gICAgICAgIGdyb3VwLnZhbHVlLnN5bWJvbCAmJlxuICAgICAgICAhdXRpbHMuY29udGFpbnMobm9TdWNjZXNzb3IsIGdyb3VwLnZhbHVlLmJvZHkpKSB7XG5cbiAgICAgICAgLy8gTW9zdCBzeW1ib2wgb3BlcmF0b3JzIGdldCBsYXJnZXIgaW4gZGlzcGxheXN0eWxlIChydWxlIDEzKVxuICAgICAgICBsYXJnZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGJhc2U7XG4gICAgdmFyIGJhc2VTaGlmdCA9IDA7XG4gICAgdmFyIHNsYW50ID0gMDtcbiAgICBpZiAoZ3JvdXAudmFsdWUuc3ltYm9sKSB7XG4gICAgICAgIC8vIElmIHRoaXMgaXMgYSBzeW1ib2wsIGNyZWF0ZSB0aGUgc3ltYm9sLlxuICAgICAgICB2YXIgc3R5bGUgPSBsYXJnZSA/IFwiU2l6ZTItUmVndWxhclwiIDogXCJTaXplMS1SZWd1bGFyXCI7XG4gICAgICAgIGJhc2UgPSBidWlsZENvbW1vbi5tYWtlU3ltYm9sKFxuICAgICAgICAgICAgZ3JvdXAudmFsdWUuYm9keSwgc3R5bGUsIFwibWF0aFwiLCBvcHRpb25zLmdldENvbG9yKCksXG4gICAgICAgICAgICBbXCJvcC1zeW1ib2xcIiwgbGFyZ2UgPyBcImxhcmdlLW9wXCIgOiBcInNtYWxsLW9wXCIsIFwibW9wXCJdKTtcblxuICAgICAgICAvLyBTaGlmdCB0aGUgc3ltYm9sIHNvIGl0cyBjZW50ZXIgbGllcyBvbiB0aGUgYXhpcyAocnVsZSAxMykuIEl0XG4gICAgICAgIC8vIGFwcGVhcnMgdGhhdCBvdXIgZm9udHMgaGF2ZSB0aGUgY2VudGVycyBvZiB0aGUgc3ltYm9scyBhbHJlYWR5XG4gICAgICAgIC8vIGFsbW9zdCBvbiB0aGUgYXhpcywgc28gdGhlc2UgbnVtYmVycyBhcmUgdmVyeSBzbWFsbC4gTm90ZSB3ZVxuICAgICAgICAvLyBkb24ndCBhY3R1YWxseSBhcHBseSB0aGlzIGhlcmUsIGJ1dCBpbnN0ZWFkIGl0IGlzIHVzZWQgZWl0aGVyIGluXG4gICAgICAgIC8vIHRoZSB2bGlzdCBjcmVhdGlvbiBvciBzZXBhcmF0ZWx5IHdoZW4gdGhlcmUgYXJlIG5vIGxpbWl0cy5cbiAgICAgICAgYmFzZVNoaWZ0ID0gKGJhc2UuaGVpZ2h0IC0gYmFzZS5kZXB0aCkgLyAyIC1cbiAgICAgICAgICAgIGZvbnRNZXRyaWNzLm1ldHJpY3MuYXhpc0hlaWdodCAqXG4gICAgICAgICAgICBvcHRpb25zLnN0eWxlLnNpemVNdWx0aXBsaWVyO1xuXG4gICAgICAgIC8vIFRoZSBzbGFudCBvZiB0aGUgc3ltYm9sIGlzIGp1c3QgaXRzIGl0YWxpYyBjb3JyZWN0aW9uLlxuICAgICAgICBzbGFudCA9IGJhc2UuaXRhbGljO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE90aGVyd2lzZSwgdGhpcyBpcyBhIHRleHQgb3BlcmF0b3IuIEJ1aWxkIHRoZSB0ZXh0IGZyb20gdGhlXG4gICAgICAgIC8vIG9wZXJhdG9yJ3MgbmFtZS5cbiAgICAgICAgLy8gVE9ETyhlbWlseSk6IEFkZCBhIHNwYWNlIGluIHRoZSBtaWRkbGUgb2Ygc29tZSBvZiB0aGVzZVxuICAgICAgICAvLyBvcGVyYXRvcnMsIGxpa2UgXFxsaW1zdXBcbiAgICAgICAgdmFyIG91dHB1dCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGdyb3VwLnZhbHVlLmJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGJ1aWxkQ29tbW9uLm1hdGhzeW0oZ3JvdXAudmFsdWUuYm9keVtpXSwgZ3JvdXAubW9kZSkpO1xuICAgICAgICB9XG4gICAgICAgIGJhc2UgPSBtYWtlU3BhbihbXCJtb3BcIl0sIG91dHB1dCwgb3B0aW9ucy5nZXRDb2xvcigpKTtcbiAgICB9XG5cbiAgICBpZiAoaGFzTGltaXRzKSB7XG4gICAgICAgIC8vIElFIDggY2xpcHMgXFxpbnQgaWYgaXQgaXMgaW4gYSBkaXNwbGF5OiBpbmxpbmUtYmxvY2suIFdlIHdyYXAgaXRcbiAgICAgICAgLy8gaW4gYSBuZXcgc3BhbiBzbyBpdCBpcyBhbiBpbmxpbmUsIGFuZCB3b3Jrcy5cbiAgICAgICAgYmFzZSA9IG1ha2VTcGFuKFtdLCBbYmFzZV0pO1xuXG4gICAgICAgIHZhciBzdXBtaWQ7XG4gICAgICAgIHZhciBzdXBLZXJuO1xuICAgICAgICB2YXIgc3VibWlkO1xuICAgICAgICB2YXIgc3ViS2VybjtcbiAgICAgICAgLy8gV2UgbWFudWFsbHkgaGF2ZSB0byBoYW5kbGUgdGhlIHN1cGVyc2NyaXB0cyBhbmQgc3Vic2NyaXB0cy4gVGhpcyxcbiAgICAgICAgLy8gYXNpZGUgZnJvbSB0aGUga2VybiBjYWxjdWxhdGlvbnMsIGlzIGNvcGllZCBmcm9tIHN1cHN1Yi5cbiAgICAgICAgaWYgKHN1cEdyb3VwKSB7XG4gICAgICAgICAgICB2YXIgc3VwID0gYnVpbGRHcm91cChcbiAgICAgICAgICAgICAgICBzdXBHcm91cCwgb3B0aW9ucy53aXRoU3R5bGUob3B0aW9ucy5zdHlsZS5zdXAoKSkpO1xuICAgICAgICAgICAgc3VwbWlkID0gbWFrZVNwYW4oXG4gICAgICAgICAgICAgICAgW29wdGlvbnMuc3R5bGUucmVzZXQoKSwgb3B0aW9ucy5zdHlsZS5zdXAoKS5jbHMoKV0sIFtzdXBdKTtcblxuICAgICAgICAgICAgc3VwS2VybiA9IE1hdGgubWF4KFxuICAgICAgICAgICAgICAgIGZvbnRNZXRyaWNzLm1ldHJpY3MuYmlnT3BTcGFjaW5nMSxcbiAgICAgICAgICAgICAgICBmb250TWV0cmljcy5tZXRyaWNzLmJpZ09wU3BhY2luZzMgLSBzdXAuZGVwdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN1Ykdyb3VwKSB7XG4gICAgICAgICAgICB2YXIgc3ViID0gYnVpbGRHcm91cChcbiAgICAgICAgICAgICAgICBzdWJHcm91cCwgb3B0aW9ucy53aXRoU3R5bGUob3B0aW9ucy5zdHlsZS5zdWIoKSkpO1xuICAgICAgICAgICAgc3VibWlkID0gbWFrZVNwYW4oXG4gICAgICAgICAgICAgICAgW29wdGlvbnMuc3R5bGUucmVzZXQoKSwgb3B0aW9ucy5zdHlsZS5zdWIoKS5jbHMoKV0sXG4gICAgICAgICAgICAgICAgW3N1Yl0pO1xuXG4gICAgICAgICAgICBzdWJLZXJuID0gTWF0aC5tYXgoXG4gICAgICAgICAgICAgICAgZm9udE1ldHJpY3MubWV0cmljcy5iaWdPcFNwYWNpbmcyLFxuICAgICAgICAgICAgICAgIGZvbnRNZXRyaWNzLm1ldHJpY3MuYmlnT3BTcGFjaW5nNCAtIHN1Yi5oZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQnVpbGQgdGhlIGZpbmFsIGdyb3VwIGFzIGEgdmxpc3Qgb2YgdGhlIHBvc3NpYmxlIHN1YnNjcmlwdCwgYmFzZSxcbiAgICAgICAgLy8gYW5kIHBvc3NpYmxlIHN1cGVyc2NyaXB0LlxuICAgICAgICB2YXIgZmluYWxHcm91cDtcbiAgICAgICAgdmFyIHRvcDtcbiAgICAgICAgdmFyIGJvdHRvbTtcbiAgICAgICAgaWYgKCFzdXBHcm91cCkge1xuICAgICAgICAgICAgdG9wID0gYmFzZS5oZWlnaHQgLSBiYXNlU2hpZnQ7XG5cbiAgICAgICAgICAgIGZpbmFsR3JvdXAgPSBidWlsZENvbW1vbi5tYWtlVkxpc3QoW1xuICAgICAgICAgICAgICAgIHt0eXBlOiBcImtlcm5cIiwgc2l6ZTogZm9udE1ldHJpY3MubWV0cmljcy5iaWdPcFNwYWNpbmc1fSxcbiAgICAgICAgICAgICAgICB7dHlwZTogXCJlbGVtXCIsIGVsZW06IHN1Ym1pZH0sXG4gICAgICAgICAgICAgICAge3R5cGU6IFwia2VyblwiLCBzaXplOiBzdWJLZXJufSxcbiAgICAgICAgICAgICAgICB7dHlwZTogXCJlbGVtXCIsIGVsZW06IGJhc2V9LFxuICAgICAgICAgICAgXSwgXCJ0b3BcIiwgdG9wLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgLy8gSGVyZSwgd2Ugc2hpZnQgdGhlIGxpbWl0cyBieSB0aGUgc2xhbnQgb2YgdGhlIHN5bWJvbC4gTm90ZVxuICAgICAgICAgICAgLy8gdGhhdCB3ZSBhcmUgc3VwcG9zZWQgdG8gc2hpZnQgdGhlIGxpbWl0cyBieSAxLzIgb2YgdGhlIHNsYW50LFxuICAgICAgICAgICAgLy8gYnV0IHNpbmNlIHdlIGFyZSBjZW50ZXJpbmcgdGhlIGxpbWl0cyBhZGRpbmcgYSBmdWxsIHNsYW50IG9mXG4gICAgICAgICAgICAvLyBtYXJnaW4gd2lsbCBzaGlmdCBieSAxLzIgdGhhdC5cbiAgICAgICAgICAgIGZpbmFsR3JvdXAuY2hpbGRyZW5bMF0uc3R5bGUubWFyZ2luTGVmdCA9IC1zbGFudCArIFwiZW1cIjtcbiAgICAgICAgfSBlbHNlIGlmICghc3ViR3JvdXApIHtcbiAgICAgICAgICAgIGJvdHRvbSA9IGJhc2UuZGVwdGggKyBiYXNlU2hpZnQ7XG5cbiAgICAgICAgICAgIGZpbmFsR3JvdXAgPSBidWlsZENvbW1vbi5tYWtlVkxpc3QoW1xuICAgICAgICAgICAgICAgIHt0eXBlOiBcImVsZW1cIiwgZWxlbTogYmFzZX0sXG4gICAgICAgICAgICAgICAge3R5cGU6IFwia2VyblwiLCBzaXplOiBzdXBLZXJufSxcbiAgICAgICAgICAgICAgICB7dHlwZTogXCJlbGVtXCIsIGVsZW06IHN1cG1pZH0sXG4gICAgICAgICAgICAgICAge3R5cGU6IFwia2VyblwiLCBzaXplOiBmb250TWV0cmljcy5tZXRyaWNzLmJpZ09wU3BhY2luZzV9LFxuICAgICAgICAgICAgXSwgXCJib3R0b21cIiwgYm90dG9tLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgLy8gU2VlIGNvbW1lbnQgYWJvdmUgYWJvdXQgc2xhbnRzXG4gICAgICAgICAgICBmaW5hbEdyb3VwLmNoaWxkcmVuWzFdLnN0eWxlLm1hcmdpbkxlZnQgPSBzbGFudCArIFwiZW1cIjtcbiAgICAgICAgfSBlbHNlIGlmICghc3VwR3JvdXAgJiYgIXN1Ykdyb3VwKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGNhc2UgcHJvYmFibHkgc2hvdWxkbid0IG9jY3VyICh0aGlzIHdvdWxkIG1lYW4gdGhlXG4gICAgICAgICAgICAvLyBzdXBzdWIgd2FzIHNlbmRpbmcgdXMgYSBncm91cCB3aXRoIG5vIHN1cGVyc2NyaXB0IG9yXG4gICAgICAgICAgICAvLyBzdWJzY3JpcHQpIGJ1dCBiZSBzYWZlLlxuICAgICAgICAgICAgcmV0dXJuIGJhc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib3R0b20gPSBmb250TWV0cmljcy5tZXRyaWNzLmJpZ09wU3BhY2luZzUgK1xuICAgICAgICAgICAgICAgIHN1Ym1pZC5oZWlnaHQgKyBzdWJtaWQuZGVwdGggK1xuICAgICAgICAgICAgICAgIHN1Yktlcm4gK1xuICAgICAgICAgICAgICAgIGJhc2UuZGVwdGggKyBiYXNlU2hpZnQ7XG5cbiAgICAgICAgICAgIGZpbmFsR3JvdXAgPSBidWlsZENvbW1vbi5tYWtlVkxpc3QoW1xuICAgICAgICAgICAgICAgIHt0eXBlOiBcImtlcm5cIiwgc2l6ZTogZm9udE1ldHJpY3MubWV0cmljcy5iaWdPcFNwYWNpbmc1fSxcbiAgICAgICAgICAgICAgICB7dHlwZTogXCJlbGVtXCIsIGVsZW06IHN1Ym1pZH0sXG4gICAgICAgICAgICAgICAge3R5cGU6IFwia2VyblwiLCBzaXplOiBzdWJLZXJufSxcbiAgICAgICAgICAgICAgICB7dHlwZTogXCJlbGVtXCIsIGVsZW06IGJhc2V9LFxuICAgICAgICAgICAgICAgIHt0eXBlOiBcImtlcm5cIiwgc2l6ZTogc3VwS2Vybn0sXG4gICAgICAgICAgICAgICAge3R5cGU6IFwiZWxlbVwiLCBlbGVtOiBzdXBtaWR9LFxuICAgICAgICAgICAgICAgIHt0eXBlOiBcImtlcm5cIiwgc2l6ZTogZm9udE1ldHJpY3MubWV0cmljcy5iaWdPcFNwYWNpbmc1fSxcbiAgICAgICAgICAgIF0sIFwiYm90dG9tXCIsIGJvdHRvbSwgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIC8vIFNlZSBjb21tZW50IGFib3ZlIGFib3V0IHNsYW50c1xuICAgICAgICAgICAgZmluYWxHcm91cC5jaGlsZHJlblswXS5zdHlsZS5tYXJnaW5MZWZ0ID0gLXNsYW50ICsgXCJlbVwiO1xuICAgICAgICAgICAgZmluYWxHcm91cC5jaGlsZHJlblsyXS5zdHlsZS5tYXJnaW5MZWZ0ID0gc2xhbnQgKyBcImVtXCI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWFrZVNwYW4oW1wibW9wXCIsIFwib3AtbGltaXRzXCJdLCBbZmluYWxHcm91cF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChncm91cC52YWx1ZS5zeW1ib2wpIHtcbiAgICAgICAgICAgIGJhc2Uuc3R5bGUudG9wID0gYmFzZVNoaWZ0ICsgXCJlbVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJhc2U7XG4gICAgfVxufTtcblxuZ3JvdXBUeXBlcy5rYXRleCA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zLCBwcmV2KSB7XG4gICAgLy8gVGhlIEthVGVYIGxvZ28uIFRoZSBvZmZzZXRzIGZvciB0aGUgSyBhbmQgYSB3ZXJlIGNob3NlbiB0byBsb29rXG4gICAgLy8gZ29vZCwgYnV0IHRoZSBvZmZzZXRzIGZvciB0aGUgVCwgRSwgYW5kIFggd2VyZSB0YWtlbiBmcm9tIHRoZVxuICAgIC8vIGRlZmluaXRpb24gb2YgXFxUZVggaW4gVGVYIChzZWUgVGVYYm9vayBwZy4gMzU2KVxuICAgIHZhciBrID0gbWFrZVNwYW4oXG4gICAgICAgIFtcImtcIl0sIFtidWlsZENvbW1vbi5tYXRoc3ltKFwiS1wiLCBncm91cC5tb2RlKV0pO1xuICAgIHZhciBhID0gbWFrZVNwYW4oXG4gICAgICAgIFtcImFcIl0sIFtidWlsZENvbW1vbi5tYXRoc3ltKFwiQVwiLCBncm91cC5tb2RlKV0pO1xuXG4gICAgYS5oZWlnaHQgPSAoYS5oZWlnaHQgKyAwLjIpICogMC43NTtcbiAgICBhLmRlcHRoID0gKGEuaGVpZ2h0IC0gMC4yKSAqIDAuNzU7XG5cbiAgICB2YXIgdCA9IG1ha2VTcGFuKFxuICAgICAgICBbXCJ0XCJdLCBbYnVpbGRDb21tb24ubWF0aHN5bShcIlRcIiwgZ3JvdXAubW9kZSldKTtcbiAgICB2YXIgZSA9IG1ha2VTcGFuKFxuICAgICAgICBbXCJlXCJdLCBbYnVpbGRDb21tb24ubWF0aHN5bShcIkVcIiwgZ3JvdXAubW9kZSldKTtcblxuICAgIGUuaGVpZ2h0ID0gKGUuaGVpZ2h0IC0gMC4yMTU1KTtcbiAgICBlLmRlcHRoID0gKGUuZGVwdGggKyAwLjIxNTUpO1xuXG4gICAgdmFyIHggPSBtYWtlU3BhbihcbiAgICAgICAgW1wieFwiXSwgW2J1aWxkQ29tbW9uLm1hdGhzeW0oXCJYXCIsIGdyb3VwLm1vZGUpXSk7XG5cbiAgICByZXR1cm4gbWFrZVNwYW4oXG4gICAgICAgIFtcImthdGV4LWxvZ29cIiwgXCJtb3JkXCJdLCBbaywgYSwgdCwgZSwgeF0sIG9wdGlvbnMuZ2V0Q29sb3IoKSk7XG59O1xuXG5ncm91cFR5cGVzLm92ZXJsaW5lID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMsIHByZXYpIHtcbiAgICAvLyBPdmVybGluZXMgYXJlIGhhbmRsZWQgaW4gdGhlIFRlWGJvb2sgcGcgNDQzLCBSdWxlIDkuXG5cbiAgICAvLyBCdWlsZCB0aGUgaW5uZXIgZ3JvdXAgaW4gdGhlIGNyYW1wZWQgc3R5bGUuXG4gICAgdmFyIGlubmVyR3JvdXAgPSBidWlsZEdyb3VwKGdyb3VwLnZhbHVlLmJvZHksXG4gICAgICAgICAgICBvcHRpb25zLndpdGhTdHlsZShvcHRpb25zLnN0eWxlLmNyYW1wKCkpKTtcblxuICAgIHZhciBydWxlV2lkdGggPSBmb250TWV0cmljcy5tZXRyaWNzLmRlZmF1bHRSdWxlVGhpY2tuZXNzIC9cbiAgICAgICAgb3B0aW9ucy5zdHlsZS5zaXplTXVsdGlwbGllcjtcblxuICAgIC8vIENyZWF0ZSB0aGUgbGluZSBhYm92ZSB0aGUgYm9keVxuICAgIHZhciBsaW5lID0gbWFrZVNwYW4oXG4gICAgICAgIFtvcHRpb25zLnN0eWxlLnJlc2V0KCksIFN0eWxlLlRFWFQuY2xzKCksIFwib3ZlcmxpbmUtbGluZVwiXSk7XG4gICAgbGluZS5oZWlnaHQgPSBydWxlV2lkdGg7XG4gICAgbGluZS5tYXhGb250U2l6ZSA9IDEuMDtcblxuICAgIC8vIEdlbmVyYXRlIHRoZSB2bGlzdCwgd2l0aCB0aGUgYXBwcm9wcmlhdGUga2VybnNcbiAgICB2YXIgdmxpc3QgPSBidWlsZENvbW1vbi5tYWtlVkxpc3QoW1xuICAgICAgICB7dHlwZTogXCJlbGVtXCIsIGVsZW06IGlubmVyR3JvdXB9LFxuICAgICAgICB7dHlwZTogXCJrZXJuXCIsIHNpemU6IDMgKiBydWxlV2lkdGh9LFxuICAgICAgICB7dHlwZTogXCJlbGVtXCIsIGVsZW06IGxpbmV9LFxuICAgICAgICB7dHlwZTogXCJrZXJuXCIsIHNpemU6IHJ1bGVXaWR0aH0sXG4gICAgXSwgXCJmaXJzdEJhc2VsaW5lXCIsIG51bGwsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIG1ha2VTcGFuKFtcIm92ZXJsaW5lXCIsIFwibW9yZFwiXSwgW3ZsaXN0XSwgb3B0aW9ucy5nZXRDb2xvcigpKTtcbn07XG5cbmdyb3VwVHlwZXMudW5kZXJsaW5lID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMsIHByZXYpIHtcbiAgICAvLyBVbmRlcmxpbmVzIGFyZSBoYW5kbGVkIGluIHRoZSBUZVhib29rIHBnIDQ0MywgUnVsZSAxMC5cblxuICAgIC8vIEJ1aWxkIHRoZSBpbm5lciBncm91cC5cbiAgICB2YXIgaW5uZXJHcm91cCA9IGJ1aWxkR3JvdXAoZ3JvdXAudmFsdWUuYm9keSwgb3B0aW9ucyk7XG5cbiAgICB2YXIgcnVsZVdpZHRoID0gZm9udE1ldHJpY3MubWV0cmljcy5kZWZhdWx0UnVsZVRoaWNrbmVzcyAvXG4gICAgICAgIG9wdGlvbnMuc3R5bGUuc2l6ZU11bHRpcGxpZXI7XG5cbiAgICAvLyBDcmVhdGUgdGhlIGxpbmUgYWJvdmUgdGhlIGJvZHlcbiAgICB2YXIgbGluZSA9IG1ha2VTcGFuKFxuICAgICAgICBbb3B0aW9ucy5zdHlsZS5yZXNldCgpLCBTdHlsZS5URVhULmNscygpLCBcInVuZGVybGluZS1saW5lXCJdKTtcbiAgICBsaW5lLmhlaWdodCA9IHJ1bGVXaWR0aDtcbiAgICBsaW5lLm1heEZvbnRTaXplID0gMS4wO1xuXG4gICAgLy8gR2VuZXJhdGUgdGhlIHZsaXN0LCB3aXRoIHRoZSBhcHByb3ByaWF0ZSBrZXJuc1xuICAgIHZhciB2bGlzdCA9IGJ1aWxkQ29tbW9uLm1ha2VWTGlzdChbXG4gICAgICAgIHt0eXBlOiBcImtlcm5cIiwgc2l6ZTogcnVsZVdpZHRofSxcbiAgICAgICAge3R5cGU6IFwiZWxlbVwiLCBlbGVtOiBsaW5lfSxcbiAgICAgICAge3R5cGU6IFwia2VyblwiLCBzaXplOiAzICogcnVsZVdpZHRofSxcbiAgICAgICAge3R5cGU6IFwiZWxlbVwiLCBlbGVtOiBpbm5lckdyb3VwfSxcbiAgICBdLCBcInRvcFwiLCBpbm5lckdyb3VwLmhlaWdodCwgb3B0aW9ucyk7XG5cbiAgICByZXR1cm4gbWFrZVNwYW4oW1widW5kZXJsaW5lXCIsIFwibW9yZFwiXSwgW3ZsaXN0XSwgb3B0aW9ucy5nZXRDb2xvcigpKTtcbn07XG5cbmdyb3VwVHlwZXMuc3FydCA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zLCBwcmV2KSB7XG4gICAgLy8gU3F1YXJlIHJvb3RzIGFyZSBoYW5kbGVkIGluIHRoZSBUZVhib29rIHBnLiA0NDMsIFJ1bGUgMTEuXG5cbiAgICAvLyBGaXJzdCwgd2UgZG8gdGhlIHNhbWUgc3RlcHMgYXMgaW4gb3ZlcmxpbmUgdG8gYnVpbGQgdGhlIGlubmVyIGdyb3VwXG4gICAgLy8gYW5kIGxpbmVcbiAgICB2YXIgaW5uZXIgPSBidWlsZEdyb3VwKGdyb3VwLnZhbHVlLmJvZHksXG4gICAgICAgICAgICBvcHRpb25zLndpdGhTdHlsZShvcHRpb25zLnN0eWxlLmNyYW1wKCkpKTtcblxuICAgIHZhciBydWxlV2lkdGggPSBmb250TWV0cmljcy5tZXRyaWNzLmRlZmF1bHRSdWxlVGhpY2tuZXNzIC9cbiAgICAgICAgb3B0aW9ucy5zdHlsZS5zaXplTXVsdGlwbGllcjtcblxuICAgIHZhciBsaW5lID0gbWFrZVNwYW4oXG4gICAgICAgIFtvcHRpb25zLnN0eWxlLnJlc2V0KCksIFN0eWxlLlRFWFQuY2xzKCksIFwic3FydC1saW5lXCJdLCBbXSxcbiAgICAgICAgb3B0aW9ucy5nZXRDb2xvcigpKTtcbiAgICBsaW5lLmhlaWdodCA9IHJ1bGVXaWR0aDtcbiAgICBsaW5lLm1heEZvbnRTaXplID0gMS4wO1xuXG4gICAgdmFyIHBoaSA9IHJ1bGVXaWR0aDtcbiAgICBpZiAob3B0aW9ucy5zdHlsZS5pZCA8IFN0eWxlLlRFWFQuaWQpIHtcbiAgICAgICAgcGhpID0gZm9udE1ldHJpY3MubWV0cmljcy54SGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgY2xlYXJhbmNlIGJldHdlZW4gdGhlIGJvZHkgYW5kIGxpbmVcbiAgICB2YXIgbGluZUNsZWFyYW5jZSA9IHJ1bGVXaWR0aCArIHBoaSAvIDQ7XG5cbiAgICB2YXIgaW5uZXJIZWlnaHQgPVxuICAgICAgICAoaW5uZXIuaGVpZ2h0ICsgaW5uZXIuZGVwdGgpICogb3B0aW9ucy5zdHlsZS5zaXplTXVsdGlwbGllcjtcbiAgICB2YXIgbWluRGVsaW1pdGVySGVpZ2h0ID0gaW5uZXJIZWlnaHQgKyBsaW5lQ2xlYXJhbmNlICsgcnVsZVdpZHRoO1xuXG4gICAgLy8gQ3JlYXRlIGEgXFxzdXJkIGRlbGltaXRlciBvZiB0aGUgcmVxdWlyZWQgbWluaW11bSBzaXplXG4gICAgdmFyIGRlbGltID0gbWFrZVNwYW4oW1wic3FydC1zaWduXCJdLCBbXG4gICAgICAgIGRlbGltaXRlci5jdXN0b21TaXplZERlbGltKFwiXFxcXHN1cmRcIiwgbWluRGVsaW1pdGVySGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSwgb3B0aW9ucywgZ3JvdXAubW9kZSldLFxuICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZ2V0Q29sb3IoKSk7XG5cbiAgICB2YXIgZGVsaW1EZXB0aCA9IChkZWxpbS5oZWlnaHQgKyBkZWxpbS5kZXB0aCkgLSBydWxlV2lkdGg7XG5cbiAgICAvLyBBZGp1c3QgdGhlIGNsZWFyYW5jZSBiYXNlZCBvbiB0aGUgZGVsaW1pdGVyIHNpemVcbiAgICBpZiAoZGVsaW1EZXB0aCA+IGlubmVyLmhlaWdodCArIGlubmVyLmRlcHRoICsgbGluZUNsZWFyYW5jZSkge1xuICAgICAgICBsaW5lQ2xlYXJhbmNlID1cbiAgICAgICAgICAgIChsaW5lQ2xlYXJhbmNlICsgZGVsaW1EZXB0aCAtIGlubmVyLmhlaWdodCAtIGlubmVyLmRlcHRoKSAvIDI7XG4gICAgfVxuXG4gICAgLy8gU2hpZnQgdGhlIGRlbGltaXRlciBzbyB0aGF0IGl0cyB0b3AgbGluZXMgdXAgd2l0aCB0aGUgdG9wIG9mIHRoZSBsaW5lXG4gICAgdmFyIGRlbGltU2hpZnQgPSAtKGlubmVyLmhlaWdodCArIGxpbmVDbGVhcmFuY2UgKyBydWxlV2lkdGgpICsgZGVsaW0uaGVpZ2h0O1xuICAgIGRlbGltLnN0eWxlLnRvcCA9IGRlbGltU2hpZnQgKyBcImVtXCI7XG4gICAgZGVsaW0uaGVpZ2h0IC09IGRlbGltU2hpZnQ7XG4gICAgZGVsaW0uZGVwdGggKz0gZGVsaW1TaGlmdDtcblxuICAgIC8vIFdlIGFkZCBhIHNwZWNpYWwgY2FzZSBoZXJlLCBiZWNhdXNlIGV2ZW4gd2hlbiBgaW5uZXJgIGlzIGVtcHR5LCB3ZVxuICAgIC8vIHN0aWxsIGdldCBhIGxpbmUuIFNvLCB3ZSB1c2UgYSBzaW1wbGUgaGV1cmlzdGljIHRvIGRlY2lkZSBpZiB3ZVxuICAgIC8vIHNob3VsZCBvbWl0IHRoZSBib2R5IGVudGlyZWx5LiAobm90ZSB0aGlzIGRvZXNuJ3Qgd29yayBmb3Igc29tZXRoaW5nXG4gICAgLy8gbGlrZSBgXFxzcXJ0e1xccmxhcHt4fX1gLCBidXQgaWYgc29tZW9uZSBpcyBkb2luZyB0aGF0IHRoZXkgZGVzZXJ2ZSBmb3JcbiAgICAvLyBpdCBub3QgdG8gd29yay5cbiAgICB2YXIgYm9keTtcbiAgICBpZiAoaW5uZXIuaGVpZ2h0ID09PSAwICYmIGlubmVyLmRlcHRoID09PSAwKSB7XG4gICAgICAgIGJvZHkgPSBtYWtlU3BhbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJvZHkgPSBidWlsZENvbW1vbi5tYWtlVkxpc3QoW1xuICAgICAgICAgICAge3R5cGU6IFwiZWxlbVwiLCBlbGVtOiBpbm5lcn0sXG4gICAgICAgICAgICB7dHlwZTogXCJrZXJuXCIsIHNpemU6IGxpbmVDbGVhcmFuY2V9LFxuICAgICAgICAgICAge3R5cGU6IFwiZWxlbVwiLCBlbGVtOiBsaW5lfSxcbiAgICAgICAgICAgIHt0eXBlOiBcImtlcm5cIiwgc2l6ZTogcnVsZVdpZHRofSxcbiAgICAgICAgXSwgXCJmaXJzdEJhc2VsaW5lXCIsIG51bGwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmICghZ3JvdXAudmFsdWUuaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VTcGFuKFtcInNxcnRcIiwgXCJtb3JkXCJdLCBbZGVsaW0sIGJvZHldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBIYW5kbGUgdGhlIG9wdGlvbmFsIHJvb3QgaW5kZXhcblxuICAgICAgICAvLyBUaGUgaW5kZXggaXMgYWx3YXlzIGluIHNjcmlwdHNjcmlwdCBzdHlsZVxuICAgICAgICB2YXIgcm9vdCA9IGJ1aWxkR3JvdXAoXG4gICAgICAgICAgICBncm91cC52YWx1ZS5pbmRleCxcbiAgICAgICAgICAgIG9wdGlvbnMud2l0aFN0eWxlKFN0eWxlLlNDUklQVFNDUklQVCkpO1xuICAgICAgICB2YXIgcm9vdFdyYXAgPSBtYWtlU3BhbihcbiAgICAgICAgICAgIFtvcHRpb25zLnN0eWxlLnJlc2V0KCksIFN0eWxlLlNDUklQVFNDUklQVC5jbHMoKV0sXG4gICAgICAgICAgICBbcm9vdF0pO1xuXG4gICAgICAgIC8vIEZpZ3VyZSBvdXQgdGhlIGhlaWdodCBhbmQgZGVwdGggb2YgdGhlIGlubmVyIHBhcnRcbiAgICAgICAgdmFyIGlubmVyUm9vdEhlaWdodCA9IE1hdGgubWF4KGRlbGltLmhlaWdodCwgYm9keS5oZWlnaHQpO1xuICAgICAgICB2YXIgaW5uZXJSb290RGVwdGggPSBNYXRoLm1heChkZWxpbS5kZXB0aCwgYm9keS5kZXB0aCk7XG5cbiAgICAgICAgLy8gVGhlIGFtb3VudCB0aGUgaW5kZXggaXMgc2hpZnRlZCBieS4gVGhpcyBpcyB0YWtlbiBmcm9tIHRoZSBUZVhcbiAgICAgICAgLy8gc291cmNlLCBpbiB0aGUgZGVmaW5pdGlvbiBvZiBgXFxyQEB0YC5cbiAgICAgICAgdmFyIHRvU2hpZnQgPSAwLjYgKiAoaW5uZXJSb290SGVpZ2h0IC0gaW5uZXJSb290RGVwdGgpO1xuXG4gICAgICAgIC8vIEJ1aWxkIGEgVkxpc3Qgd2l0aCB0aGUgc3VwZXJzY3JpcHQgc2hpZnRlZCB1cCBjb3JyZWN0bHlcbiAgICAgICAgdmFyIHJvb3RWTGlzdCA9IGJ1aWxkQ29tbW9uLm1ha2VWTGlzdChcbiAgICAgICAgICAgIFt7dHlwZTogXCJlbGVtXCIsIGVsZW06IHJvb3RXcmFwfV0sXG4gICAgICAgICAgICBcInNoaWZ0XCIsIC10b1NoaWZ0LCBvcHRpb25zKTtcbiAgICAgICAgLy8gQWRkIGEgY2xhc3Mgc3Vycm91bmRpbmcgaXQgc28gd2UgY2FuIGFkZCBvbiB0aGUgYXBwcm9wcmlhdGVcbiAgICAgICAgLy8ga2VybmluZ1xuICAgICAgICB2YXIgcm9vdFZMaXN0V3JhcCA9IG1ha2VTcGFuKFtcInJvb3RcIl0sIFtyb290Vkxpc3RdKTtcblxuICAgICAgICByZXR1cm4gbWFrZVNwYW4oW1wic3FydFwiLCBcIm1vcmRcIl0sIFtyb290Vkxpc3RXcmFwLCBkZWxpbSwgYm9keV0pO1xuICAgIH1cbn07XG5cbmdyb3VwVHlwZXMuc2l6aW5nID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMsIHByZXYpIHtcbiAgICAvLyBIYW5kbGUgc2l6aW5nIG9wZXJhdG9ycyBsaWtlIFxcSHVnZS4gUmVhbCBUZVggZG9lc24ndCBhY3R1YWxseSBhbGxvd1xuICAgIC8vIHRoZXNlIGZ1bmN0aW9ucyBpbnNpZGUgb2YgbWF0aCBleHByZXNzaW9ucywgc28gd2UgZG8gc29tZSBzcGVjaWFsXG4gICAgLy8gaGFuZGxpbmcuXG4gICAgdmFyIGlubmVyID0gYnVpbGRFeHByZXNzaW9uKGdyb3VwLnZhbHVlLnZhbHVlLFxuICAgICAgICAgICAgb3B0aW9ucy53aXRoU2l6ZShncm91cC52YWx1ZS5zaXplKSwgcHJldik7XG5cbiAgICB2YXIgc3BhbiA9IG1ha2VTcGFuKFtcIm1vcmRcIl0sXG4gICAgICAgIFttYWtlU3BhbihbXCJzaXppbmdcIiwgXCJyZXNldC1cIiArIG9wdGlvbnMuc2l6ZSwgZ3JvdXAudmFsdWUuc2l6ZSxcbiAgICAgICAgICAgICAgICAgICBvcHRpb25zLnN0eWxlLmNscygpXSxcbiAgICAgICAgICAgICAgICAgIGlubmVyKV0pO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBjb3JyZWN0IG1heEZvbnRTaXplIG1hbnVhbGx5XG4gICAgdmFyIGZvbnRTaXplID0gYnVpbGRDb21tb24uc2l6aW5nTXVsdGlwbGllcltncm91cC52YWx1ZS5zaXplXTtcbiAgICBzcGFuLm1heEZvbnRTaXplID0gZm9udFNpemUgKiBvcHRpb25zLnN0eWxlLnNpemVNdWx0aXBsaWVyO1xuXG4gICAgcmV0dXJuIHNwYW47XG59O1xuXG5ncm91cFR5cGVzLnN0eWxpbmcgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucywgcHJldikge1xuICAgIC8vIFN0eWxlIGNoYW5nZXMgYXJlIGhhbmRsZWQgaW4gdGhlIFRlWGJvb2sgb24gcGcuIDQ0MiwgUnVsZSAzLlxuXG4gICAgLy8gRmlndXJlIG91dCB3aGF0IHN0eWxlIHdlJ3JlIGNoYW5naW5nIHRvLlxuICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFN0eWxlLkRJU1BMQVksXG4gICAgICAgIFwidGV4dFwiOiBTdHlsZS5URVhULFxuICAgICAgICBcInNjcmlwdFwiOiBTdHlsZS5TQ1JJUFQsXG4gICAgICAgIFwic2NyaXB0c2NyaXB0XCI6IFN0eWxlLlNDUklQVFNDUklQVCxcbiAgICB9O1xuXG4gICAgdmFyIG5ld1N0eWxlID0gc3R5bGVbZ3JvdXAudmFsdWUuc3R5bGVdO1xuXG4gICAgLy8gQnVpbGQgdGhlIGlubmVyIGV4cHJlc3Npb24gaW4gdGhlIG5ldyBzdHlsZS5cbiAgICB2YXIgaW5uZXIgPSBidWlsZEV4cHJlc3Npb24oXG4gICAgICAgIGdyb3VwLnZhbHVlLnZhbHVlLCBvcHRpb25zLndpdGhTdHlsZShuZXdTdHlsZSksIHByZXYpO1xuXG4gICAgcmV0dXJuIG1ha2VTcGFuKFtvcHRpb25zLnN0eWxlLnJlc2V0KCksIG5ld1N0eWxlLmNscygpXSwgaW5uZXIpO1xufTtcblxuZ3JvdXBUeXBlcy5mb250ID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMsIHByZXYpIHtcbiAgICB2YXIgZm9udCA9IGdyb3VwLnZhbHVlLmZvbnQ7XG4gICAgcmV0dXJuIGJ1aWxkR3JvdXAoZ3JvdXAudmFsdWUuYm9keSwgb3B0aW9ucy53aXRoRm9udChmb250KSwgcHJldik7XG59O1xuXG5ncm91cFR5cGVzLmRlbGltc2l6aW5nID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMsIHByZXYpIHtcbiAgICB2YXIgZGVsaW0gPSBncm91cC52YWx1ZS52YWx1ZTtcblxuICAgIGlmIChkZWxpbSA9PT0gXCIuXCIpIHtcbiAgICAgICAgLy8gRW1wdHkgZGVsaW1pdGVycyBzdGlsbCBjb3VudCBhcyBlbGVtZW50cywgZXZlbiB0aG91Z2ggdGhleSBkb24ndFxuICAgICAgICAvLyBzaG93IGFueXRoaW5nLlxuICAgICAgICByZXR1cm4gbWFrZVNwYW4oW2dyb3VwVG9UeXBlW2dyb3VwLnZhbHVlLmRlbGltVHlwZV1dKTtcbiAgICB9XG5cbiAgICAvLyBVc2UgZGVsaW1pdGVyLnNpemVkRGVsaW0gdG8gZ2VuZXJhdGUgdGhlIGRlbGltaXRlci5cbiAgICByZXR1cm4gbWFrZVNwYW4oXG4gICAgICAgIFtncm91cFRvVHlwZVtncm91cC52YWx1ZS5kZWxpbVR5cGVdXSxcbiAgICAgICAgW2RlbGltaXRlci5zaXplZERlbGltKFxuICAgICAgICAgICAgZGVsaW0sIGdyb3VwLnZhbHVlLnNpemUsIG9wdGlvbnMsIGdyb3VwLm1vZGUpXSk7XG59O1xuXG5ncm91cFR5cGVzLmxlZnRyaWdodCA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zLCBwcmV2KSB7XG4gICAgLy8gQnVpbGQgdGhlIGlubmVyIGV4cHJlc3Npb25cbiAgICB2YXIgaW5uZXIgPSBidWlsZEV4cHJlc3Npb24oZ3JvdXAudmFsdWUuYm9keSwgb3B0aW9ucy5yZXNldCgpKTtcblxuICAgIHZhciBpbm5lckhlaWdodCA9IDA7XG4gICAgdmFyIGlubmVyRGVwdGggPSAwO1xuXG4gICAgLy8gQ2FsY3VsYXRlIGl0cyBoZWlnaHQgYW5kIGRlcHRoXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbm5lci5sZW5ndGg7IGkrKykge1xuICAgICAgICBpbm5lckhlaWdodCA9IE1hdGgubWF4KGlubmVyW2ldLmhlaWdodCwgaW5uZXJIZWlnaHQpO1xuICAgICAgICBpbm5lckRlcHRoID0gTWF0aC5tYXgoaW5uZXJbaV0uZGVwdGgsIGlubmVyRGVwdGgpO1xuICAgIH1cblxuICAgIC8vIFRoZSBzaXplIG9mIGRlbGltaXRlcnMgaXMgdGhlIHNhbWUsIHJlZ2FyZGxlc3Mgb2Ygd2hhdCBzdHlsZSB3ZSBhcmVcbiAgICAvLyBpbi4gVGh1cywgdG8gY29ycmVjdGx5IGNhbGN1bGF0ZSB0aGUgc2l6ZSBvZiBkZWxpbWl0ZXIgd2UgbmVlZCBhcm91bmRcbiAgICAvLyBhIGdyb3VwLCB3ZSBzY2FsZSBkb3duIHRoZSBpbm5lciBzaXplIGJhc2VkIG9uIHRoZSBzaXplLlxuICAgIGlubmVySGVpZ2h0ICo9IG9wdGlvbnMuc3R5bGUuc2l6ZU11bHRpcGxpZXI7XG4gICAgaW5uZXJEZXB0aCAqPSBvcHRpb25zLnN0eWxlLnNpemVNdWx0aXBsaWVyO1xuXG4gICAgdmFyIGxlZnREZWxpbTtcbiAgICBpZiAoZ3JvdXAudmFsdWUubGVmdCA9PT0gXCIuXCIpIHtcbiAgICAgICAgLy8gRW1wdHkgZGVsaW1pdGVycyBpbiBcXGxlZnQgYW5kIFxccmlnaHQgbWFrZSBudWxsIGRlbGltaXRlciBzcGFjZXMuXG4gICAgICAgIGxlZnREZWxpbSA9IG1ha2VOdWxsRGVsaW1pdGVyKG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE90aGVyd2lzZSwgdXNlIGxlZnRSaWdodERlbGltIHRvIGdlbmVyYXRlIHRoZSBjb3JyZWN0IHNpemVkXG4gICAgICAgIC8vIGRlbGltaXRlci5cbiAgICAgICAgbGVmdERlbGltID0gZGVsaW1pdGVyLmxlZnRSaWdodERlbGltKFxuICAgICAgICAgICAgZ3JvdXAudmFsdWUubGVmdCwgaW5uZXJIZWlnaHQsIGlubmVyRGVwdGgsIG9wdGlvbnMsXG4gICAgICAgICAgICBncm91cC5tb2RlKTtcbiAgICB9XG4gICAgLy8gQWRkIGl0IHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGV4cHJlc3Npb25cbiAgICBpbm5lci51bnNoaWZ0KGxlZnREZWxpbSk7XG5cbiAgICB2YXIgcmlnaHREZWxpbTtcbiAgICAvLyBTYW1lIGZvciB0aGUgcmlnaHQgZGVsaW1pdGVyXG4gICAgaWYgKGdyb3VwLnZhbHVlLnJpZ2h0ID09PSBcIi5cIikge1xuICAgICAgICByaWdodERlbGltID0gbWFrZU51bGxEZWxpbWl0ZXIob3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmlnaHREZWxpbSA9IGRlbGltaXRlci5sZWZ0UmlnaHREZWxpbShcbiAgICAgICAgICAgIGdyb3VwLnZhbHVlLnJpZ2h0LCBpbm5lckhlaWdodCwgaW5uZXJEZXB0aCwgb3B0aW9ucyxcbiAgICAgICAgICAgIGdyb3VwLm1vZGUpO1xuICAgIH1cbiAgICAvLyBBZGQgaXQgdG8gdGhlIGVuZCBvZiB0aGUgZXhwcmVzc2lvbi5cbiAgICBpbm5lci5wdXNoKHJpZ2h0RGVsaW0pO1xuXG4gICAgcmV0dXJuIG1ha2VTcGFuKFxuICAgICAgICBbXCJtaW5uZXJcIiwgb3B0aW9ucy5zdHlsZS5jbHMoKV0sIGlubmVyLCBvcHRpb25zLmdldENvbG9yKCkpO1xufTtcblxuZ3JvdXBUeXBlcy5ydWxlID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMsIHByZXYpIHtcbiAgICAvLyBNYWtlIGFuIGVtcHR5IHNwYW4gZm9yIHRoZSBydWxlXG4gICAgdmFyIHJ1bGUgPSBtYWtlU3BhbihbXCJtb3JkXCIsIFwicnVsZVwiXSwgW10sIG9wdGlvbnMuZ2V0Q29sb3IoKSk7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIHNoaWZ0LCB3aWR0aCwgYW5kIGhlaWdodCBvZiB0aGUgcnVsZSwgYW5kIGFjY291bnQgZm9yIHVuaXRzXG4gICAgdmFyIHNoaWZ0ID0gMDtcbiAgICBpZiAoZ3JvdXAudmFsdWUuc2hpZnQpIHtcbiAgICAgICAgc2hpZnQgPSBncm91cC52YWx1ZS5zaGlmdC5udW1iZXI7XG4gICAgICAgIGlmIChncm91cC52YWx1ZS5zaGlmdC51bml0ID09PSBcImV4XCIpIHtcbiAgICAgICAgICAgIHNoaWZ0ICo9IGZvbnRNZXRyaWNzLm1ldHJpY3MueEhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciB3aWR0aCA9IGdyb3VwLnZhbHVlLndpZHRoLm51bWJlcjtcbiAgICBpZiAoZ3JvdXAudmFsdWUud2lkdGgudW5pdCA9PT0gXCJleFwiKSB7XG4gICAgICAgIHdpZHRoICo9IGZvbnRNZXRyaWNzLm1ldHJpY3MueEhlaWdodDtcbiAgICB9XG5cbiAgICB2YXIgaGVpZ2h0ID0gZ3JvdXAudmFsdWUuaGVpZ2h0Lm51bWJlcjtcbiAgICBpZiAoZ3JvdXAudmFsdWUuaGVpZ2h0LnVuaXQgPT09IFwiZXhcIikge1xuICAgICAgICBoZWlnaHQgKj0gZm9udE1ldHJpY3MubWV0cmljcy54SGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIFRoZSBzaXplcyBvZiBydWxlcyBhcmUgYWJzb2x1dGUsIHNvIG1ha2UgaXQgbGFyZ2VyIGlmIHdlIGFyZSBpbiBhXG4gICAgLy8gc21hbGxlciBzdHlsZS5cbiAgICBzaGlmdCAvPSBvcHRpb25zLnN0eWxlLnNpemVNdWx0aXBsaWVyO1xuICAgIHdpZHRoIC89IG9wdGlvbnMuc3R5bGUuc2l6ZU11bHRpcGxpZXI7XG4gICAgaGVpZ2h0IC89IG9wdGlvbnMuc3R5bGUuc2l6ZU11bHRpcGxpZXI7XG5cbiAgICAvLyBTdHlsZSB0aGUgcnVsZSB0byB0aGUgcmlnaHQgc2l6ZVxuICAgIHJ1bGUuc3R5bGUuYm9yZGVyUmlnaHRXaWR0aCA9IHdpZHRoICsgXCJlbVwiO1xuICAgIHJ1bGUuc3R5bGUuYm9yZGVyVG9wV2lkdGggPSBoZWlnaHQgKyBcImVtXCI7XG4gICAgcnVsZS5zdHlsZS5ib3R0b20gPSBzaGlmdCArIFwiZW1cIjtcblxuICAgIC8vIFJlY29yZCB0aGUgaGVpZ2h0IGFuZCB3aWR0aFxuICAgIHJ1bGUud2lkdGggPSB3aWR0aDtcbiAgICBydWxlLmhlaWdodCA9IGhlaWdodCArIHNoaWZ0O1xuICAgIHJ1bGUuZGVwdGggPSAtc2hpZnQ7XG5cbiAgICByZXR1cm4gcnVsZTtcbn07XG5cbmdyb3VwVHlwZXMuYWNjZW50ID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMsIHByZXYpIHtcbiAgICAvLyBBY2NlbnRzIGFyZSBoYW5kbGVkIGluIHRoZSBUZVhib29rIHBnLiA0NDMsIHJ1bGUgMTIuXG4gICAgdmFyIGJhc2UgPSBncm91cC52YWx1ZS5iYXNlO1xuXG4gICAgdmFyIHN1cHN1Ykdyb3VwO1xuICAgIGlmIChncm91cC50eXBlID09PSBcInN1cHN1YlwiKSB7XG4gICAgICAgIC8vIElmIG91ciBiYXNlIGlzIGEgY2hhcmFjdGVyIGJveCwgYW5kIHdlIGhhdmUgc3VwZXJzY3JpcHRzIGFuZFxuICAgICAgICAvLyBzdWJzY3JpcHRzLCB0aGUgc3Vwc3ViIHdpbGwgZGVmZXIgdG8gdXMuIEluIHBhcnRpY3VsYXIsIHdlIHdhbnRcbiAgICAgICAgLy8gdG8gYXR0YWNoIHRoZSBzdXBlcnNjcmlwdHMgYW5kIHN1YnNjcmlwdHMgdG8gdGhlIGlubmVyIGJvZHkgKHNvXG4gICAgICAgIC8vIHRoYXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBzdXBlcnNjcmlwdHMgYW5kIHN1YnNjcmlwdHMgd29uJ3QgYmVcbiAgICAgICAgLy8gYWZmZWN0ZWQgYnkgdGhlIGhlaWdodCBvZiB0aGUgYWNjZW50KS4gV2UgYWNjb21wbGlzaCB0aGlzIGJ5XG4gICAgICAgIC8vIHN0aWNraW5nIHRoZSBiYXNlIG9mIHRoZSBhY2NlbnQgaW50byB0aGUgYmFzZSBvZiB0aGUgc3Vwc3ViLCBhbmRcbiAgICAgICAgLy8gcmVuZGVyaW5nIHRoYXQsIHdoaWxlIGtlZXBpbmcgdHJhY2sgb2Ygd2hlcmUgdGhlIGFjY2VudCBpcy5cblxuICAgICAgICAvLyBUaGUgc3Vwc3ViIGdyb3VwIGlzIHRoZSBncm91cCB0aGF0IHdhcyBwYXNzZWQgaW5cbiAgICAgICAgdmFyIHN1cHN1YiA9IGdyb3VwO1xuICAgICAgICAvLyBUaGUgcmVhbCBhY2NlbnQgZ3JvdXAgaXMgdGhlIGJhc2Ugb2YgdGhlIHN1cHN1YiBncm91cFxuICAgICAgICBncm91cCA9IHN1cHN1Yi52YWx1ZS5iYXNlO1xuICAgICAgICAvLyBUaGUgY2hhcmFjdGVyIGJveCBpcyB0aGUgYmFzZSBvZiB0aGUgYWNjZW50IGdyb3VwXG4gICAgICAgIGJhc2UgPSBncm91cC52YWx1ZS5iYXNlO1xuICAgICAgICAvLyBTdGljayB0aGUgY2hhcmFjdGVyIGJveCBpbnRvIHRoZSBiYXNlIG9mIHRoZSBzdXBzdWIgZ3JvdXBcbiAgICAgICAgc3Vwc3ViLnZhbHVlLmJhc2UgPSBiYXNlO1xuXG4gICAgICAgIC8vIFJlcmVuZGVyIHRoZSBzdXBzdWIgZ3JvdXAgd2l0aCBpdHMgbmV3IGJhc2UsIGFuZCBzdG9yZSB0aGF0XG4gICAgICAgIC8vIHJlc3VsdC5cbiAgICAgICAgc3Vwc3ViR3JvdXAgPSBidWlsZEdyb3VwKFxuICAgICAgICAgICAgc3Vwc3ViLCBvcHRpb25zLnJlc2V0KCksIHByZXYpO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkIHRoZSBiYXNlIGdyb3VwXG4gICAgdmFyIGJvZHkgPSBidWlsZEdyb3VwKFxuICAgICAgICBiYXNlLCBvcHRpb25zLndpdGhTdHlsZShvcHRpb25zLnN0eWxlLmNyYW1wKCkpKTtcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgc2tldyBvZiB0aGUgYWNjZW50LiBUaGlzIGlzIGJhc2VkIG9uIHRoZSBsaW5lIFwiSWYgdGhlXG4gICAgLy8gbnVjbGV1cyBpcyBub3QgYSBzaW5nbGUgY2hhcmFjdGVyLCBsZXQgcyA9IDA7IG90aGVyd2lzZSBzZXQgcyB0byB0aGVcbiAgICAvLyBrZXJuIGFtb3VudCBmb3IgdGhlIG51Y2xldXMgZm9sbG93ZWQgYnkgdGhlIFxcc2tld2NoYXIgb2YgaXRzIGZvbnQuXCJcbiAgICAvLyBOb3RlIHRoYXQgb3VyIHNrZXcgbWV0cmljcyBhcmUganVzdCB0aGUga2VybiBiZXR3ZWVuIGVhY2ggY2hhcmFjdGVyXG4gICAgLy8gYW5kIHRoZSBza2V3Y2hhci5cbiAgICB2YXIgc2tldztcbiAgICBpZiAoaXNDaGFyYWN0ZXJCb3goYmFzZSkpIHtcbiAgICAgICAgLy8gSWYgdGhlIGJhc2UgaXMgYSBjaGFyYWN0ZXIgYm94LCB0aGVuIHdlIHdhbnQgdGhlIHNrZXcgb2YgdGhlXG4gICAgICAgIC8vIGlubmVybW9zdCBjaGFyYWN0ZXIuIFRvIGRvIHRoYXQsIHdlIGZpbmQgdGhlIGlubmVybW9zdCBjaGFyYWN0ZXI6XG4gICAgICAgIHZhciBiYXNlQ2hhciA9IGdldEJhc2VFbGVtKGJhc2UpO1xuICAgICAgICAvLyBUaGVuLCB3ZSByZW5kZXIgaXRzIGdyb3VwIHRvIGdldCB0aGUgc3ltYm9sIGluc2lkZSBpdFxuICAgICAgICB2YXIgYmFzZUdyb3VwID0gYnVpbGRHcm91cChcbiAgICAgICAgICAgIGJhc2VDaGFyLCBvcHRpb25zLndpdGhTdHlsZShvcHRpb25zLnN0eWxlLmNyYW1wKCkpKTtcbiAgICAgICAgLy8gRmluYWxseSwgd2UgcHVsbCB0aGUgc2tldyBvZmYgb2YgdGhlIHN5bWJvbC5cbiAgICAgICAgc2tldyA9IGJhc2VHcm91cC5za2V3O1xuICAgICAgICAvLyBOb3RlIHRoYXQgd2Ugbm93IHRocm93IGF3YXkgYmFzZUdyb3VwLCBiZWNhdXNlIHRoZSBsYXllcnMgd2VcbiAgICAgICAgLy8gcmVtb3ZlZCB3aXRoIGdldEJhc2VFbGVtIG1pZ2h0IGNvbnRhaW4gdGhpbmdzIGxpa2UgXFxjb2xvciB3aGljaFxuICAgICAgICAvLyB3ZSBjYW4ndCBnZXQgcmlkIG9mLlxuICAgICAgICAvLyBUT0RPKGVtaWx5KTogRmluZCBhIGJldHRlciB3YXkgdG8gZ2V0IHRoZSBza2V3XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2tldyA9IDA7XG4gICAgfVxuXG4gICAgLy8gY2FsY3VsYXRlIHRoZSBhbW91bnQgb2Ygc3BhY2UgYmV0d2VlbiB0aGUgYm9keSBhbmQgdGhlIGFjY2VudFxuICAgIHZhciBjbGVhcmFuY2UgPSBNYXRoLm1pbihib2R5LmhlaWdodCwgZm9udE1ldHJpY3MubWV0cmljcy54SGVpZ2h0KTtcblxuICAgIC8vIEJ1aWxkIHRoZSBhY2NlbnRcbiAgICB2YXIgYWNjZW50ID0gYnVpbGRDb21tb24ubWFrZVN5bWJvbChcbiAgICAgICAgZ3JvdXAudmFsdWUuYWNjZW50LCBcIk1haW4tUmVndWxhclwiLCBcIm1hdGhcIiwgb3B0aW9ucy5nZXRDb2xvcigpKTtcbiAgICAvLyBSZW1vdmUgdGhlIGl0YWxpYyBjb3JyZWN0aW9uIG9mIHRoZSBhY2NlbnQsIGJlY2F1c2UgaXQgb25seSBzZXJ2ZXMgdG9cbiAgICAvLyBzaGlmdCB0aGUgYWNjZW50IG92ZXIgdG8gYSBwbGFjZSB3ZSBkb24ndCB3YW50LlxuICAgIGFjY2VudC5pdGFsaWMgPSAwO1xuXG4gICAgLy8gVGhlIFxcdmVjIGNoYXJhY3RlciB0aGF0IHRoZSBmb250cyB1c2UgaXMgYSBjb21iaW5pbmcgY2hhcmFjdGVyLCBhbmRcbiAgICAvLyB0aHVzIHNob3dzIHVwIG11Y2ggdG9vIGZhciB0byB0aGUgbGVmdC4gVG8gYWNjb3VudCBmb3IgdGhpcywgd2UgYWRkIGFcbiAgICAvLyBzcGVjaWZpYyBjbGFzcyB3aGljaCBzaGlmdHMgdGhlIGFjY2VudCBvdmVyIHRvIHdoZXJlIHdlIHdhbnQgaXQuXG4gICAgLy8gVE9ETyhlbWlseSk6IEZpeCB0aGlzIGluIGEgYmV0dGVyIHdheSwgbGlrZSBieSBjaGFuZ2luZyB0aGUgZm9udFxuICAgIHZhciB2ZWNDbGFzcyA9IGdyb3VwLnZhbHVlLmFjY2VudCA9PT0gXCJcXFxcdmVjXCIgPyBcImFjY2VudC12ZWNcIiA6IG51bGw7XG5cbiAgICB2YXIgYWNjZW50Qm9keSA9IG1ha2VTcGFuKFtcImFjY2VudC1ib2R5XCIsIHZlY0NsYXNzXSwgW1xuICAgICAgICBtYWtlU3BhbihbXSwgW2FjY2VudF0pXSk7XG5cbiAgICBhY2NlbnRCb2R5ID0gYnVpbGRDb21tb24ubWFrZVZMaXN0KFtcbiAgICAgICAge3R5cGU6IFwiZWxlbVwiLCBlbGVtOiBib2R5fSxcbiAgICAgICAge3R5cGU6IFwia2VyblwiLCBzaXplOiAtY2xlYXJhbmNlfSxcbiAgICAgICAge3R5cGU6IFwiZWxlbVwiLCBlbGVtOiBhY2NlbnRCb2R5fSxcbiAgICBdLCBcImZpcnN0QmFzZWxpbmVcIiwgbnVsbCwgb3B0aW9ucyk7XG5cbiAgICAvLyBTaGlmdCB0aGUgYWNjZW50IG92ZXIgYnkgdGhlIHNrZXcuIE5vdGUgd2Ugc2hpZnQgYnkgdHdpY2UgdGhlIHNrZXdcbiAgICAvLyBiZWNhdXNlIHdlIGFyZSBjZW50ZXJpbmcgdGhlIGFjY2VudCwgc28gYnkgYWRkaW5nIDIqc2tldyB0byB0aGUgbGVmdCxcbiAgICAvLyB3ZSBzaGlmdCBpdCB0byB0aGUgcmlnaHQgYnkgMSpza2V3LlxuICAgIGFjY2VudEJvZHkuY2hpbGRyZW5bMV0uc3R5bGUubWFyZ2luTGVmdCA9IDIgKiBza2V3ICsgXCJlbVwiO1xuXG4gICAgdmFyIGFjY2VudFdyYXAgPSBtYWtlU3BhbihbXCJtb3JkXCIsIFwiYWNjZW50XCJdLCBbYWNjZW50Qm9keV0pO1xuXG4gICAgaWYgKHN1cHN1Ykdyb3VwKSB7XG4gICAgICAgIC8vIEhlcmUsIHdlIHJlcGxhY2UgdGhlIFwiYmFzZVwiIGNoaWxkIG9mIHRoZSBzdXBzdWIgd2l0aCBvdXIgbmV3bHlcbiAgICAgICAgLy8gZ2VuZXJhdGVkIGFjY2VudC5cbiAgICAgICAgc3Vwc3ViR3JvdXAuY2hpbGRyZW5bMF0gPSBhY2NlbnRXcmFwO1xuXG4gICAgICAgIC8vIFNpbmNlIHdlIGRvbid0IHJlcnVuIHRoZSBoZWlnaHQgY2FsY3VsYXRpb24gYWZ0ZXIgcmVwbGFjaW5nIHRoZVxuICAgICAgICAvLyBhY2NlbnQsIHdlIG1hbnVhbGx5IHJlY2FsY3VsYXRlIGhlaWdodC5cbiAgICAgICAgc3Vwc3ViR3JvdXAuaGVpZ2h0ID0gTWF0aC5tYXgoYWNjZW50V3JhcC5oZWlnaHQsIHN1cHN1Ykdyb3VwLmhlaWdodCk7XG5cbiAgICAgICAgLy8gQWNjZW50cyBzaG91bGQgYWx3YXlzIGJlIG9yZHMsIGV2ZW4gd2hlbiB0aGVpciBpbm5hcmRzIGFyZSBub3QuXG4gICAgICAgIHN1cHN1Ykdyb3VwLmNsYXNzZXNbMF0gPSBcIm1vcmRcIjtcblxuICAgICAgICByZXR1cm4gc3Vwc3ViR3JvdXA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGFjY2VudFdyYXA7XG4gICAgfVxufTtcblxuZ3JvdXBUeXBlcy5waGFudG9tID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMsIHByZXYpIHtcbiAgICB2YXIgZWxlbWVudHMgPSBidWlsZEV4cHJlc3Npb24oXG4gICAgICAgIGdyb3VwLnZhbHVlLnZhbHVlLFxuICAgICAgICBvcHRpb25zLndpdGhQaGFudG9tKCksXG4gICAgICAgIHByZXZcbiAgICApO1xuXG4gICAgLy8gXFxwaGFudG9tIGlzbid0IHN1cHBvc2VkIHRvIGFmZmVjdCB0aGUgZWxlbWVudHMgaXQgY29udGFpbnMuXG4gICAgLy8gU2VlIFwiY29sb3JcIiBmb3IgbW9yZSBkZXRhaWxzLlxuICAgIHJldHVybiBuZXcgYnVpbGRDb21tb24ubWFrZUZyYWdtZW50KGVsZW1lbnRzKTtcbn07XG5cbi8qKlxuICogYnVpbGRHcm91cCBpcyB0aGUgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIGdyb3VwIGFuZCBjYWxscyB0aGUgY29ycmVjdCBncm91cFR5cGVcbiAqIGZ1bmN0aW9uIGZvciBpdC4gSXQgYWxzbyBoYW5kbGVzIHRoZSBpbnRlcmFjdGlvbiBvZiBzaXplIGFuZCBzdHlsZSBjaGFuZ2VzXG4gKiBiZXR3ZWVuIHBhcmVudHMgYW5kIGNoaWxkcmVuLlxuICovXG52YXIgYnVpbGRHcm91cCA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zLCBwcmV2KSB7XG4gICAgaWYgKCFncm91cCkge1xuICAgICAgICByZXR1cm4gbWFrZVNwYW4oKTtcbiAgICB9XG5cbiAgICBpZiAoZ3JvdXBUeXBlc1tncm91cC50eXBlXSkge1xuICAgICAgICAvLyBDYWxsIHRoZSBncm91cFR5cGVzIGZ1bmN0aW9uXG4gICAgICAgIHZhciBncm91cE5vZGUgPSBncm91cFR5cGVzW2dyb3VwLnR5cGVdKGdyb3VwLCBvcHRpb25zLCBwcmV2KTtcbiAgICAgICAgdmFyIG11bHRpcGxpZXI7XG5cbiAgICAgICAgLy8gSWYgdGhlIHN0eWxlIGNoYW5nZWQgYmV0d2VlbiB0aGUgcGFyZW50IGFuZCB0aGUgY3VycmVudCBncm91cCxcbiAgICAgICAgLy8gYWNjb3VudCBmb3IgdGhlIHNpemUgZGlmZmVyZW5jZVxuICAgICAgICBpZiAob3B0aW9ucy5zdHlsZSAhPT0gb3B0aW9ucy5wYXJlbnRTdHlsZSkge1xuICAgICAgICAgICAgbXVsdGlwbGllciA9IG9wdGlvbnMuc3R5bGUuc2l6ZU11bHRpcGxpZXIgL1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnBhcmVudFN0eWxlLnNpemVNdWx0aXBsaWVyO1xuXG4gICAgICAgICAgICBncm91cE5vZGUuaGVpZ2h0ICo9IG11bHRpcGxpZXI7XG4gICAgICAgICAgICBncm91cE5vZGUuZGVwdGggKj0gbXVsdGlwbGllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSBzaXplIGNoYW5nZWQgYmV0d2VlbiB0aGUgcGFyZW50IGFuZCB0aGUgY3VycmVudCBncm91cCwgYWNjb3VudFxuICAgICAgICAvLyBmb3IgdGhhdCBzaXplIGRpZmZlcmVuY2UuXG4gICAgICAgIGlmIChvcHRpb25zLnNpemUgIT09IG9wdGlvbnMucGFyZW50U2l6ZSkge1xuICAgICAgICAgICAgbXVsdGlwbGllciA9IGJ1aWxkQ29tbW9uLnNpemluZ011bHRpcGxpZXJbb3B0aW9ucy5zaXplXSAvXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkQ29tbW9uLnNpemluZ011bHRpcGxpZXJbb3B0aW9ucy5wYXJlbnRTaXplXTtcblxuICAgICAgICAgICAgZ3JvdXBOb2RlLmhlaWdodCAqPSBtdWx0aXBsaWVyO1xuICAgICAgICAgICAgZ3JvdXBOb2RlLmRlcHRoICo9IG11bHRpcGxpZXI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ3JvdXBOb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBQYXJzZUVycm9yKFxuICAgICAgICAgICAgXCJHb3QgZ3JvdXAgb2YgdW5rbm93biB0eXBlOiAnXCIgKyBncm91cC50eXBlICsgXCInXCIpO1xuICAgIH1cbn07XG5cbi8qKlxuICogVGFrZSBhbiBlbnRpcmUgcGFyc2UgdHJlZSwgYW5kIGJ1aWxkIGl0IGludG8gYW4gYXBwcm9wcmlhdGUgc2V0IG9mIEhUTUxcbiAqIG5vZGVzLlxuICovXG52YXIgYnVpbGRIVE1MID0gZnVuY3Rpb24odHJlZSwgb3B0aW9ucykge1xuICAgIC8vIGJ1aWxkRXhwcmVzc2lvbiBpcyBkZXN0cnVjdGl2ZSwgc28gd2UgbmVlZCB0byBtYWtlIGEgY2xvbmVcbiAgICAvLyBvZiB0aGUgaW5jb21pbmcgdHJlZSBzbyB0aGF0IGl0IGlzbid0IGFjY2lkZW50YWxseSBjaGFuZ2VkXG4gICAgdHJlZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodHJlZSkpO1xuXG4gICAgLy8gQnVpbGQgdGhlIGV4cHJlc3Npb24gY29udGFpbmVkIGluIHRoZSB0cmVlXG4gICAgdmFyIGV4cHJlc3Npb24gPSBidWlsZEV4cHJlc3Npb24odHJlZSwgb3B0aW9ucyk7XG4gICAgdmFyIGJvZHkgPSBtYWtlU3BhbihbXCJiYXNlXCIsIG9wdGlvbnMuc3R5bGUuY2xzKCldLCBleHByZXNzaW9uKTtcblxuICAgIC8vIEFkZCBzdHJ1dHMsIHdoaWNoIGVuc3VyZSB0aGF0IHRoZSB0b3Agb2YgdGhlIEhUTUwgZWxlbWVudCBmYWxscyBhdCB0aGVcbiAgICAvLyBoZWlnaHQgb2YgdGhlIGV4cHJlc3Npb24sIGFuZCB0aGUgYm90dG9tIG9mIHRoZSBIVE1MIGVsZW1lbnQgZmFsbHMgYXQgdGhlXG4gICAgLy8gZGVwdGggb2YgdGhlIGV4cHJlc3Npb24uXG4gICAgdmFyIHRvcFN0cnV0ID0gbWFrZVNwYW4oW1wic3RydXRcIl0pO1xuICAgIHZhciBib3R0b21TdHJ1dCA9IG1ha2VTcGFuKFtcInN0cnV0XCIsIFwiYm90dG9tXCJdKTtcblxuICAgIHRvcFN0cnV0LnN0eWxlLmhlaWdodCA9IGJvZHkuaGVpZ2h0ICsgXCJlbVwiO1xuICAgIGJvdHRvbVN0cnV0LnN0eWxlLmhlaWdodCA9IChib2R5LmhlaWdodCArIGJvZHkuZGVwdGgpICsgXCJlbVwiO1xuICAgIC8vIFdlJ2QgbGlrZSB0byB1c2UgYHZlcnRpY2FsLWFsaWduOiB0b3BgIGJ1dCBpbiBJRSA5IHRoaXMgbG93ZXJzIHRoZVxuICAgIC8vIGJhc2VsaW5lIG9mIHRoZSBib3ggdG8gdGhlIGJvdHRvbSBvZiB0aGlzIHN0cnV0IChpbnN0ZWFkIHN0YXlpbmcgaW4gdGhlXG4gICAgLy8gbm9ybWFsIHBsYWNlKSBzbyB3ZSB1c2UgYW4gYWJzb2x1dGUgdmFsdWUgZm9yIHZlcnRpY2FsLWFsaWduIGluc3RlYWRcbiAgICBib3R0b21TdHJ1dC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gLWJvZHkuZGVwdGggKyBcImVtXCI7XG5cbiAgICAvLyBXcmFwIHRoZSBzdHJ1dHMgYW5kIGJvZHkgdG9nZXRoZXJcbiAgICB2YXIgaHRtbE5vZGUgPSBtYWtlU3BhbihbXCJrYXRleC1odG1sXCJdLCBbdG9wU3RydXQsIGJvdHRvbVN0cnV0LCBib2R5XSk7XG5cbiAgICBodG1sTm9kZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG5cbiAgICByZXR1cm4gaHRtbE5vZGU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkSFRNTDtcbiIsIi8qKlxuICogVGhpcyBmaWxlIGNvbnZlcnRzIGEgcGFyc2UgdHJlZSBpbnRvIGEgY29vcmVzcG9uZGluZyBNYXRoTUwgdHJlZS4gVGhlIG1haW5cbiAqIGVudHJ5IHBvaW50IGlzIHRoZSBgYnVpbGRNYXRoTUxgIGZ1bmN0aW9uLCB3aGljaCB0YWtlcyBhIHBhcnNlIHRyZWUgZnJvbSB0aGVcbiAqIHBhcnNlci5cbiAqL1xuXG52YXIgYnVpbGRDb21tb24gPSByZXF1aXJlKFwiLi9idWlsZENvbW1vblwiKTtcbnZhciBmb250TWV0cmljcyA9IHJlcXVpcmUoXCIuL2ZvbnRNZXRyaWNzXCIpO1xudmFyIG1hdGhNTFRyZWUgPSByZXF1aXJlKFwiLi9tYXRoTUxUcmVlXCIpO1xudmFyIFBhcnNlRXJyb3IgPSByZXF1aXJlKFwiLi9QYXJzZUVycm9yXCIpO1xudmFyIHN5bWJvbHMgPSByZXF1aXJlKFwiLi9zeW1ib2xzXCIpO1xudmFyIHV0aWxzID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5cbnZhciBtYWtlU3BhbiA9IGJ1aWxkQ29tbW9uLm1ha2VTcGFuO1xudmFyIGZvbnRNYXAgPSBidWlsZENvbW1vbi5mb250TWFwO1xuXG4vKipcbiAqIFRha2VzIGEgc3ltYm9sIGFuZCBjb252ZXJ0cyBpdCBpbnRvIGEgTWF0aE1MIHRleHQgbm9kZSBhZnRlciBwZXJmb3JtaW5nXG4gKiBvcHRpb25hbCByZXBsYWNlbWVudCBmcm9tIHN5bWJvbHMuanMuXG4gKi9cbnZhciBtYWtlVGV4dCA9IGZ1bmN0aW9uKHRleHQsIG1vZGUpIHtcbiAgICBpZiAoc3ltYm9sc1ttb2RlXVt0ZXh0XSAmJiBzeW1ib2xzW21vZGVdW3RleHRdLnJlcGxhY2UpIHtcbiAgICAgICAgdGV4dCA9IHN5bWJvbHNbbW9kZV1bdGV4dF0ucmVwbGFjZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IG1hdGhNTFRyZWUuVGV4dE5vZGUodGV4dCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1hdGggdmFyaWFudCBhcyBhIHN0cmluZyBvciBudWxsIGlmIG5vbmUgaXMgcmVxdWlyZWQuXG4gKi9cbnZhciBnZXRWYXJpYW50ID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMpIHtcbiAgICB2YXIgZm9udCA9IG9wdGlvbnMuZm9udDtcbiAgICBpZiAoIWZvbnQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIG1vZGUgPSBncm91cC5tb2RlO1xuICAgIGlmIChmb250ID09PSBcIm1hdGhpdFwiKSB7XG4gICAgICAgIHJldHVybiBcIml0YWxpY1wiO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZSA9IGdyb3VwLnZhbHVlO1xuICAgIGlmICh1dGlscy5jb250YWlucyhbXCJcXFxcaW1hdGhcIiwgXCJcXFxcam1hdGhcIl0sIHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoc3ltYm9sc1ttb2RlXVt2YWx1ZV0gJiYgc3ltYm9sc1ttb2RlXVt2YWx1ZV0ucmVwbGFjZSkge1xuICAgICAgICB2YWx1ZSA9IHN5bWJvbHNbbW9kZV1bdmFsdWVdLnJlcGxhY2U7XG4gICAgfVxuXG4gICAgdmFyIGZvbnROYW1lID0gZm9udE1hcFtmb250XS5mb250TmFtZTtcbiAgICBpZiAoZm9udE1ldHJpY3MuZ2V0Q2hhcmFjdGVyTWV0cmljcyh2YWx1ZSwgZm9udE5hbWUpKSB7XG4gICAgICAgIHJldHVybiBmb250TWFwW29wdGlvbnMuZm9udF0udmFyaWFudDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogRnVuY3Rpb25zIGZvciBoYW5kbGluZyB0aGUgZGlmZmVyZW50IHR5cGVzIG9mIGdyb3VwcyBmb3VuZCBpbiB0aGUgcGFyc2VcbiAqIHRyZWUuIEVhY2ggZnVuY3Rpb24gc2hvdWxkIHRha2UgYSBwYXJzZSBncm91cCBhbmQgcmV0dXJuIGEgTWF0aE1MIG5vZGUuXG4gKi9cbnZhciBncm91cFR5cGVzID0ge307XG5cbmdyb3VwVHlwZXMubWF0aG9yZCA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zKSB7XG4gICAgdmFyIG5vZGUgPSBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcbiAgICAgICAgXCJtaVwiLFxuICAgICAgICBbbWFrZVRleHQoZ3JvdXAudmFsdWUsIGdyb3VwLm1vZGUpXSk7XG5cbiAgICB2YXIgdmFyaWFudCA9IGdldFZhcmlhbnQoZ3JvdXAsIG9wdGlvbnMpO1xuICAgIGlmICh2YXJpYW50KSB7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKFwibWF0aHZhcmlhbnRcIiwgdmFyaWFudCk7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufTtcblxuZ3JvdXBUeXBlcy50ZXh0b3JkID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMpIHtcbiAgICB2YXIgdGV4dCA9IG1ha2VUZXh0KGdyb3VwLnZhbHVlLCBncm91cC5tb2RlKTtcblxuICAgIHZhciB2YXJpYW50ID0gZ2V0VmFyaWFudChncm91cCwgb3B0aW9ucykgfHwgXCJub3JtYWxcIjtcblxuICAgIHZhciBub2RlO1xuICAgIGlmICgvWzAtOV0vLnRlc3QoZ3JvdXAudmFsdWUpKSB7XG4gICAgICAgIC8vIFRPRE8oa2V2aW5iKSBtZXJnZSBhZGphY2VudCA8bW4+IG5vZGVzXG4gICAgICAgIC8vIGRvIGl0IGFzIGEgcG9zdCBwcm9jZXNzaW5nIHN0ZXBcbiAgICAgICAgbm9kZSA9IG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFwibW5cIiwgW3RleHRdKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZm9udCkge1xuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoXCJtYXRodmFyaWFudFwiLCB2YXJpYW50KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUgPSBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcIm1pXCIsIFt0ZXh0XSk7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKFwibWF0aHZhcmlhbnRcIiwgdmFyaWFudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG59O1xuXG5ncm91cFR5cGVzLmJpbiA9IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgdmFyIG5vZGUgPSBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcbiAgICAgICAgXCJtb1wiLCBbbWFrZVRleHQoZ3JvdXAudmFsdWUsIGdyb3VwLm1vZGUpXSk7XG5cbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbmdyb3VwVHlwZXMucmVsID0gZnVuY3Rpb24oZ3JvdXApIHtcbiAgICB2YXIgbm9kZSA9IG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFxuICAgICAgICBcIm1vXCIsIFttYWtlVGV4dChncm91cC52YWx1ZSwgZ3JvdXAubW9kZSldKTtcblxuICAgIHJldHVybiBub2RlO1xufTtcblxuZ3JvdXBUeXBlcy5vcGVuID0gZnVuY3Rpb24oZ3JvdXApIHtcbiAgICB2YXIgbm9kZSA9IG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFxuICAgICAgICBcIm1vXCIsIFttYWtlVGV4dChncm91cC52YWx1ZSwgZ3JvdXAubW9kZSldKTtcblxuICAgIHJldHVybiBub2RlO1xufTtcblxuZ3JvdXBUeXBlcy5jbG9zZSA9IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgdmFyIG5vZGUgPSBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcbiAgICAgICAgXCJtb1wiLCBbbWFrZVRleHQoZ3JvdXAudmFsdWUsIGdyb3VwLm1vZGUpXSk7XG5cbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbmdyb3VwVHlwZXMuaW5uZXIgPSBmdW5jdGlvbihncm91cCkge1xuICAgIHZhciBub2RlID0gbmV3IG1hdGhNTFRyZWUuTWF0aE5vZGUoXG4gICAgICAgIFwibW9cIiwgW21ha2VUZXh0KGdyb3VwLnZhbHVlLCBncm91cC5tb2RlKV0pO1xuXG4gICAgcmV0dXJuIG5vZGU7XG59O1xuXG5ncm91cFR5cGVzLnB1bmN0ID0gZnVuY3Rpb24oZ3JvdXApIHtcbiAgICB2YXIgbm9kZSA9IG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFxuICAgICAgICBcIm1vXCIsIFttYWtlVGV4dChncm91cC52YWx1ZSwgZ3JvdXAubW9kZSldKTtcblxuICAgIG5vZGUuc2V0QXR0cmlidXRlKFwic2VwYXJhdG9yXCIsIFwidHJ1ZVwiKTtcblxuICAgIHJldHVybiBub2RlO1xufTtcblxuZ3JvdXBUeXBlcy5vcmRncm91cCA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zKSB7XG4gICAgdmFyIGlubmVyID0gYnVpbGRFeHByZXNzaW9uKGdyb3VwLnZhbHVlLCBvcHRpb25zKTtcblxuICAgIHZhciBub2RlID0gbmV3IG1hdGhNTFRyZWUuTWF0aE5vZGUoXCJtcm93XCIsIGlubmVyKTtcblxuICAgIHJldHVybiBub2RlO1xufTtcblxuZ3JvdXBUeXBlcy50ZXh0ID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMpIHtcbiAgICB2YXIgaW5uZXIgPSBidWlsZEV4cHJlc3Npb24oZ3JvdXAudmFsdWUuYm9keSwgb3B0aW9ucyk7XG5cbiAgICB2YXIgbm9kZSA9IG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFwibXRleHRcIiwgaW5uZXIpO1xuXG4gICAgcmV0dXJuIG5vZGU7XG59O1xuXG5ncm91cFR5cGVzLmNvbG9yID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMpIHtcbiAgICB2YXIgaW5uZXIgPSBidWlsZEV4cHJlc3Npb24oZ3JvdXAudmFsdWUudmFsdWUsIG9wdGlvbnMpO1xuXG4gICAgdmFyIG5vZGUgPSBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcIm1zdHlsZVwiLCBpbm5lcik7XG5cbiAgICBub2RlLnNldEF0dHJpYnV0ZShcIm1hdGhjb2xvclwiLCBncm91cC52YWx1ZS5jb2xvcik7XG5cbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbmdyb3VwVHlwZXMuc3Vwc3ViID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBbYnVpbGRHcm91cChncm91cC52YWx1ZS5iYXNlLCBvcHRpb25zKV07XG5cbiAgICBpZiAoZ3JvdXAudmFsdWUuc3ViKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goYnVpbGRHcm91cChncm91cC52YWx1ZS5zdWIsIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICBpZiAoZ3JvdXAudmFsdWUuc3VwKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goYnVpbGRHcm91cChncm91cC52YWx1ZS5zdXAsIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICB2YXIgbm9kZVR5cGU7XG4gICAgaWYgKCFncm91cC52YWx1ZS5zdWIpIHtcbiAgICAgICAgbm9kZVR5cGUgPSBcIm1zdXBcIjtcbiAgICB9IGVsc2UgaWYgKCFncm91cC52YWx1ZS5zdXApIHtcbiAgICAgICAgbm9kZVR5cGUgPSBcIm1zdWJcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBub2RlVHlwZSA9IFwibXN1YnN1cFwiO1xuICAgIH1cblxuICAgIHZhciBub2RlID0gbmV3IG1hdGhNTFRyZWUuTWF0aE5vZGUobm9kZVR5cGUsIGNoaWxkcmVuKTtcblxuICAgIHJldHVybiBub2RlO1xufTtcblxuZ3JvdXBUeXBlcy5nZW5mcmFjID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMpIHtcbiAgICB2YXIgbm9kZSA9IG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFxuICAgICAgICBcIm1mcmFjXCIsXG4gICAgICAgIFtidWlsZEdyb3VwKGdyb3VwLnZhbHVlLm51bWVyLCBvcHRpb25zKSxcbiAgICAgICAgIGJ1aWxkR3JvdXAoZ3JvdXAudmFsdWUuZGVub20sIG9wdGlvbnMpXSk7XG5cbiAgICBpZiAoIWdyb3VwLnZhbHVlLmhhc0JhckxpbmUpIHtcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoXCJsaW5ldGhpY2tuZXNzXCIsIFwiMHB4XCIpO1xuICAgIH1cblxuICAgIGlmIChncm91cC52YWx1ZS5sZWZ0RGVsaW0gIT0gbnVsbCB8fCBncm91cC52YWx1ZS5yaWdodERlbGltICE9IG51bGwpIHtcbiAgICAgICAgdmFyIHdpdGhEZWxpbXMgPSBbXTtcblxuICAgICAgICBpZiAoZ3JvdXAudmFsdWUubGVmdERlbGltICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBsZWZ0T3AgPSBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcbiAgICAgICAgICAgICAgICBcIm1vXCIsIFtuZXcgbWF0aE1MVHJlZS5UZXh0Tm9kZShncm91cC52YWx1ZS5sZWZ0RGVsaW0pXSk7XG5cbiAgICAgICAgICAgIGxlZnRPcC5zZXRBdHRyaWJ1dGUoXCJmZW5jZVwiLCBcInRydWVcIik7XG5cbiAgICAgICAgICAgIHdpdGhEZWxpbXMucHVzaChsZWZ0T3ApO1xuICAgICAgICB9XG5cbiAgICAgICAgd2l0aERlbGltcy5wdXNoKG5vZGUpO1xuXG4gICAgICAgIGlmIChncm91cC52YWx1ZS5yaWdodERlbGltICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhciByaWdodE9wID0gbmV3IG1hdGhNTFRyZWUuTWF0aE5vZGUoXG4gICAgICAgICAgICAgICAgXCJtb1wiLCBbbmV3IG1hdGhNTFRyZWUuVGV4dE5vZGUoZ3JvdXAudmFsdWUucmlnaHREZWxpbSldKTtcblxuICAgICAgICAgICAgcmlnaHRPcC5zZXRBdHRyaWJ1dGUoXCJmZW5jZVwiLCBcInRydWVcIik7XG5cbiAgICAgICAgICAgIHdpdGhEZWxpbXMucHVzaChyaWdodE9wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvdXRlck5vZGUgPSBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcIm1yb3dcIiwgd2l0aERlbGltcyk7XG5cbiAgICAgICAgcmV0dXJuIG91dGVyTm9kZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbmdyb3VwVHlwZXMuYXJyYXkgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcbiAgICAgICAgXCJtdGFibGVcIiwgZ3JvdXAudmFsdWUuYm9keS5tYXAoZnVuY3Rpb24ocm93KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IG1hdGhNTFRyZWUuTWF0aE5vZGUoXG4gICAgICAgICAgICAgICAgXCJtdHJcIiwgcm93Lm1hcChmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibXRkXCIsIFtidWlsZEdyb3VwKGNlbGwsIG9wdGlvbnMpXSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KSk7XG59O1xuXG5ncm91cFR5cGVzLnNxcnQgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucykge1xuICAgIHZhciBub2RlO1xuICAgIGlmIChncm91cC52YWx1ZS5pbmRleCkge1xuICAgICAgICBub2RlID0gbmV3IG1hdGhNTFRyZWUuTWF0aE5vZGUoXG4gICAgICAgICAgICBcIm1yb290XCIsIFtcbiAgICAgICAgICAgICAgICBidWlsZEdyb3VwKGdyb3VwLnZhbHVlLmJvZHksIG9wdGlvbnMpLFxuICAgICAgICAgICAgICAgIGJ1aWxkR3JvdXAoZ3JvdXAudmFsdWUuaW5kZXgsIG9wdGlvbnMpLFxuICAgICAgICAgICAgXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZSA9IG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFxuICAgICAgICAgICAgXCJtc3FydFwiLCBbYnVpbGRHcm91cChncm91cC52YWx1ZS5ib2R5LCBvcHRpb25zKV0pO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xufTtcblxuZ3JvdXBUeXBlcy5sZWZ0cmlnaHQgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucykge1xuICAgIHZhciBpbm5lciA9IGJ1aWxkRXhwcmVzc2lvbihncm91cC52YWx1ZS5ib2R5LCBvcHRpb25zKTtcblxuICAgIGlmIChncm91cC52YWx1ZS5sZWZ0ICE9PSBcIi5cIikge1xuICAgICAgICB2YXIgbGVmdE5vZGUgPSBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcbiAgICAgICAgICAgIFwibW9cIiwgW21ha2VUZXh0KGdyb3VwLnZhbHVlLmxlZnQsIGdyb3VwLm1vZGUpXSk7XG5cbiAgICAgICAgbGVmdE5vZGUuc2V0QXR0cmlidXRlKFwiZmVuY2VcIiwgXCJ0cnVlXCIpO1xuXG4gICAgICAgIGlubmVyLnVuc2hpZnQobGVmdE5vZGUpO1xuICAgIH1cblxuICAgIGlmIChncm91cC52YWx1ZS5yaWdodCAhPT0gXCIuXCIpIHtcbiAgICAgICAgdmFyIHJpZ2h0Tm9kZSA9IG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFxuICAgICAgICAgICAgXCJtb1wiLCBbbWFrZVRleHQoZ3JvdXAudmFsdWUucmlnaHQsIGdyb3VwLm1vZGUpXSk7XG5cbiAgICAgICAgcmlnaHROb2RlLnNldEF0dHJpYnV0ZShcImZlbmNlXCIsIFwidHJ1ZVwiKTtcblxuICAgICAgICBpbm5lci5wdXNoKHJpZ2h0Tm9kZSk7XG4gICAgfVxuXG4gICAgdmFyIG91dGVyTm9kZSA9IG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFwibXJvd1wiLCBpbm5lcik7XG5cbiAgICByZXR1cm4gb3V0ZXJOb2RlO1xufTtcblxuZ3JvdXBUeXBlcy5hY2NlbnQgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucykge1xuICAgIHZhciBhY2NlbnROb2RlID0gbmV3IG1hdGhNTFRyZWUuTWF0aE5vZGUoXG4gICAgICAgIFwibW9cIiwgW21ha2VUZXh0KGdyb3VwLnZhbHVlLmFjY2VudCwgZ3JvdXAubW9kZSldKTtcblxuICAgIHZhciBub2RlID0gbmV3IG1hdGhNTFRyZWUuTWF0aE5vZGUoXG4gICAgICAgIFwibW92ZXJcIixcbiAgICAgICAgW2J1aWxkR3JvdXAoZ3JvdXAudmFsdWUuYmFzZSwgb3B0aW9ucyksXG4gICAgICAgICBhY2NlbnROb2RlXSk7XG5cbiAgICBub2RlLnNldEF0dHJpYnV0ZShcImFjY2VudFwiLCBcInRydWVcIik7XG5cbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbmdyb3VwVHlwZXMuc3BhY2luZyA9IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgdmFyIG5vZGU7XG5cbiAgICBpZiAoZ3JvdXAudmFsdWUgPT09IFwiXFxcXCBcIiB8fCBncm91cC52YWx1ZSA9PT0gXCJcXFxcc3BhY2VcIiB8fFxuICAgICAgICBncm91cC52YWx1ZSA9PT0gXCIgXCIgfHwgZ3JvdXAudmFsdWUgPT09IFwiflwiKSB7XG4gICAgICAgIG5vZGUgPSBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcbiAgICAgICAgICAgIFwibXRleHRcIiwgW25ldyBtYXRoTUxUcmVlLlRleHROb2RlKFwiXFx1MDBhMFwiKV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUgPSBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcIm1zcGFjZVwiKTtcblxuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIFwid2lkdGhcIiwgYnVpbGRDb21tb24uc3BhY2luZ0Z1bmN0aW9uc1tncm91cC52YWx1ZV0uc2l6ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG59O1xuXG5ncm91cFR5cGVzLm9wID0gZnVuY3Rpb24oZ3JvdXApIHtcbiAgICB2YXIgbm9kZTtcblxuICAgIC8vIFRPRE8oZW1pbHkpOiBoYW5kbGUgYmlnIG9wZXJhdG9ycyB1c2luZyB0aGUgYGxhcmdlb3BgIGF0dHJpYnV0ZVxuXG4gICAgaWYgKGdyb3VwLnZhbHVlLnN5bWJvbCkge1xuICAgICAgICAvLyBUaGlzIGlzIGEgc3ltYm9sLiBKdXN0IGFkZCB0aGUgc3ltYm9sLlxuICAgICAgICBub2RlID0gbmV3IG1hdGhNTFRyZWUuTWF0aE5vZGUoXG4gICAgICAgICAgICBcIm1vXCIsIFttYWtlVGV4dChncm91cC52YWx1ZS5ib2R5LCBncm91cC5tb2RlKV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoaXMgaXMgYSB0ZXh0IG9wZXJhdG9yLiBBZGQgYWxsIG9mIHRoZSBjaGFyYWN0ZXJzIGZyb20gdGhlXG4gICAgICAgIC8vIG9wZXJhdG9yJ3MgbmFtZS5cbiAgICAgICAgLy8gVE9ETyhlbWlseSk6IEFkZCBhIHNwYWNlIGluIHRoZSBtaWRkbGUgb2Ygc29tZSBvZiB0aGVzZVxuICAgICAgICAvLyBvcGVyYXRvcnMsIGxpa2UgXFxsaW1zdXAuXG4gICAgICAgIG5vZGUgPSBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcbiAgICAgICAgICAgIFwibWlcIiwgW25ldyBtYXRoTUxUcmVlLlRleHROb2RlKGdyb3VwLnZhbHVlLmJvZHkuc2xpY2UoMSkpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG59O1xuXG5ncm91cFR5cGVzLmthdGV4ID0gZnVuY3Rpb24oZ3JvdXApIHtcbiAgICB2YXIgbm9kZSA9IG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFxuICAgICAgICBcIm10ZXh0XCIsIFtuZXcgbWF0aE1MVHJlZS5UZXh0Tm9kZShcIkthVGVYXCIpXSk7XG5cbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbmdyb3VwVHlwZXMuZm9udCA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zKSB7XG4gICAgdmFyIGZvbnQgPSBncm91cC52YWx1ZS5mb250O1xuICAgIHJldHVybiBidWlsZEdyb3VwKGdyb3VwLnZhbHVlLmJvZHksIG9wdGlvbnMud2l0aEZvbnQoZm9udCkpO1xufTtcblxuZ3JvdXBUeXBlcy5kZWxpbXNpemluZyA9IGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gW107XG5cbiAgICBpZiAoZ3JvdXAudmFsdWUudmFsdWUgIT09IFwiLlwiKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2gobWFrZVRleHQoZ3JvdXAudmFsdWUudmFsdWUsIGdyb3VwLm1vZGUpKTtcbiAgICB9XG5cbiAgICB2YXIgbm9kZSA9IG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFwibW9cIiwgY2hpbGRyZW4pO1xuXG4gICAgaWYgKGdyb3VwLnZhbHVlLmRlbGltVHlwZSA9PT0gXCJvcGVuXCIgfHxcbiAgICAgICAgZ3JvdXAudmFsdWUuZGVsaW1UeXBlID09PSBcImNsb3NlXCIpIHtcbiAgICAgICAgLy8gT25seSBzb21lIG9mIHRoZSBkZWxpbXNpemluZyBmdW5jdGlvbnMgYWN0IGFzIGZlbmNlcywgYW5kIHRoZXlcbiAgICAgICAgLy8gcmV0dXJuIFwib3BlblwiIG9yIFwiY2xvc2VcIiBkZWxpbVR5cGVzLlxuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcImZlbmNlXCIsIFwidHJ1ZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBFeHBsaWNpdGx5IGRpc2FibGUgZmVuY2luZyBpZiBpdCdzIG5vdCBhIGZlbmNlLCB0byBvdmVycmlkZSB0aGVcbiAgICAgICAgLy8gZGVmYXVsdHMuXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKFwiZmVuY2VcIiwgXCJmYWxzZVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbmdyb3VwVHlwZXMuc3R5bGluZyA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zKSB7XG4gICAgdmFyIGlubmVyID0gYnVpbGRFeHByZXNzaW9uKGdyb3VwLnZhbHVlLnZhbHVlLCBvcHRpb25zKTtcblxuICAgIHZhciBub2RlID0gbmV3IG1hdGhNTFRyZWUuTWF0aE5vZGUoXCJtc3R5bGVcIiwgaW5uZXIpO1xuXG4gICAgdmFyIHN0eWxlQXR0cmlidXRlcyA9IHtcbiAgICAgICAgXCJkaXNwbGF5XCI6IFtcIjBcIiwgXCJ0cnVlXCJdLFxuICAgICAgICBcInRleHRcIjogW1wiMFwiLCBcImZhbHNlXCJdLFxuICAgICAgICBcInNjcmlwdFwiOiBbXCIxXCIsIFwiZmFsc2VcIl0sXG4gICAgICAgIFwic2NyaXB0c2NyaXB0XCI6IFtcIjJcIiwgXCJmYWxzZVwiXSxcbiAgICB9O1xuXG4gICAgdmFyIGF0dHIgPSBzdHlsZUF0dHJpYnV0ZXNbZ3JvdXAudmFsdWUuc3R5bGVdO1xuXG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoXCJzY3JpcHRsZXZlbFwiLCBhdHRyWzBdKTtcbiAgICBub2RlLnNldEF0dHJpYnV0ZShcImRpc3BsYXlzdHlsZVwiLCBhdHRyWzFdKTtcblxuICAgIHJldHVybiBub2RlO1xufTtcblxuZ3JvdXBUeXBlcy5zaXppbmcgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucykge1xuICAgIHZhciBpbm5lciA9IGJ1aWxkRXhwcmVzc2lvbihncm91cC52YWx1ZS52YWx1ZSwgb3B0aW9ucyk7XG5cbiAgICB2YXIgbm9kZSA9IG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFwibXN0eWxlXCIsIGlubmVyKTtcblxuICAgIC8vIFRPRE8oZW1pbHkpOiBUaGlzIGRvZXNuJ3QgcHJvZHVjZSB0aGUgY29ycmVjdCBzaXplIGZvciBuZXN0ZWQgc2l6ZVxuICAgIC8vIGNoYW5nZXMsIGJlY2F1c2Ugd2UgZG9uJ3Qga2VlcCBzdGF0ZSBvZiB3aGF0IHN0eWxlIHdlJ3JlIGN1cnJlbnRseVxuICAgIC8vIGluLCBzbyB3ZSBjYW4ndCByZXNldCB0aGUgc2l6ZSB0byBub3JtYWwgYmVmb3JlIGNoYW5naW5nIGl0LiAgTm93XG4gICAgLy8gdGhhdCB3ZSdyZSBwYXNzaW5nIGFuIG9wdGlvbnMgcGFyYW1ldGVyIHdlIHNob3VsZCBiZSBhYmxlIHRvIGZpeFxuICAgIC8vIHRoaXMuXG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwibWF0aHNpemVcIiwgYnVpbGRDb21tb24uc2l6aW5nTXVsdGlwbGllcltncm91cC52YWx1ZS5zaXplXSArIFwiZW1cIik7XG5cbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbmdyb3VwVHlwZXMub3ZlcmxpbmUgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucykge1xuICAgIHZhciBvcGVyYXRvciA9IG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFxuICAgICAgICBcIm1vXCIsIFtuZXcgbWF0aE1MVHJlZS5UZXh0Tm9kZShcIlxcdTIwM2VcIildKTtcbiAgICBvcGVyYXRvci5zZXRBdHRyaWJ1dGUoXCJzdHJldGNoeVwiLCBcInRydWVcIik7XG5cbiAgICB2YXIgbm9kZSA9IG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFxuICAgICAgICBcIm1vdmVyXCIsXG4gICAgICAgIFtidWlsZEdyb3VwKGdyb3VwLnZhbHVlLmJvZHksIG9wdGlvbnMpLFxuICAgICAgICAgb3BlcmF0b3JdKTtcbiAgICBub2RlLnNldEF0dHJpYnV0ZShcImFjY2VudFwiLCBcInRydWVcIik7XG5cbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbmdyb3VwVHlwZXMudW5kZXJsaW5lID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMpIHtcbiAgICB2YXIgb3BlcmF0b3IgPSBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcbiAgICAgICAgXCJtb1wiLCBbbmV3IG1hdGhNTFRyZWUuVGV4dE5vZGUoXCJcXHUyMDNlXCIpXSk7XG4gICAgb3BlcmF0b3Iuc2V0QXR0cmlidXRlKFwic3RyZXRjaHlcIiwgXCJ0cnVlXCIpO1xuXG4gICAgdmFyIG5vZGUgPSBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcbiAgICAgICAgXCJtdW5kZXJcIixcbiAgICAgICAgW2J1aWxkR3JvdXAoZ3JvdXAudmFsdWUuYm9keSwgb3B0aW9ucyksXG4gICAgICAgICBvcGVyYXRvcl0pO1xuICAgIG5vZGUuc2V0QXR0cmlidXRlKFwiYWNjZW50dW5kZXJcIiwgXCJ0cnVlXCIpO1xuXG4gICAgcmV0dXJuIG5vZGU7XG59O1xuXG5ncm91cFR5cGVzLnJ1bGUgPSBmdW5jdGlvbihncm91cCkge1xuICAgIC8vIFRPRE8oZW1pbHkpOiBGaWd1cmUgb3V0IGlmIHRoZXJlJ3MgYW4gYWN0dWFsIHdheSB0byBkcmF3IGJsYWNrIGJveGVzXG4gICAgLy8gaW4gTWF0aE1MLlxuICAgIHZhciBub2RlID0gbmV3IG1hdGhNTFRyZWUuTWF0aE5vZGUoXCJtcm93XCIpO1xuXG4gICAgcmV0dXJuIG5vZGU7XG59O1xuXG5ncm91cFR5cGVzLmxsYXAgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucykge1xuICAgIHZhciBub2RlID0gbmV3IG1hdGhNTFRyZWUuTWF0aE5vZGUoXG4gICAgICAgIFwibXBhZGRlZFwiLCBbYnVpbGRHcm91cChncm91cC52YWx1ZS5ib2R5LCBvcHRpb25zKV0pO1xuXG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoXCJsc3BhY2VcIiwgXCItMXdpZHRoXCIpO1xuICAgIG5vZGUuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgXCIwcHhcIik7XG5cbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbmdyb3VwVHlwZXMucmxhcCA9IGZ1bmN0aW9uKGdyb3VwLCBvcHRpb25zKSB7XG4gICAgdmFyIG5vZGUgPSBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcbiAgICAgICAgXCJtcGFkZGVkXCIsIFtidWlsZEdyb3VwKGdyb3VwLnZhbHVlLmJvZHksIG9wdGlvbnMpXSk7XG5cbiAgICBub2RlLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIFwiMHB4XCIpO1xuXG4gICAgcmV0dXJuIG5vZGU7XG59O1xuXG5ncm91cFR5cGVzLnBoYW50b20gPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucywgcHJldikge1xuICAgIHZhciBpbm5lciA9IGJ1aWxkRXhwcmVzc2lvbihncm91cC52YWx1ZS52YWx1ZSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFwibXBoYW50b21cIiwgaW5uZXIpO1xufTtcblxuLyoqXG4gKiBUYWtlcyBhIGxpc3Qgb2Ygbm9kZXMsIGJ1aWxkcyB0aGVtLCBhbmQgcmV0dXJucyBhIGxpc3Qgb2YgdGhlIGdlbmVyYXRlZFxuICogTWF0aE1MIG5vZGVzLiBBIGxpdHRsZSBzaW1wbGVyIHRoYW4gdGhlIEhUTUwgdmVyc2lvbiBiZWNhdXNlIHdlIGRvbid0IGRvIGFueVxuICogcHJldmlvdXMtbm9kZSBoYW5kbGluZy5cbiAqL1xudmFyIGJ1aWxkRXhwcmVzc2lvbiA9IGZ1bmN0aW9uKGV4cHJlc3Npb24sIG9wdGlvbnMpIHtcbiAgICB2YXIgZ3JvdXBzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHByZXNzaW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBncm91cCA9IGV4cHJlc3Npb25baV07XG4gICAgICAgIGdyb3Vwcy5wdXNoKGJ1aWxkR3JvdXAoZ3JvdXAsIG9wdGlvbnMpKTtcbiAgICB9XG4gICAgcmV0dXJuIGdyb3Vwcztcbn07XG5cbi8qKlxuICogVGFrZXMgYSBncm91cCBmcm9tIHRoZSBwYXJzZXIgYW5kIGNhbGxzIHRoZSBhcHByb3ByaWF0ZSBncm91cFR5cGVzIGZ1bmN0aW9uXG4gKiBvbiBpdCB0byBwcm9kdWNlIGEgTWF0aE1MIG5vZGUuXG4gKi9cbnZhciBidWlsZEdyb3VwID0gZnVuY3Rpb24oZ3JvdXAsIG9wdGlvbnMpIHtcbiAgICBpZiAoIWdyb3VwKSB7XG4gICAgICAgIHJldHVybiBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcIm1yb3dcIik7XG4gICAgfVxuXG4gICAgaWYgKGdyb3VwVHlwZXNbZ3JvdXAudHlwZV0pIHtcbiAgICAgICAgLy8gQ2FsbCB0aGUgZ3JvdXBUeXBlcyBmdW5jdGlvblxuICAgICAgICByZXR1cm4gZ3JvdXBUeXBlc1tncm91cC50eXBlXShncm91cCwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoXG4gICAgICAgICAgICBcIkdvdCBncm91cCBvZiB1bmtub3duIHR5cGU6ICdcIiArIGdyb3VwLnR5cGUgKyBcIidcIik7XG4gICAgfVxufTtcblxuLyoqXG4gKiBUYWtlcyBhIGZ1bGwgcGFyc2UgdHJlZSBhbmQgc2V0dGluZ3MgYW5kIGJ1aWxkcyBhIE1hdGhNTCByZXByZXNlbnRhdGlvbiBvZlxuICogaXQuIEluIHBhcnRpY3VsYXIsIHdlIHB1dCB0aGUgZWxlbWVudHMgZnJvbSBidWlsZGluZyB0aGUgcGFyc2UgdHJlZSBpbnRvIGFcbiAqIDxzZW1hbnRpY3M+IHRhZyBzbyB3ZSBjYW4gYWxzbyBpbmNsdWRlIHRoYXQgVGVYIHNvdXJjZSBhcyBhbiBhbm5vdGF0aW9uLlxuICpcbiAqIE5vdGUgdGhhdCB3ZSBhY3R1YWxseSByZXR1cm4gYSBkb21UcmVlIGVsZW1lbnQgd2l0aCBhIGA8bWF0aD5gIGluc2lkZSBpdCBzb1xuICogd2UgY2FuIGRvIGFwcHJvcHJpYXRlIHN0eWxpbmcuXG4gKi9cbnZhciBidWlsZE1hdGhNTCA9IGZ1bmN0aW9uKHRyZWUsIHRleEV4cHJlc3Npb24sIG9wdGlvbnMpIHtcbiAgICB2YXIgZXhwcmVzc2lvbiA9IGJ1aWxkRXhwcmVzc2lvbih0cmVlLCBvcHRpb25zKTtcblxuICAgIC8vIFdyYXAgdXAgdGhlIGV4cHJlc3Npb24gaW4gYW4gbXJvdyBzbyBpdCBpcyBwcmVzZW50ZWQgaW4gdGhlIHNlbWFudGljc1xuICAgIC8vIHRhZyBjb3JyZWN0bHkuXG4gICAgdmFyIHdyYXBwZXIgPSBuZXcgbWF0aE1MVHJlZS5NYXRoTm9kZShcIm1yb3dcIiwgZXhwcmVzc2lvbik7XG5cbiAgICAvLyBCdWlsZCBhIFRlWCBhbm5vdGF0aW9uIG9mIHRoZSBzb3VyY2VcbiAgICB2YXIgYW5ub3RhdGlvbiA9IG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFxuICAgICAgICBcImFubm90YXRpb25cIiwgW25ldyBtYXRoTUxUcmVlLlRleHROb2RlKHRleEV4cHJlc3Npb24pXSk7XG5cbiAgICBhbm5vdGF0aW9uLnNldEF0dHJpYnV0ZShcImVuY29kaW5nXCIsIFwiYXBwbGljYXRpb24veC10ZXhcIik7XG5cbiAgICB2YXIgc2VtYW50aWNzID0gbmV3IG1hdGhNTFRyZWUuTWF0aE5vZGUoXG4gICAgICAgIFwic2VtYW50aWNzXCIsIFt3cmFwcGVyLCBhbm5vdGF0aW9uXSk7XG5cbiAgICB2YXIgbWF0aCA9IG5ldyBtYXRoTUxUcmVlLk1hdGhOb2RlKFwibWF0aFwiLCBbc2VtYW50aWNzXSk7XG5cbiAgICAvLyBZb3UgY2FuJ3Qgc3R5bGUgPG1hdGg+IG5vZGVzLCBzbyB3ZSB3cmFwIHRoZSBub2RlIGluIGEgc3Bhbi5cbiAgICByZXR1cm4gbWFrZVNwYW4oW1wia2F0ZXgtbWF0aG1sXCJdLCBbbWF0aF0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBidWlsZE1hdGhNTDtcbiIsIi8qKlxuICogVGhpcyBmaWxlIGRlYWxzIHdpdGggY3JlYXRpbmcgZGVsaW1pdGVycyBvZiB2YXJpb3VzIHNpemVzLiBUaGUgVGVYYm9va1xuICogZGlzY3Vzc2VzIHRoZXNlIHJvdXRpbmVzIG9uIHBhZ2UgNDQxLTQ0MiwgaW4gdGhlIFwiQW5vdGhlciBzdWJyb3V0aW5lIHNldHMgYm94XG4gKiB4IHRvIGEgc3BlY2lmaWVkIHZhcmlhYmxlIGRlbGltaXRlclwiIHBhcmFncmFwaC5cbiAqXG4gKiBUaGVyZSBhcmUgdGhyZWUgbWFpbiByb3V0aW5lcyBoZXJlLiBgbWFrZVNtYWxsRGVsaW1gIG1ha2VzIGEgZGVsaW1pdGVyIGluIHRoZVxuICogbm9ybWFsIGZvbnQsIGJ1dCBpbiBlaXRoZXIgdGV4dCwgc2NyaXB0LCBvciBzY3JpcHRzY3JpcHQgc3R5bGUuXG4gKiBgbWFrZUxhcmdlRGVsaW1gIG1ha2VzIGEgZGVsaW1pdGVyIGluIHRleHRzdHlsZSwgYnV0IGluIG9uZSBvZiB0aGUgU2l6ZTEsXG4gKiBTaXplMiwgU2l6ZTMsIG9yIFNpemU0IGZvbnRzLiBgbWFrZVN0YWNrZWREZWxpbWAgbWFrZXMgYSBkZWxpbWl0ZXIgb3V0IG9mXG4gKiBzbWFsbGVyIHBpZWNlcyB0aGF0IGFyZSBzdGFja2VkIG9uIHRvcCBvZiBvbmUgYW5vdGhlci5cbiAqXG4gKiBUaGUgZnVuY3Rpb25zIHRha2UgYSBwYXJhbWV0ZXIgYGNlbnRlcmAsIHdoaWNoIGRldGVybWluZXMgaWYgdGhlIGRlbGltaXRlclxuICogc2hvdWxkIGJlIGNlbnRlcmVkIGFyb3VuZCB0aGUgYXhpcy5cbiAqXG4gKiBUaGVuLCB0aGVyZSBhcmUgdGhyZWUgZXhwb3NlZCBmdW5jdGlvbnMuIGBzaXplZERlbGltYCBtYWtlcyBhIGRlbGltaXRlciBpblxuICogb25lIG9mIHRoZSBnaXZlbiBzaXplcy4gVGhpcyBpcyB1c2VkIGZvciB0aGluZ3MgbGlrZSBgXFxiaWdsYC5cbiAqIGBjdXN0b21TaXplZERlbGltYCBtYWtlcyBhIGRlbGltaXRlciB3aXRoIGEgZ2l2ZW4gdG90YWwgaGVpZ2h0K2RlcHRoLiBJdCBpc1xuICogY2FsbGVkIGluIHBsYWNlcyBsaWtlIGBcXHNxcnRgLiBgbGVmdFJpZ2h0RGVsaW1gIG1ha2VzIGFuIGFwcHJvcHJpYXRlXG4gKiBkZWxpbWl0ZXIgd2hpY2ggc3Vycm91bmRzIGFuIGV4cHJlc3Npb24gb2YgYSBnaXZlbiBoZWlnaHQgYW4gZGVwdGguIEl0IGlzXG4gKiB1c2VkIGluIGBcXGxlZnRgIGFuZCBgXFxyaWdodGAuXG4gKi9cblxudmFyIFBhcnNlRXJyb3IgPSByZXF1aXJlKFwiLi9QYXJzZUVycm9yXCIpO1xudmFyIFN0eWxlID0gcmVxdWlyZShcIi4vU3R5bGVcIik7XG5cbnZhciBidWlsZENvbW1vbiA9IHJlcXVpcmUoXCIuL2J1aWxkQ29tbW9uXCIpO1xudmFyIGZvbnRNZXRyaWNzID0gcmVxdWlyZShcIi4vZm9udE1ldHJpY3NcIik7XG52YXIgc3ltYm9scyA9IHJlcXVpcmUoXCIuL3N5bWJvbHNcIik7XG52YXIgdXRpbHMgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcblxudmFyIG1ha2VTcGFuID0gYnVpbGRDb21tb24ubWFrZVNwYW47XG5cbi8qKlxuICogR2V0IHRoZSBtZXRyaWNzIGZvciBhIGdpdmVuIHN5bWJvbCBhbmQgZm9udCwgYWZ0ZXIgdHJhbnNmb3JtYXRpb24gKGkuZS5cbiAqIGFmdGVyIGZvbGxvd2luZyByZXBsYWNlbWVudCBmcm9tIHN5bWJvbHMuanMpXG4gKi9cbnZhciBnZXRNZXRyaWNzID0gZnVuY3Rpb24oc3ltYm9sLCBmb250KSB7XG4gICAgaWYgKHN5bWJvbHMubWF0aFtzeW1ib2xdICYmIHN5bWJvbHMubWF0aFtzeW1ib2xdLnJlcGxhY2UpIHtcbiAgICAgICAgcmV0dXJuIGZvbnRNZXRyaWNzLmdldENoYXJhY3Rlck1ldHJpY3MoXG4gICAgICAgICAgICBzeW1ib2xzLm1hdGhbc3ltYm9sXS5yZXBsYWNlLCBmb250KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZm9udE1ldHJpY3MuZ2V0Q2hhcmFjdGVyTWV0cmljcyhcbiAgICAgICAgICAgIHN5bWJvbCwgZm9udCk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBCdWlsZHMgYSBzeW1ib2wgaW4gdGhlIGdpdmVuIGZvbnQgc2l6ZSAobm90ZSBzaXplIGlzIGFuIGludGVnZXIpXG4gKi9cbnZhciBtYXRocm1TaXplID0gZnVuY3Rpb24odmFsdWUsIHNpemUsIG1vZGUpIHtcbiAgICByZXR1cm4gYnVpbGRDb21tb24ubWFrZVN5bWJvbCh2YWx1ZSwgXCJTaXplXCIgKyBzaXplICsgXCItUmVndWxhclwiLCBtb2RlKTtcbn07XG5cbi8qKlxuICogUHV0cyBhIGRlbGltaXRlciBzcGFuIGluIGEgZ2l2ZW4gc3R5bGUsIGFuZCBhZGRzIGFwcHJvcHJpYXRlIGhlaWdodCwgZGVwdGgsXG4gKiBhbmQgbWF4Rm9udFNpemVzLlxuICovXG52YXIgc3R5bGVXcmFwID0gZnVuY3Rpb24oZGVsaW0sIHRvU3R5bGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgc3BhbiA9IG1ha2VTcGFuKFxuICAgICAgICBbXCJzdHlsZS13cmFwXCIsIG9wdGlvbnMuc3R5bGUucmVzZXQoKSwgdG9TdHlsZS5jbHMoKV0sIFtkZWxpbV0pO1xuXG4gICAgdmFyIG11bHRpcGxpZXIgPSB0b1N0eWxlLnNpemVNdWx0aXBsaWVyIC8gb3B0aW9ucy5zdHlsZS5zaXplTXVsdGlwbGllcjtcblxuICAgIHNwYW4uaGVpZ2h0ICo9IG11bHRpcGxpZXI7XG4gICAgc3Bhbi5kZXB0aCAqPSBtdWx0aXBsaWVyO1xuICAgIHNwYW4ubWF4Rm9udFNpemUgPSB0b1N0eWxlLnNpemVNdWx0aXBsaWVyO1xuXG4gICAgcmV0dXJuIHNwYW47XG59O1xuXG4vKipcbiAqIE1ha2VzIGEgc21hbGwgZGVsaW1pdGVyLiBUaGlzIGlzIGEgZGVsaW1pdGVyIHRoYXQgY29tZXMgaW4gdGhlIE1haW4tUmVndWxhclxuICogZm9udCwgYnV0IGlzIHJlc3R5bGVkIHRvIGVpdGhlciBiZSBpbiB0ZXh0c3R5bGUsIHNjcmlwdHN0eWxlLCBvclxuICogc2NyaXB0c2NyaXB0c3R5bGUuXG4gKi9cbnZhciBtYWtlU21hbGxEZWxpbSA9IGZ1bmN0aW9uKGRlbGltLCBzdHlsZSwgY2VudGVyLCBvcHRpb25zLCBtb2RlKSB7XG4gICAgdmFyIHRleHQgPSBidWlsZENvbW1vbi5tYWtlU3ltYm9sKGRlbGltLCBcIk1haW4tUmVndWxhclwiLCBtb2RlKTtcblxuICAgIHZhciBzcGFuID0gc3R5bGVXcmFwKHRleHQsIHN0eWxlLCBvcHRpb25zKTtcblxuICAgIGlmIChjZW50ZXIpIHtcbiAgICAgICAgdmFyIHNoaWZ0ID1cbiAgICAgICAgICAgICgxIC0gb3B0aW9ucy5zdHlsZS5zaXplTXVsdGlwbGllciAvIHN0eWxlLnNpemVNdWx0aXBsaWVyKSAqXG4gICAgICAgICAgICBmb250TWV0cmljcy5tZXRyaWNzLmF4aXNIZWlnaHQ7XG5cbiAgICAgICAgc3Bhbi5zdHlsZS50b3AgPSBzaGlmdCArIFwiZW1cIjtcbiAgICAgICAgc3Bhbi5oZWlnaHQgLT0gc2hpZnQ7XG4gICAgICAgIHNwYW4uZGVwdGggKz0gc2hpZnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwYW47XG59O1xuXG4vKipcbiAqIE1ha2VzIGEgbGFyZ2UgZGVsaW1pdGVyLiBUaGlzIGlzIGEgZGVsaW1pdGVyIHRoYXQgY29tZXMgaW4gdGhlIFNpemUxLCBTaXplMixcbiAqIFNpemUzLCBvciBTaXplNCBmb250cy4gSXQgaXMgYWx3YXlzIHJlbmRlcmVkIGluIHRleHRzdHlsZS5cbiAqL1xudmFyIG1ha2VMYXJnZURlbGltID0gZnVuY3Rpb24oZGVsaW0sIHNpemUsIGNlbnRlciwgb3B0aW9ucywgbW9kZSkge1xuICAgIHZhciBpbm5lciA9IG1hdGhybVNpemUoZGVsaW0sIHNpemUsIG1vZGUpO1xuXG4gICAgdmFyIHNwYW4gPSBzdHlsZVdyYXAoXG4gICAgICAgIG1ha2VTcGFuKFtcImRlbGltc2l6aW5nXCIsIFwic2l6ZVwiICsgc2l6ZV0sXG4gICAgICAgICAgICAgICAgIFtpbm5lcl0sIG9wdGlvbnMuZ2V0Q29sb3IoKSksXG4gICAgICAgIFN0eWxlLlRFWFQsIG9wdGlvbnMpO1xuXG4gICAgaWYgKGNlbnRlcikge1xuICAgICAgICB2YXIgc2hpZnQgPSAoMSAtIG9wdGlvbnMuc3R5bGUuc2l6ZU11bHRpcGxpZXIpICpcbiAgICAgICAgICAgIGZvbnRNZXRyaWNzLm1ldHJpY3MuYXhpc0hlaWdodDtcblxuICAgICAgICBzcGFuLnN0eWxlLnRvcCA9IHNoaWZ0ICsgXCJlbVwiO1xuICAgICAgICBzcGFuLmhlaWdodCAtPSBzaGlmdDtcbiAgICAgICAgc3Bhbi5kZXB0aCArPSBzaGlmdDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3Bhbjtcbn07XG5cbi8qKlxuICogTWFrZSBhbiBpbm5lciBzcGFuIHdpdGggdGhlIGdpdmVuIG9mZnNldCBhbmQgaW4gdGhlIGdpdmVuIGZvbnQuIFRoaXMgaXMgdXNlZFxuICogaW4gYG1ha2VTdGFja2VkRGVsaW1gIHRvIG1ha2UgdGhlIHN0YWNraW5nIHBpZWNlcyBmb3IgdGhlIGRlbGltaXRlci5cbiAqL1xudmFyIG1ha2VJbm5lciA9IGZ1bmN0aW9uKHN5bWJvbCwgZm9udCwgbW9kZSkge1xuICAgIHZhciBzaXplQ2xhc3M7XG4gICAgLy8gQXBwbHkgdGhlIGNvcnJlY3QgQ1NTIGNsYXNzIHRvIGNob29zZSB0aGUgcmlnaHQgZm9udC5cbiAgICBpZiAoZm9udCA9PT0gXCJTaXplMS1SZWd1bGFyXCIpIHtcbiAgICAgICAgc2l6ZUNsYXNzID0gXCJkZWxpbS1zaXplMVwiO1xuICAgIH0gZWxzZSBpZiAoZm9udCA9PT0gXCJTaXplNC1SZWd1bGFyXCIpIHtcbiAgICAgICAgc2l6ZUNsYXNzID0gXCJkZWxpbS1zaXplNFwiO1xuICAgIH1cblxuICAgIHZhciBpbm5lciA9IG1ha2VTcGFuKFxuICAgICAgICBbXCJkZWxpbXNpemluZ2lubmVyXCIsIHNpemVDbGFzc10sXG4gICAgICAgIFttYWtlU3BhbihbXSwgW2J1aWxkQ29tbW9uLm1ha2VTeW1ib2woc3ltYm9sLCBmb250LCBtb2RlKV0pXSk7XG5cbiAgICAvLyBTaW5jZSB0aGlzIHdpbGwgYmUgcGFzc2VkIGludG8gYG1ha2VWTGlzdGAgaW4gdGhlIGVuZCwgd3JhcCB0aGUgZWxlbWVudFxuICAgIC8vIGluIHRoZSBhcHByb3ByaWF0ZSB0YWcgdGhhdCBWTGlzdCB1c2VzLlxuICAgIHJldHVybiB7dHlwZTogXCJlbGVtXCIsIGVsZW06IGlubmVyfTtcbn07XG5cbi8qKlxuICogTWFrZSBhIHN0YWNrZWQgZGVsaW1pdGVyIG91dCBvZiBhIGdpdmVuIGRlbGltaXRlciwgd2l0aCB0aGUgdG90YWwgaGVpZ2h0IGF0XG4gKiBsZWFzdCBgaGVpZ2h0VG90YWxgLiBUaGlzIHJvdXRpbmUgaXMgbWVudGlvbmVkIG9uIHBhZ2UgNDQyIG9mIHRoZSBUZVhib29rLlxuICovXG52YXIgbWFrZVN0YWNrZWREZWxpbSA9IGZ1bmN0aW9uKGRlbGltLCBoZWlnaHRUb3RhbCwgY2VudGVyLCBvcHRpb25zLCBtb2RlKSB7XG4gICAgLy8gVGhlcmUgYXJlIGZvdXIgcGFydHMsIHRoZSB0b3AsIGFuIG9wdGlvbmFsIG1pZGRsZSwgYSByZXBlYXRlZCBwYXJ0LCBhbmQgYVxuICAgIC8vIGJvdHRvbS5cbiAgICB2YXIgdG9wO1xuICAgIHZhciBtaWRkbGU7XG4gICAgdmFyIHJlcGVhdDtcbiAgICB2YXIgYm90dG9tO1xuICAgIHRvcCA9IHJlcGVhdCA9IGJvdHRvbSA9IGRlbGltO1xuICAgIG1pZGRsZSA9IG51bGw7XG4gICAgLy8gQWxzbyBrZWVwIHRyYWNrIG9mIHdoYXQgZm9udCB0aGUgZGVsaW1pdGVycyBhcmUgaW5cbiAgICB2YXIgZm9udCA9IFwiU2l6ZTEtUmVndWxhclwiO1xuXG4gICAgLy8gV2Ugc2V0IHRoZSBwYXJ0cyBhbmQgZm9udCBiYXNlZCBvbiB0aGUgc3ltYm9sLiBOb3RlIHRoYXQgd2UgdXNlXG4gICAgLy8gJ1xcdTIzZDAnIGluc3RlYWQgb2YgJ3wnIGFuZCAnXFx1MjAxNicgaW5zdGVhZCBvZiAnXFxcXHwnIGZvciB0aGVcbiAgICAvLyByZXBlYXRzIG9mIHRoZSBhcnJvd3NcbiAgICBpZiAoZGVsaW0gPT09IFwiXFxcXHVwYXJyb3dcIikge1xuICAgICAgICByZXBlYXQgPSBib3R0b20gPSBcIlxcdTIzZDBcIjtcbiAgICB9IGVsc2UgaWYgKGRlbGltID09PSBcIlxcXFxVcGFycm93XCIpIHtcbiAgICAgICAgcmVwZWF0ID0gYm90dG9tID0gXCJcXHUyMDE2XCI7XG4gICAgfSBlbHNlIGlmIChkZWxpbSA9PT0gXCJcXFxcZG93bmFycm93XCIpIHtcbiAgICAgICAgdG9wID0gcmVwZWF0ID0gXCJcXHUyM2QwXCI7XG4gICAgfSBlbHNlIGlmIChkZWxpbSA9PT0gXCJcXFxcRG93bmFycm93XCIpIHtcbiAgICAgICAgdG9wID0gcmVwZWF0ID0gXCJcXHUyMDE2XCI7XG4gICAgfSBlbHNlIGlmIChkZWxpbSA9PT0gXCJcXFxcdXBkb3duYXJyb3dcIikge1xuICAgICAgICB0b3AgPSBcIlxcXFx1cGFycm93XCI7XG4gICAgICAgIHJlcGVhdCA9IFwiXFx1MjNkMFwiO1xuICAgICAgICBib3R0b20gPSBcIlxcXFxkb3duYXJyb3dcIjtcbiAgICB9IGVsc2UgaWYgKGRlbGltID09PSBcIlxcXFxVcGRvd25hcnJvd1wiKSB7XG4gICAgICAgIHRvcCA9IFwiXFxcXFVwYXJyb3dcIjtcbiAgICAgICAgcmVwZWF0ID0gXCJcXHUyMDE2XCI7XG4gICAgICAgIGJvdHRvbSA9IFwiXFxcXERvd25hcnJvd1wiO1xuICAgIH0gZWxzZSBpZiAoZGVsaW0gPT09IFwiW1wiIHx8IGRlbGltID09PSBcIlxcXFxsYnJhY2tcIikge1xuICAgICAgICB0b3AgPSBcIlxcdTIzYTFcIjtcbiAgICAgICAgcmVwZWF0ID0gXCJcXHUyM2EyXCI7XG4gICAgICAgIGJvdHRvbSA9IFwiXFx1MjNhM1wiO1xuICAgICAgICBmb250ID0gXCJTaXplNC1SZWd1bGFyXCI7XG4gICAgfSBlbHNlIGlmIChkZWxpbSA9PT0gXCJdXCIgfHwgZGVsaW0gPT09IFwiXFxcXHJicmFja1wiKSB7XG4gICAgICAgIHRvcCA9IFwiXFx1MjNhNFwiO1xuICAgICAgICByZXBlYXQgPSBcIlxcdTIzYTVcIjtcbiAgICAgICAgYm90dG9tID0gXCJcXHUyM2E2XCI7XG4gICAgICAgIGZvbnQgPSBcIlNpemU0LVJlZ3VsYXJcIjtcbiAgICB9IGVsc2UgaWYgKGRlbGltID09PSBcIlxcXFxsZmxvb3JcIikge1xuICAgICAgICByZXBlYXQgPSB0b3AgPSBcIlxcdTIzYTJcIjtcbiAgICAgICAgYm90dG9tID0gXCJcXHUyM2EzXCI7XG4gICAgICAgIGZvbnQgPSBcIlNpemU0LVJlZ3VsYXJcIjtcbiAgICB9IGVsc2UgaWYgKGRlbGltID09PSBcIlxcXFxsY2VpbFwiKSB7XG4gICAgICAgIHRvcCA9IFwiXFx1MjNhMVwiO1xuICAgICAgICByZXBlYXQgPSBib3R0b20gPSBcIlxcdTIzYTJcIjtcbiAgICAgICAgZm9udCA9IFwiU2l6ZTQtUmVndWxhclwiO1xuICAgIH0gZWxzZSBpZiAoZGVsaW0gPT09IFwiXFxcXHJmbG9vclwiKSB7XG4gICAgICAgIHJlcGVhdCA9IHRvcCA9IFwiXFx1MjNhNVwiO1xuICAgICAgICBib3R0b20gPSBcIlxcdTIzYTZcIjtcbiAgICAgICAgZm9udCA9IFwiU2l6ZTQtUmVndWxhclwiO1xuICAgIH0gZWxzZSBpZiAoZGVsaW0gPT09IFwiXFxcXHJjZWlsXCIpIHtcbiAgICAgICAgdG9wID0gXCJcXHUyM2E0XCI7XG4gICAgICAgIHJlcGVhdCA9IGJvdHRvbSA9IFwiXFx1MjNhNVwiO1xuICAgICAgICBmb250ID0gXCJTaXplNC1SZWd1bGFyXCI7XG4gICAgfSBlbHNlIGlmIChkZWxpbSA9PT0gXCIoXCIpIHtcbiAgICAgICAgdG9wID0gXCJcXHUyMzliXCI7XG4gICAgICAgIHJlcGVhdCA9IFwiXFx1MjM5Y1wiO1xuICAgICAgICBib3R0b20gPSBcIlxcdTIzOWRcIjtcbiAgICAgICAgZm9udCA9IFwiU2l6ZTQtUmVndWxhclwiO1xuICAgIH0gZWxzZSBpZiAoZGVsaW0gPT09IFwiKVwiKSB7XG4gICAgICAgIHRvcCA9IFwiXFx1MjM5ZVwiO1xuICAgICAgICByZXBlYXQgPSBcIlxcdTIzOWZcIjtcbiAgICAgICAgYm90dG9tID0gXCJcXHUyM2EwXCI7XG4gICAgICAgIGZvbnQgPSBcIlNpemU0LVJlZ3VsYXJcIjtcbiAgICB9IGVsc2UgaWYgKGRlbGltID09PSBcIlxcXFx7XCIgfHwgZGVsaW0gPT09IFwiXFxcXGxicmFjZVwiKSB7XG4gICAgICAgIHRvcCA9IFwiXFx1MjNhN1wiO1xuICAgICAgICBtaWRkbGUgPSBcIlxcdTIzYThcIjtcbiAgICAgICAgYm90dG9tID0gXCJcXHUyM2E5XCI7XG4gICAgICAgIHJlcGVhdCA9IFwiXFx1MjNhYVwiO1xuICAgICAgICBmb250ID0gXCJTaXplNC1SZWd1bGFyXCI7XG4gICAgfSBlbHNlIGlmIChkZWxpbSA9PT0gXCJcXFxcfVwiIHx8IGRlbGltID09PSBcIlxcXFxyYnJhY2VcIikge1xuICAgICAgICB0b3AgPSBcIlxcdTIzYWJcIjtcbiAgICAgICAgbWlkZGxlID0gXCJcXHUyM2FjXCI7XG4gICAgICAgIGJvdHRvbSA9IFwiXFx1MjNhZFwiO1xuICAgICAgICByZXBlYXQgPSBcIlxcdTIzYWFcIjtcbiAgICAgICAgZm9udCA9IFwiU2l6ZTQtUmVndWxhclwiO1xuICAgIH0gZWxzZSBpZiAoZGVsaW0gPT09IFwiXFxcXGxncm91cFwiKSB7XG4gICAgICAgIHRvcCA9IFwiXFx1MjNhN1wiO1xuICAgICAgICBib3R0b20gPSBcIlxcdTIzYTlcIjtcbiAgICAgICAgcmVwZWF0ID0gXCJcXHUyM2FhXCI7XG4gICAgICAgIGZvbnQgPSBcIlNpemU0LVJlZ3VsYXJcIjtcbiAgICB9IGVsc2UgaWYgKGRlbGltID09PSBcIlxcXFxyZ3JvdXBcIikge1xuICAgICAgICB0b3AgPSBcIlxcdTIzYWJcIjtcbiAgICAgICAgYm90dG9tID0gXCJcXHUyM2FkXCI7XG4gICAgICAgIHJlcGVhdCA9IFwiXFx1MjNhYVwiO1xuICAgICAgICBmb250ID0gXCJTaXplNC1SZWd1bGFyXCI7XG4gICAgfSBlbHNlIGlmIChkZWxpbSA9PT0gXCJcXFxcbG1vdXN0YWNoZVwiKSB7XG4gICAgICAgIHRvcCA9IFwiXFx1MjNhN1wiO1xuICAgICAgICBib3R0b20gPSBcIlxcdTIzYWRcIjtcbiAgICAgICAgcmVwZWF0ID0gXCJcXHUyM2FhXCI7XG4gICAgICAgIGZvbnQgPSBcIlNpemU0LVJlZ3VsYXJcIjtcbiAgICB9IGVsc2UgaWYgKGRlbGltID09PSBcIlxcXFxybW91c3RhY2hlXCIpIHtcbiAgICAgICAgdG9wID0gXCJcXHUyM2FiXCI7XG4gICAgICAgIGJvdHRvbSA9IFwiXFx1MjNhOVwiO1xuICAgICAgICByZXBlYXQgPSBcIlxcdTIzYWFcIjtcbiAgICAgICAgZm9udCA9IFwiU2l6ZTQtUmVndWxhclwiO1xuICAgIH0gZWxzZSBpZiAoZGVsaW0gPT09IFwiXFxcXHN1cmRcIikge1xuICAgICAgICB0b3AgPSBcIlxcdWUwMDFcIjtcbiAgICAgICAgYm90dG9tID0gXCJcXHUyM2I3XCI7XG4gICAgICAgIHJlcGVhdCA9IFwiXFx1ZTAwMFwiO1xuICAgICAgICBmb250ID0gXCJTaXplNC1SZWd1bGFyXCI7XG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBtZXRyaWNzIG9mIHRoZSBmb3VyIHNlY3Rpb25zXG4gICAgdmFyIHRvcE1ldHJpY3MgPSBnZXRNZXRyaWNzKHRvcCwgZm9udCk7XG4gICAgdmFyIHRvcEhlaWdodFRvdGFsID0gdG9wTWV0cmljcy5oZWlnaHQgKyB0b3BNZXRyaWNzLmRlcHRoO1xuICAgIHZhciByZXBlYXRNZXRyaWNzID0gZ2V0TWV0cmljcyhyZXBlYXQsIGZvbnQpO1xuICAgIHZhciByZXBlYXRIZWlnaHRUb3RhbCA9IHJlcGVhdE1ldHJpY3MuaGVpZ2h0ICsgcmVwZWF0TWV0cmljcy5kZXB0aDtcbiAgICB2YXIgYm90dG9tTWV0cmljcyA9IGdldE1ldHJpY3MoYm90dG9tLCBmb250KTtcbiAgICB2YXIgYm90dG9tSGVpZ2h0VG90YWwgPSBib3R0b21NZXRyaWNzLmhlaWdodCArIGJvdHRvbU1ldHJpY3MuZGVwdGg7XG4gICAgdmFyIG1pZGRsZUhlaWdodFRvdGFsID0gMDtcbiAgICB2YXIgbWlkZGxlRmFjdG9yID0gMTtcbiAgICBpZiAobWlkZGxlICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBtaWRkbGVNZXRyaWNzID0gZ2V0TWV0cmljcyhtaWRkbGUsIGZvbnQpO1xuICAgICAgICBtaWRkbGVIZWlnaHRUb3RhbCA9IG1pZGRsZU1ldHJpY3MuaGVpZ2h0ICsgbWlkZGxlTWV0cmljcy5kZXB0aDtcbiAgICAgICAgbWlkZGxlRmFjdG9yID0gMjsgLy8gcmVwZWF0IHN5bW1ldHJpY2FsbHkgYWJvdmUgYW5kIGJlbG93IG1pZGRsZVxuICAgIH1cblxuICAgIC8vIENhbGN1YXRlIHRoZSBtaW5pbWFsIGhlaWdodCB0aGF0IHRoZSBkZWxpbWl0ZXIgY2FuIGhhdmUuXG4gICAgLy8gSXQgaXMgYXQgbGVhc3QgdGhlIHNpemUgb2YgdGhlIHRvcCwgYm90dG9tLCBhbmQgb3B0aW9uYWwgbWlkZGxlIGNvbWJpbmVkLlxuICAgIHZhciBtaW5IZWlnaHQgPSB0b3BIZWlnaHRUb3RhbCArIGJvdHRvbUhlaWdodFRvdGFsICsgbWlkZGxlSGVpZ2h0VG90YWw7XG5cbiAgICAvLyBDb21wdXRlIHRoZSBudW1iZXIgb2YgY29waWVzIG9mIHRoZSByZXBlYXQgc3ltYm9sIHdlIHdpbGwgbmVlZFxuICAgIHZhciByZXBlYXRDb3VudCA9IE1hdGguY2VpbChcbiAgICAgICAgKGhlaWdodFRvdGFsIC0gbWluSGVpZ2h0KSAvIChtaWRkbGVGYWN0b3IgKiByZXBlYXRIZWlnaHRUb3RhbCkpO1xuXG4gICAgLy8gQ29tcHV0ZSB0aGUgdG90YWwgaGVpZ2h0IG9mIHRoZSBkZWxpbWl0ZXIgaW5jbHVkaW5nIGFsbCB0aGUgc3ltYm9sc1xuICAgIHZhciByZWFsSGVpZ2h0VG90YWwgPVxuICAgICAgICBtaW5IZWlnaHQgKyByZXBlYXRDb3VudCAqIG1pZGRsZUZhY3RvciAqIHJlcGVhdEhlaWdodFRvdGFsO1xuXG4gICAgLy8gVGhlIGNlbnRlciBvZiB0aGUgZGVsaW1pdGVyIGlzIHBsYWNlZCBhdCB0aGUgY2VudGVyIG9mIHRoZSBheGlzLiBOb3RlXG4gICAgLy8gdGhhdCBpbiB0aGlzIGNvbnRleHQsIFwiY2VudGVyXCIgbWVhbnMgdGhhdCB0aGUgZGVsaW1pdGVyIHNob3VsZCBiZVxuICAgIC8vIGNlbnRlcmVkIGFyb3VuZCB0aGUgYXhpcyBpbiB0aGUgY3VycmVudCBzdHlsZSwgd2hpbGUgbm9ybWFsbHkgaXQgaXNcbiAgICAvLyBjZW50ZXJlZCBhcm91bmQgdGhlIGF4aXMgaW4gdGV4dHN0eWxlLlxuICAgIHZhciBheGlzSGVpZ2h0ID0gZm9udE1ldHJpY3MubWV0cmljcy5heGlzSGVpZ2h0O1xuICAgIGlmIChjZW50ZXIpIHtcbiAgICAgICAgYXhpc0hlaWdodCAqPSBvcHRpb25zLnN0eWxlLnNpemVNdWx0aXBsaWVyO1xuICAgIH1cbiAgICAvLyBDYWxjdWxhdGUgdGhlIGRlcHRoXG4gICAgdmFyIGRlcHRoID0gcmVhbEhlaWdodFRvdGFsIC8gMiAtIGF4aXNIZWlnaHQ7XG5cbiAgICAvLyBOb3csIHdlIHN0YXJ0IGJ1aWxkaW5nIHRoZSBwaWVjZXMgdGhhdCB3aWxsIGdvIGludG8gdGhlIHZsaXN0XG5cbiAgICAvLyBLZWVwIGEgbGlzdCBvZiB0aGUgaW5uZXIgcGllY2VzXG4gICAgdmFyIGlubmVycyA9IFtdO1xuXG4gICAgLy8gQWRkIHRoZSBib3R0b20gc3ltYm9sXG4gICAgaW5uZXJzLnB1c2gobWFrZUlubmVyKGJvdHRvbSwgZm9udCwgbW9kZSkpO1xuXG4gICAgdmFyIGk7XG4gICAgaWYgKG1pZGRsZSA9PT0gbnVsbCkge1xuICAgICAgICAvLyBBZGQgdGhhdCBtYW55IHN5bWJvbHNcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHJlcGVhdENvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGlubmVycy5wdXNoKG1ha2VJbm5lcihyZXBlYXQsIGZvbnQsIG1vZGUpKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFdoZW4gdGhlcmUgaXMgYSBtaWRkbGUgYml0LCB3ZSBuZWVkIHRoZSBtaWRkbGUgcGFydCBhbmQgdHdvIHJlcGVhdGVkXG4gICAgICAgIC8vIHNlY3Rpb25zXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCByZXBlYXRDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBpbm5lcnMucHVzaChtYWtlSW5uZXIocmVwZWF0LCBmb250LCBtb2RlKSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5uZXJzLnB1c2gobWFrZUlubmVyKG1pZGRsZSwgZm9udCwgbW9kZSkpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcmVwZWF0Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgaW5uZXJzLnB1c2gobWFrZUlubmVyKHJlcGVhdCwgZm9udCwgbW9kZSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSB0b3Agc3ltYm9sXG4gICAgaW5uZXJzLnB1c2gobWFrZUlubmVyKHRvcCwgZm9udCwgbW9kZSkpO1xuXG4gICAgLy8gRmluYWxseSwgYnVpbGQgdGhlIHZsaXN0XG4gICAgdmFyIGlubmVyID0gYnVpbGRDb21tb24ubWFrZVZMaXN0KGlubmVycywgXCJib3R0b21cIiwgZGVwdGgsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHN0eWxlV3JhcChcbiAgICAgICAgbWFrZVNwYW4oW1wiZGVsaW1zaXppbmdcIiwgXCJtdWx0XCJdLCBbaW5uZXJdLCBvcHRpb25zLmdldENvbG9yKCkpLFxuICAgICAgICBTdHlsZS5URVhULCBvcHRpb25zKTtcbn07XG5cbi8vIFRoZXJlIGFyZSB0aHJlZSBraW5kcyBvZiBkZWxpbWl0ZXJzLCBkZWxpbWl0ZXJzIHRoYXQgc3RhY2sgd2hlbiB0aGV5IGJlY29tZVxuLy8gdG9vIGxhcmdlXG52YXIgc3RhY2tMYXJnZURlbGltaXRlcnMgPSBbXG4gICAgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJcXFxcbGJyYWNrXCIsIFwiXVwiLCBcIlxcXFxyYnJhY2tcIixcbiAgICBcIlxcXFx7XCIsIFwiXFxcXGxicmFjZVwiLCBcIlxcXFx9XCIsIFwiXFxcXHJicmFjZVwiLFxuICAgIFwiXFxcXGxmbG9vclwiLCBcIlxcXFxyZmxvb3JcIiwgXCJcXFxcbGNlaWxcIiwgXCJcXFxccmNlaWxcIixcbiAgICBcIlxcXFxzdXJkXCIsXG5dO1xuXG4vLyBkZWxpbWl0ZXJzIHRoYXQgYWx3YXlzIHN0YWNrXG52YXIgc3RhY2tBbHdheXNEZWxpbWl0ZXJzID0gW1xuICAgIFwiXFxcXHVwYXJyb3dcIiwgXCJcXFxcZG93bmFycm93XCIsIFwiXFxcXHVwZG93bmFycm93XCIsXG4gICAgXCJcXFxcVXBhcnJvd1wiLCBcIlxcXFxEb3duYXJyb3dcIiwgXCJcXFxcVXBkb3duYXJyb3dcIixcbiAgICBcInxcIiwgXCJcXFxcfFwiLCBcIlxcXFx2ZXJ0XCIsIFwiXFxcXFZlcnRcIixcbiAgICBcIlxcXFxsdmVydFwiLCBcIlxcXFxydmVydFwiLCBcIlxcXFxsVmVydFwiLCBcIlxcXFxyVmVydFwiLFxuICAgIFwiXFxcXGxncm91cFwiLCBcIlxcXFxyZ3JvdXBcIiwgXCJcXFxcbG1vdXN0YWNoZVwiLCBcIlxcXFxybW91c3RhY2hlXCIsXG5dO1xuXG4vLyBhbmQgZGVsaW1pdGVycyB0aGF0IG5ldmVyIHN0YWNrXG52YXIgc3RhY2tOZXZlckRlbGltaXRlcnMgPSBbXG4gICAgXCI8XCIsIFwiPlwiLCBcIlxcXFxsYW5nbGVcIiwgXCJcXFxccmFuZ2xlXCIsIFwiL1wiLCBcIlxcXFxiYWNrc2xhc2hcIiwgXCJcXFxcbHRcIiwgXCJcXFxcZ3RcIixcbl07XG5cbi8vIE1ldHJpY3Mgb2YgdGhlIGRpZmZlcmVudCBzaXplcy4gRm91bmQgYnkgbG9va2luZyBhdCBUZVgncyBvdXRwdXQgb2Zcbi8vICRcXGJpZ2x8IC8vIFxcQmlnbHwgXFxiaWdnbHwgXFxCaWdnbHwgXFxzaG93bGlzdHMkXG4vLyBVc2VkIHRvIGNyZWF0ZSBzdGFja2VkIGRlbGltaXRlcnMgb2YgYXBwcm9wcmlhdGUgc2l6ZXMgaW4gbWFrZVNpemVkRGVsaW0uXG52YXIgc2l6ZVRvTWF4SGVpZ2h0ID0gWzAsIDEuMiwgMS44LCAyLjQsIDMuMF07XG5cbi8qKlxuICogVXNlZCB0byBjcmVhdGUgYSBkZWxpbWl0ZXIgb2YgYSBzcGVjaWZpYyBzaXplLCB3aGVyZSBgc2l6ZWAgaXMgMSwgMiwgMywgb3IgNC5cbiAqL1xudmFyIG1ha2VTaXplZERlbGltID0gZnVuY3Rpb24oZGVsaW0sIHNpemUsIG9wdGlvbnMsIG1vZGUpIHtcbiAgICAvLyA8IGFuZCA+IHR1cm4gaW50byBcXGxhbmdsZSBhbmQgXFxyYW5nbGUgaW4gZGVsaW1pdGVyc1xuICAgIGlmIChkZWxpbSA9PT0gXCI8XCIgfHwgZGVsaW0gPT09IFwiXFxcXGx0XCIpIHtcbiAgICAgICAgZGVsaW0gPSBcIlxcXFxsYW5nbGVcIjtcbiAgICB9IGVsc2UgaWYgKGRlbGltID09PSBcIj5cIiB8fCBkZWxpbSA9PT0gXCJcXFxcZ3RcIikge1xuICAgICAgICBkZWxpbSA9IFwiXFxcXHJhbmdsZVwiO1xuICAgIH1cblxuICAgIC8vIFNpemVkIGRlbGltaXRlcnMgYXJlIG5ldmVyIGNlbnRlcmVkLlxuICAgIGlmICh1dGlscy5jb250YWlucyhzdGFja0xhcmdlRGVsaW1pdGVycywgZGVsaW0pIHx8XG4gICAgICAgIHV0aWxzLmNvbnRhaW5zKHN0YWNrTmV2ZXJEZWxpbWl0ZXJzLCBkZWxpbSkpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VMYXJnZURlbGltKGRlbGltLCBzaXplLCBmYWxzZSwgb3B0aW9ucywgbW9kZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5jb250YWlucyhzdGFja0Fsd2F5c0RlbGltaXRlcnMsIGRlbGltKSkge1xuICAgICAgICByZXR1cm4gbWFrZVN0YWNrZWREZWxpbShcbiAgICAgICAgICAgIGRlbGltLCBzaXplVG9NYXhIZWlnaHRbc2l6ZV0sIGZhbHNlLCBvcHRpb25zLCBtb2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcihcIklsbGVnYWwgZGVsaW1pdGVyOiAnXCIgKyBkZWxpbSArIFwiJ1wiKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFRoZXJlIGFyZSB0aHJlZSBkaWZmZXJlbnQgc2VxdWVuY2VzIG9mIGRlbGltaXRlciBzaXplcyB0aGF0IHRoZSBkZWxpbWl0ZXJzXG4gKiBmb2xsb3cgZGVwZW5kaW5nIG9uIHRoZSBraW5kIG9mIGRlbGltaXRlci4gVGhpcyBpcyB1c2VkIHdoZW4gY3JlYXRpbmcgY3VzdG9tXG4gKiBzaXplZCBkZWxpbWl0ZXJzIHRvIGRlY2lkZSB3aGV0aGVyIHRvIGNyZWF0ZSBhIHNtYWxsLCBsYXJnZSwgb3Igc3RhY2tlZFxuICogZGVsaW1pdGVyLlxuICpcbiAqIEluIHJlYWwgVGVYLCB0aGVzZSBzZXF1ZW5jZXMgYXJlbid0IGV4cGxpY2l0bHkgZGVmaW5lZCwgYnV0IGFyZSBpbnN0ZWFkXG4gKiBkZWZpbmVkIGluc2lkZSB0aGUgZm9udCBtZXRyaWNzLiBTaW5jZSB0aGVyZSBhcmUgb25seSB0aHJlZSBzZXF1ZW5jZXMgdGhhdFxuICogYXJlIHBvc3NpYmxlIGZvciB0aGUgZGVsaW1pdGVycyB0aGF0IFRlWCBkZWZpbmVzLCBpdCBpcyBlYXNpZXIgdG8ganVzdCBlbmNvZGVcbiAqIHRoZW0gZXhwbGljaXRseSBoZXJlLlxuICovXG5cbi8vIERlbGltaXRlcnMgdGhhdCBuZXZlciBzdGFjayB0cnkgc21hbGwgZGVsaW1pdGVycyBhbmQgbGFyZ2UgZGVsaW1pdGVycyBvbmx5XG52YXIgc3RhY2tOZXZlckRlbGltaXRlclNlcXVlbmNlID0gW1xuICAgIHt0eXBlOiBcInNtYWxsXCIsIHN0eWxlOiBTdHlsZS5TQ1JJUFRTQ1JJUFR9LFxuICAgIHt0eXBlOiBcInNtYWxsXCIsIHN0eWxlOiBTdHlsZS5TQ1JJUFR9LFxuICAgIHt0eXBlOiBcInNtYWxsXCIsIHN0eWxlOiBTdHlsZS5URVhUfSxcbiAgICB7dHlwZTogXCJsYXJnZVwiLCBzaXplOiAxfSxcbiAgICB7dHlwZTogXCJsYXJnZVwiLCBzaXplOiAyfSxcbiAgICB7dHlwZTogXCJsYXJnZVwiLCBzaXplOiAzfSxcbiAgICB7dHlwZTogXCJsYXJnZVwiLCBzaXplOiA0fSxcbl07XG5cbi8vIERlbGltaXRlcnMgdGhhdCBhbHdheXMgc3RhY2sgdHJ5IHRoZSBzbWFsbCBkZWxpbWl0ZXJzIGZpcnN0LCB0aGVuIHN0YWNrXG52YXIgc3RhY2tBbHdheXNEZWxpbWl0ZXJTZXF1ZW5jZSA9IFtcbiAgICB7dHlwZTogXCJzbWFsbFwiLCBzdHlsZTogU3R5bGUuU0NSSVBUU0NSSVBUfSxcbiAgICB7dHlwZTogXCJzbWFsbFwiLCBzdHlsZTogU3R5bGUuU0NSSVBUfSxcbiAgICB7dHlwZTogXCJzbWFsbFwiLCBzdHlsZTogU3R5bGUuVEVYVH0sXG4gICAge3R5cGU6IFwic3RhY2tcIn0sXG5dO1xuXG4vLyBEZWxpbWl0ZXJzIHRoYXQgc3RhY2sgd2hlbiBsYXJnZSB0cnkgdGhlIHNtYWxsIGFuZCB0aGVuIGxhcmdlIGRlbGltaXRlcnMsIGFuZFxuLy8gc3RhY2sgYWZ0ZXJ3YXJkc1xudmFyIHN0YWNrTGFyZ2VEZWxpbWl0ZXJTZXF1ZW5jZSA9IFtcbiAgICB7dHlwZTogXCJzbWFsbFwiLCBzdHlsZTogU3R5bGUuU0NSSVBUU0NSSVBUfSxcbiAgICB7dHlwZTogXCJzbWFsbFwiLCBzdHlsZTogU3R5bGUuU0NSSVBUfSxcbiAgICB7dHlwZTogXCJzbWFsbFwiLCBzdHlsZTogU3R5bGUuVEVYVH0sXG4gICAge3R5cGU6IFwibGFyZ2VcIiwgc2l6ZTogMX0sXG4gICAge3R5cGU6IFwibGFyZ2VcIiwgc2l6ZTogMn0sXG4gICAge3R5cGU6IFwibGFyZ2VcIiwgc2l6ZTogM30sXG4gICAge3R5cGU6IFwibGFyZ2VcIiwgc2l6ZTogNH0sXG4gICAge3R5cGU6IFwic3RhY2tcIn0sXG5dO1xuXG4vKipcbiAqIEdldCB0aGUgZm9udCB1c2VkIGluIGEgZGVsaW1pdGVyIGJhc2VkIG9uIHdoYXQga2luZCBvZiBkZWxpbWl0ZXIgaXQgaXMuXG4gKi9cbnZhciBkZWxpbVR5cGVUb0ZvbnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgaWYgKHR5cGUudHlwZSA9PT0gXCJzbWFsbFwiKSB7XG4gICAgICAgIHJldHVybiBcIk1haW4tUmVndWxhclwiO1xuICAgIH0gZWxzZSBpZiAodHlwZS50eXBlID09PSBcImxhcmdlXCIpIHtcbiAgICAgICAgcmV0dXJuIFwiU2l6ZVwiICsgdHlwZS5zaXplICsgXCItUmVndWxhclwiO1xuICAgIH0gZWxzZSBpZiAodHlwZS50eXBlID09PSBcInN0YWNrXCIpIHtcbiAgICAgICAgcmV0dXJuIFwiU2l6ZTQtUmVndWxhclwiO1xuICAgIH1cbn07XG5cbi8qKlxuICogVHJhdmVyc2UgYSBzZXF1ZW5jZSBvZiB0eXBlcyBvZiBkZWxpbWl0ZXJzIHRvIGRlY2lkZSB3aGF0IGtpbmQgb2YgZGVsaW1pdGVyXG4gKiBzaG91bGQgYmUgdXNlZCB0byBjcmVhdGUgYSBkZWxpbWl0ZXIgb2YgdGhlIGdpdmVuIGhlaWdodCtkZXB0aC5cbiAqL1xudmFyIHRyYXZlcnNlU2VxdWVuY2UgPSBmdW5jdGlvbihkZWxpbSwgaGVpZ2h0LCBzZXF1ZW5jZSwgb3B0aW9ucykge1xuICAgIC8vIEhlcmUsIHdlIGNob29zZSB0aGUgaW5kZXggd2Ugc2hvdWxkIHN0YXJ0IGF0IGluIHRoZSBzZXF1ZW5jZXMuIEluIHNtYWxsZXJcbiAgICAvLyBzaXplcyAod2hpY2ggY29ycmVzcG9uZCB0byBsYXJnZXIgbnVtYmVycyBpbiBzdHlsZS5zaXplKSB3ZSBzdGFydCBlYXJsaWVyXG4gICAgLy8gaW4gdGhlIHNlcXVlbmNlLiBUaHVzLCBzY3JpcHRzY3JpcHQgc3RhcnRzIGF0IGluZGV4IDMtMz0wLCBzY3JpcHQgc3RhcnRzXG4gICAgLy8gYXQgaW5kZXggMy0yPTEsIHRleHQgc3RhcnRzIGF0IDMtMT0yLCBhbmQgZGlzcGxheSBzdGFydHMgYXQgbWluKDIsMy0wKT0yXG4gICAgdmFyIHN0YXJ0ID0gTWF0aC5taW4oMiwgMyAtIG9wdGlvbnMuc3R5bGUuc2l6ZSk7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgc2VxdWVuY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlcXVlbmNlW2ldLnR5cGUgPT09IFwic3RhY2tcIikge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyBhbHdheXMgdGhlIGxhc3QgZGVsaW1pdGVyLCBzbyB3ZSBqdXN0IGJyZWFrIHRoZSBsb29wIG5vdy5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1ldHJpY3MgPSBnZXRNZXRyaWNzKGRlbGltLCBkZWxpbVR5cGVUb0ZvbnQoc2VxdWVuY2VbaV0pKTtcbiAgICAgICAgdmFyIGhlaWdodERlcHRoID0gbWV0cmljcy5oZWlnaHQgKyBtZXRyaWNzLmRlcHRoO1xuXG4gICAgICAgIC8vIFNtYWxsIGRlbGltaXRlcnMgYXJlIHNjYWxlZCBkb3duIHZlcnNpb25zIG9mIHRoZSBzYW1lIGZvbnQsIHNvIHdlXG4gICAgICAgIC8vIGFjY291bnQgZm9yIHRoZSBzdHlsZSBjaGFuZ2Ugc2l6ZS5cblxuICAgICAgICBpZiAoc2VxdWVuY2VbaV0udHlwZSA9PT0gXCJzbWFsbFwiKSB7XG4gICAgICAgICAgICBoZWlnaHREZXB0aCAqPSBzZXF1ZW5jZVtpXS5zdHlsZS5zaXplTXVsdGlwbGllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBkZWxpbWl0ZXIgYXQgdGhpcyBzaXplIHdvcmtzIGZvciB0aGUgZ2l2ZW4gaGVpZ2h0LlxuICAgICAgICBpZiAoaGVpZ2h0RGVwdGggPiBoZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXF1ZW5jZVtpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHdlIHJlYWNoZWQgdGhlIGVuZCBvZiB0aGUgc2VxdWVuY2UsIHJldHVybiB0aGUgbGFzdCBzZXF1ZW5jZSBlbGVtZW50LlxuICAgIHJldHVybiBzZXF1ZW5jZVtzZXF1ZW5jZS5sZW5ndGggLSAxXTtcbn07XG5cbi8qKlxuICogTWFrZSBhIGRlbGltaXRlciBvZiBhIGdpdmVuIGhlaWdodCtkZXB0aCwgd2l0aCBvcHRpb25hbCBjZW50ZXJpbmcuIEhlcmUsIHdlXG4gKiB0cmF2ZXJzZSB0aGUgc2VxdWVuY2VzLCBhbmQgY3JlYXRlIGEgZGVsaW1pdGVyIHRoYXQgdGhlIHNlcXVlbmNlIHRlbGxzIHVzIHRvLlxuICovXG52YXIgbWFrZUN1c3RvbVNpemVkRGVsaW0gPSBmdW5jdGlvbihkZWxpbSwgaGVpZ2h0LCBjZW50ZXIsIG9wdGlvbnMsIG1vZGUpIHtcbiAgICBpZiAoZGVsaW0gPT09IFwiPFwiIHx8IGRlbGltID09PSBcIlxcXFxsdFwiKSB7XG4gICAgICAgIGRlbGltID0gXCJcXFxcbGFuZ2xlXCI7XG4gICAgfSBlbHNlIGlmIChkZWxpbSA9PT0gXCI+XCIgfHwgZGVsaW0gPT09IFwiXFxcXGd0XCIpIHtcbiAgICAgICAgZGVsaW0gPSBcIlxcXFxyYW5nbGVcIjtcbiAgICB9XG5cbiAgICAvLyBEZWNpZGUgd2hhdCBzZXF1ZW5jZSB0byB1c2VcbiAgICB2YXIgc2VxdWVuY2U7XG4gICAgaWYgKHV0aWxzLmNvbnRhaW5zKHN0YWNrTmV2ZXJEZWxpbWl0ZXJzLCBkZWxpbSkpIHtcbiAgICAgICAgc2VxdWVuY2UgPSBzdGFja05ldmVyRGVsaW1pdGVyU2VxdWVuY2U7XG4gICAgfSBlbHNlIGlmICh1dGlscy5jb250YWlucyhzdGFja0xhcmdlRGVsaW1pdGVycywgZGVsaW0pKSB7XG4gICAgICAgIHNlcXVlbmNlID0gc3RhY2tMYXJnZURlbGltaXRlclNlcXVlbmNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNlcXVlbmNlID0gc3RhY2tBbHdheXNEZWxpbWl0ZXJTZXF1ZW5jZTtcbiAgICB9XG5cbiAgICAvLyBMb29rIHRocm91Z2ggdGhlIHNlcXVlbmNlXG4gICAgdmFyIGRlbGltVHlwZSA9IHRyYXZlcnNlU2VxdWVuY2UoZGVsaW0sIGhlaWdodCwgc2VxdWVuY2UsIG9wdGlvbnMpO1xuXG4gICAgLy8gRGVwZW5kaW5nIG9uIHRoZSBzZXF1ZW5jZSBlbGVtZW50IHdlIGRlY2lkZWQgb24sIGNhbGwgdGhlIGFwcHJvcHJpYXRlXG4gICAgLy8gZnVuY3Rpb24uXG4gICAgaWYgKGRlbGltVHlwZS50eXBlID09PSBcInNtYWxsXCIpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VTbWFsbERlbGltKGRlbGltLCBkZWxpbVR5cGUuc3R5bGUsIGNlbnRlciwgb3B0aW9ucywgbW9kZSk7XG4gICAgfSBlbHNlIGlmIChkZWxpbVR5cGUudHlwZSA9PT0gXCJsYXJnZVwiKSB7XG4gICAgICAgIHJldHVybiBtYWtlTGFyZ2VEZWxpbShkZWxpbSwgZGVsaW1UeXBlLnNpemUsIGNlbnRlciwgb3B0aW9ucywgbW9kZSk7XG4gICAgfSBlbHNlIGlmIChkZWxpbVR5cGUudHlwZSA9PT0gXCJzdGFja1wiKSB7XG4gICAgICAgIHJldHVybiBtYWtlU3RhY2tlZERlbGltKGRlbGltLCBoZWlnaHQsIGNlbnRlciwgb3B0aW9ucywgbW9kZSk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBNYWtlIGEgZGVsaW1pdGVyIGZvciB1c2Ugd2l0aCBgXFxsZWZ0YCBhbmQgYFxccmlnaHRgLCBnaXZlbiBhIGhlaWdodCBhbmQgZGVwdGhcbiAqIG9mIGFuIGV4cHJlc3Npb24gdGhhdCB0aGUgZGVsaW1pdGVycyBzdXJyb3VuZC5cbiAqL1xudmFyIG1ha2VMZWZ0UmlnaHREZWxpbSA9IGZ1bmN0aW9uKGRlbGltLCBoZWlnaHQsIGRlcHRoLCBvcHRpb25zLCBtb2RlKSB7XG4gICAgLy8gV2UgYWx3YXlzIGNlbnRlciBcXGxlZnQvXFxyaWdodCBkZWxpbWl0ZXJzLCBzbyB0aGUgYXhpcyBpcyBhbHdheXMgc2hpZnRlZFxuICAgIHZhciBheGlzSGVpZ2h0ID1cbiAgICAgICAgZm9udE1ldHJpY3MubWV0cmljcy5heGlzSGVpZ2h0ICogb3B0aW9ucy5zdHlsZS5zaXplTXVsdGlwbGllcjtcblxuICAgIC8vIFRha2VuIGZyb20gVGVYIHNvdXJjZSwgdGV4LndlYiwgZnVuY3Rpb24gbWFrZV9sZWZ0X3JpZ2h0XG4gICAgdmFyIGRlbGltaXRlckZhY3RvciA9IDkwMTtcbiAgICB2YXIgZGVsaW1pdGVyRXh0ZW5kID0gNS4wIC8gZm9udE1ldHJpY3MubWV0cmljcy5wdFBlckVtO1xuXG4gICAgdmFyIG1heERpc3RGcm9tQXhpcyA9IE1hdGgubWF4KFxuICAgICAgICBoZWlnaHQgLSBheGlzSGVpZ2h0LCBkZXB0aCArIGF4aXNIZWlnaHQpO1xuXG4gICAgdmFyIHRvdGFsSGVpZ2h0ID0gTWF0aC5tYXgoXG4gICAgICAgIC8vIEluIHJlYWwgVGVYLCBjYWxjdWxhdGlvbnMgYXJlIGRvbmUgdXNpbmcgaW50ZWdyYWwgdmFsdWVzIHdoaWNoIGFyZVxuICAgICAgICAvLyA2NTUzNiBwZXIgcHQsIG9yIDY1NTM2MCBwZXIgZW0uIFNvLCB0aGUgZGl2aXNpb24gaGVyZSB0cnVuY2F0ZXMgaW5cbiAgICAgICAgLy8gVGVYIGJ1dCBkb2Vzbid0IGhlcmUsIHByb2R1Y2luZyBkaWZmZXJlbnQgcmVzdWx0cy4gSWYgd2Ugd2FudGVkIHRvXG4gICAgICAgIC8vIGV4YWN0bHkgbWF0Y2ggVGVYJ3MgY2FsY3VsYXRpb24sIHdlIGNvdWxkIGRvXG4gICAgICAgIC8vICAgTWF0aC5mbG9vcig2NTUzNjAgKiBtYXhEaXN0RnJvbUF4aXMgLyA1MDApICpcbiAgICAgICAgLy8gICAgZGVsaW1pdGVyRmFjdG9yIC8gNjU1MzYwXG4gICAgICAgIC8vIChUbyBzZWUgdGhlIGRpZmZlcmVuY2UsIGNvbXBhcmVcbiAgICAgICAgLy8gICAgeF57eF57XFxsZWZ0KFxccnVsZXswLjFlbX17MC42OGVtfVxccmlnaHQpfX1cbiAgICAgICAgLy8gaW4gVGVYIGFuZCBLYVRlWClcbiAgICAgICAgbWF4RGlzdEZyb21BeGlzIC8gNTAwICogZGVsaW1pdGVyRmFjdG9yLFxuICAgICAgICAyICogbWF4RGlzdEZyb21BeGlzIC0gZGVsaW1pdGVyRXh0ZW5kKTtcblxuICAgIC8vIEZpbmFsbHksIHdlIGRlZmVyIHRvIGBtYWtlQ3VzdG9tU2l6ZWREZWxpbWAgd2l0aCBvdXIgY2FsY3VsYXRlZCB0b3RhbFxuICAgIC8vIGhlaWdodFxuICAgIHJldHVybiBtYWtlQ3VzdG9tU2l6ZWREZWxpbShkZWxpbSwgdG90YWxIZWlnaHQsIHRydWUsIG9wdGlvbnMsIG1vZGUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc2l6ZWREZWxpbTogbWFrZVNpemVkRGVsaW0sXG4gICAgY3VzdG9tU2l6ZWREZWxpbTogbWFrZUN1c3RvbVNpemVkRGVsaW0sXG4gICAgbGVmdFJpZ2h0RGVsaW06IG1ha2VMZWZ0UmlnaHREZWxpbSxcbn07XG4iLCIvKipcbiAqIFByb3ZpZGVzIGEgc2luZ2xlIGZ1bmN0aW9uIGZvciBwYXJzaW5nIGFuIGV4cHJlc3Npb24gdXNpbmcgYSBQYXJzZXJcbiAqIFRPRE8oZW1pbHkpOiBSZW1vdmUgdGhpc1xuICovXG5cbnZhciBQYXJzZXIgPSByZXF1aXJlKFwiLi9QYXJzZXJcIik7XG5cbi8qKlxuICogUGFyc2VzIGFuIGV4cHJlc3Npb24gdXNpbmcgYSBQYXJzZXIsIHRoZW4gcmV0dXJucyB0aGUgcGFyc2VkIHJlc3VsdC5cbiAqL1xudmFyIHBhcnNlVHJlZSA9IGZ1bmN0aW9uKHRvUGFyc2UsIHNldHRpbmdzKSB7XG4gICAgdmFyIHBhcnNlciA9IG5ldyBQYXJzZXIodG9QYXJzZSwgc2V0dGluZ3MpO1xuXG4gICAgcmV0dXJuIHBhcnNlci5wYXJzZSgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVRyZWU7XG4iLCIvKipcbiAqIFRoZXNlIG9iamVjdHMgc3RvcmUgdGhlIGRhdGEgYWJvdXQgdGhlIERPTSBub2RlcyB3ZSBjcmVhdGUsIGFzIHdlbGwgYXMgc29tZVxuICogZXh0cmEgZGF0YS4gVGhleSBjYW4gdGhlbiBiZSB0cmFuc2Zvcm1lZCBpbnRvIHJlYWwgRE9NIG5vZGVzIHdpdGggdGhlXG4gKiBgdG9Ob2RlYCBmdW5jdGlvbiBvciBIVE1MIG1hcmt1cCB1c2luZyBgdG9NYXJrdXBgLiBUaGV5IGFyZSB1c2VmdWwgZm9yIGJvdGhcbiAqIHN0b3JpbmcgZXh0cmEgcHJvcGVydGllcyBvbiB0aGUgbm9kZXMsIGFzIHdlbGwgYXMgcHJvdmlkaW5nIGEgd2F5IHRvIGVhc2lseVxuICogd29yayB3aXRoIHRoZSBET00uXG4gKlxuICogU2ltaWxhciBmdW5jdGlvbnMgZm9yIHdvcmtpbmcgd2l0aCBNYXRoTUwgbm9kZXMgZXhpc3QgaW4gbWF0aE1MVHJlZS5qcy5cbiAqL1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gSFRNTCBjbGFzc05hbWUgYmFzZWQgb24gYSBsaXN0IG9mIGNsYXNzZXMuIEluIGFkZGl0aW9uIHRvIGpvaW5pbmdcbiAqIHdpdGggc3BhY2VzLCB3ZSBhbHNvIHJlbW92ZSBudWxsIG9yIGVtcHR5IGNsYXNzZXMuXG4gKi9cbnZhciBjcmVhdGVDbGFzcyA9IGZ1bmN0aW9uKGNsYXNzZXMpIHtcbiAgICBjbGFzc2VzID0gY2xhc3Nlcy5zbGljZSgpO1xuICAgIGZvciAodmFyIGkgPSBjbGFzc2VzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmICghY2xhc3Nlc1tpXSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3Nlcy5qb2luKFwiIFwiKTtcbn07XG5cbi8qKlxuICogVGhpcyBub2RlIHJlcHJlc2VudHMgYSBzcGFuIG5vZGUsIHdpdGggYSBjbGFzc05hbWUsIGEgbGlzdCBvZiBjaGlsZHJlbiwgYW5kXG4gKiBhbiBpbmxpbmUgc3R5bGUuIEl0IGFsc28gY29udGFpbnMgaW5mb3JtYXRpb24gYWJvdXQgaXRzIGhlaWdodCwgZGVwdGgsIGFuZFxuICogbWF4Rm9udFNpemUuXG4gKi9cbmZ1bmN0aW9uIHNwYW4oY2xhc3NlcywgY2hpbGRyZW4sIGhlaWdodCwgZGVwdGgsIG1heEZvbnRTaXplLCBzdHlsZSkge1xuICAgIHRoaXMuY2xhc3NlcyA9IGNsYXNzZXMgfHwgW107XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuIHx8IFtdO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XG4gICAgdGhpcy5kZXB0aCA9IGRlcHRoIHx8IDA7XG4gICAgdGhpcy5tYXhGb250U2l6ZSA9IG1heEZvbnRTaXplIHx8IDA7XG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlIHx8IHt9O1xuICAgIHRoaXMuYXR0cmlidXRlcyA9IHt9O1xufVxuXG4vKipcbiAqIFNldHMgYW4gYXJiaXRyYXJ5IGF0dHJpYnV0ZSBvbiB0aGUgc3Bhbi4gV2FybmluZzogdXNlIHRoaXMgd2lzZWx5LiBOb3QgYWxsXG4gKiBicm93c2VycyBzdXBwb3J0IGF0dHJpYnV0ZXMgdGhlIHNhbWUsIGFuZCBoYXZpbmcgdG9vIG1hbnkgY3VzdG9tIGF0dHJpYnV0ZXNcbiAqIGlzIHByb2JhYmx5IGJhZC5cbiAqL1xuc3Bhbi5wcm90b3R5cGUuc2V0QXR0cmlidXRlID0gZnVuY3Rpb24oYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgIHRoaXMuYXR0cmlidXRlc1thdHRyaWJ1dGVdID0gdmFsdWU7XG59O1xuXG4vKipcbiAqIENvbnZlcnQgdGhlIHNwYW4gaW50byBhbiBIVE1MIG5vZGVcbiAqL1xuc3Bhbi5wcm90b3R5cGUudG9Ob2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgIC8vIEFwcGx5IHRoZSBjbGFzc1xuICAgIHNwYW4uY2xhc3NOYW1lID0gY3JlYXRlQ2xhc3ModGhpcy5jbGFzc2VzKTtcblxuICAgIC8vIEFwcGx5IGlubGluZSBzdHlsZXNcbiAgICBmb3IgKHZhciBzdHlsZSBpbiB0aGlzLnN0eWxlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5zdHlsZSwgc3R5bGUpKSB7XG4gICAgICAgICAgICBzcGFuLnN0eWxlW3N0eWxlXSA9IHRoaXMuc3R5bGVbc3R5bGVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQXBwbHkgYXR0cmlidXRlc1xuICAgIGZvciAodmFyIGF0dHIgaW4gdGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5hdHRyaWJ1dGVzLCBhdHRyKSkge1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoYXR0ciwgdGhpcy5hdHRyaWJ1dGVzW2F0dHJdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFwcGVuZCB0aGUgY2hpbGRyZW4sIGFsc28gYXMgSFRNTCBub2Rlc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBzcGFuLmFwcGVuZENoaWxkKHRoaXMuY2hpbGRyZW5baV0udG9Ob2RlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBzcGFuO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0IHRoZSBzcGFuIGludG8gYW4gSFRNTCBtYXJrdXAgc3RyaW5nXG4gKi9cbnNwYW4ucHJvdG90eXBlLnRvTWFya3VwID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1hcmt1cCA9IFwiPHNwYW5cIjtcblxuICAgIC8vIEFkZCB0aGUgY2xhc3NcbiAgICBpZiAodGhpcy5jbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICBtYXJrdXAgKz0gXCIgY2xhc3M9XFxcIlwiO1xuICAgICAgICBtYXJrdXAgKz0gdXRpbHMuZXNjYXBlKGNyZWF0ZUNsYXNzKHRoaXMuY2xhc3NlcykpO1xuICAgICAgICBtYXJrdXAgKz0gXCJcXFwiXCI7XG4gICAgfVxuXG4gICAgdmFyIHN0eWxlcyA9IFwiXCI7XG5cbiAgICAvLyBBZGQgdGhlIHN0eWxlcywgYWZ0ZXIgaHlwaGVuYXRpb25cbiAgICBmb3IgKHZhciBzdHlsZSBpbiB0aGlzLnN0eWxlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0eWxlLmhhc093blByb3BlcnR5KHN0eWxlKSkge1xuICAgICAgICAgICAgc3R5bGVzICs9IHV0aWxzLmh5cGhlbmF0ZShzdHlsZSkgKyBcIjpcIiArIHRoaXMuc3R5bGVbc3R5bGVdICsgXCI7XCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3R5bGVzKSB7XG4gICAgICAgIG1hcmt1cCArPSBcIiBzdHlsZT1cXFwiXCIgKyB1dGlscy5lc2NhcGUoc3R5bGVzKSArIFwiXFxcIlwiO1xuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgYXR0cmlidXRlc1xuICAgIGZvciAodmFyIGF0dHIgaW4gdGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5hdHRyaWJ1dGVzLCBhdHRyKSkge1xuICAgICAgICAgICAgbWFya3VwICs9IFwiIFwiICsgYXR0ciArIFwiPVxcXCJcIjtcbiAgICAgICAgICAgIG1hcmt1cCArPSB1dGlscy5lc2NhcGUodGhpcy5hdHRyaWJ1dGVzW2F0dHJdKTtcbiAgICAgICAgICAgIG1hcmt1cCArPSBcIlxcXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1hcmt1cCArPSBcIj5cIjtcblxuICAgIC8vIEFkZCB0aGUgbWFya3VwIG9mIHRoZSBjaGlsZHJlbiwgYWxzbyBhcyBtYXJrdXBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbWFya3VwICs9IHRoaXMuY2hpbGRyZW5baV0udG9NYXJrdXAoKTtcbiAgICB9XG5cbiAgICBtYXJrdXAgKz0gXCI8L3NwYW4+XCI7XG5cbiAgICByZXR1cm4gbWFya3VwO1xufTtcblxuLyoqXG4gKiBUaGlzIG5vZGUgcmVwcmVzZW50cyBhIGRvY3VtZW50IGZyYWdtZW50LCB3aGljaCBjb250YWlucyBlbGVtZW50cywgYnV0IHdoZW5cbiAqIHBsYWNlZCBpbnRvIHRoZSBET00gZG9lc24ndCBoYXZlIGFueSByZXByZXNlbnRhdGlvbiBpdHNlbGYuIFRodXMsIGl0IG9ubHlcbiAqIGNvbnRhaW5zIGNoaWxkcmVuIGFuZCBkb2Vzbid0IGhhdmUgYW55IEhUTUwgcHJvcGVydGllcy4gSXQgYWxzbyBrZWVwcyB0cmFja1xuICogb2YgYSBoZWlnaHQsIGRlcHRoLCBhbmQgbWF4Rm9udFNpemUuXG4gKi9cbmZ1bmN0aW9uIGRvY3VtZW50RnJhZ21lbnQoY2hpbGRyZW4sIGhlaWdodCwgZGVwdGgsIG1heEZvbnRTaXplKSB7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuIHx8IFtdO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XG4gICAgdGhpcy5kZXB0aCA9IGRlcHRoIHx8IDA7XG4gICAgdGhpcy5tYXhGb250U2l6ZSA9IG1heEZvbnRTaXplIHx8IDA7XG59XG5cbi8qKlxuICogQ29udmVydCB0aGUgZnJhZ21lbnQgaW50byBhIG5vZGVcbiAqL1xuZG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUudG9Ob2RlID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gQ3JlYXRlIGEgZnJhZ21lbnRcbiAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIC8vIEFwcGVuZCB0aGUgY2hpbGRyZW5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZnJhZy5hcHBlbmRDaGlsZCh0aGlzLmNoaWxkcmVuW2ldLnRvTm9kZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnJhZztcbn07XG5cbi8qKlxuICogQ29udmVydCB0aGUgZnJhZ21lbnQgaW50byBIVE1MIG1hcmt1cFxuICovXG5kb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZS50b01hcmt1cCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtYXJrdXAgPSBcIlwiO1xuXG4gICAgLy8gU2ltcGx5IGNvbmNhdGVuYXRlIHRoZSBtYXJrdXAgZm9yIHRoZSBjaGlsZHJlbiB0b2dldGhlclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBtYXJrdXAgKz0gdGhpcy5jaGlsZHJlbltpXS50b01hcmt1cCgpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrdXA7XG59O1xuXG4vKipcbiAqIEEgc3ltYm9sIG5vZGUgY29udGFpbnMgaW5mb3JtYXRpb24gYWJvdXQgYSBzaW5nbGUgc3ltYm9sLiBJdCBlaXRoZXIgcmVuZGVyc1xuICogdG8gYSBzaW5nbGUgdGV4dCBub2RlLCBvciBhIHNwYW4gd2l0aCBhIHNpbmdsZSB0ZXh0IG5vZGUgaW4gaXQsIGRlcGVuZGluZyBvblxuICogd2hldGhlciBpdCBoYXMgQ1NTIGNsYXNzZXMsIHN0eWxlcywgb3IgbmVlZHMgaXRhbGljIGNvcnJlY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHN5bWJvbE5vZGUodmFsdWUsIGhlaWdodCwgZGVwdGgsIGl0YWxpYywgc2tldywgY2xhc3Nlcywgc3R5bGUpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWUgfHwgXCJcIjtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCAwO1xuICAgIHRoaXMuZGVwdGggPSBkZXB0aCB8fCAwO1xuICAgIHRoaXMuaXRhbGljID0gaXRhbGljIHx8IDA7XG4gICAgdGhpcy5za2V3ID0gc2tldyB8fCAwO1xuICAgIHRoaXMuY2xhc3NlcyA9IGNsYXNzZXMgfHwgW107XG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlIHx8IHt9O1xuICAgIHRoaXMubWF4Rm9udFNpemUgPSAwO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB0ZXh0IG5vZGUgb3Igc3BhbiBmcm9tIGEgc3ltYm9sIG5vZGUuIE5vdGUgdGhhdCBhIHNwYW4gaXMgb25seVxuICogY3JlYXRlZCBpZiBpdCBpcyBuZWVkZWQuXG4gKi9cbnN5bWJvbE5vZGUucHJvdG90eXBlLnRvTm9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy52YWx1ZSk7XG4gICAgdmFyIHNwYW4gPSBudWxsO1xuXG4gICAgaWYgKHRoaXMuaXRhbGljID4gMCkge1xuICAgICAgICBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIHNwYW4uc3R5bGUubWFyZ2luUmlnaHQgPSB0aGlzLml0YWxpYyArIFwiZW1cIjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jbGFzc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc3BhbiA9IHNwYW4gfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIHNwYW4uY2xhc3NOYW1lID0gY3JlYXRlQ2xhc3ModGhpcy5jbGFzc2VzKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBzdHlsZSBpbiB0aGlzLnN0eWxlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0eWxlLmhhc093blByb3BlcnR5KHN0eWxlKSkge1xuICAgICAgICAgICAgc3BhbiA9IHNwYW4gfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBzcGFuLnN0eWxlW3N0eWxlXSA9IHRoaXMuc3R5bGVbc3R5bGVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNwYW4pIHtcbiAgICAgICAgc3Bhbi5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgcmV0dXJuIHNwYW47XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIG1hcmt1cCBmb3IgYSBzeW1ib2wgbm9kZS5cbiAqL1xuc3ltYm9sTm9kZS5wcm90b3R5cGUudG9NYXJrdXAgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBUT0RPKGFscGVydCk6IE1vcmUgZHVwbGljYXRpb24gdGhhbiBJJ2QgbGlrZSBmcm9tXG4gICAgLy8gc3Bhbi5wcm90b3R5cGUudG9NYXJrdXAgYW5kIHN5bWJvbE5vZGUucHJvdG90eXBlLnRvTm9kZS4uLlxuICAgIHZhciBuZWVkc1NwYW4gPSBmYWxzZTtcblxuICAgIHZhciBtYXJrdXAgPSBcIjxzcGFuXCI7XG5cbiAgICBpZiAodGhpcy5jbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICBuZWVkc1NwYW4gPSB0cnVlO1xuICAgICAgICBtYXJrdXAgKz0gXCIgY2xhc3M9XFxcIlwiO1xuICAgICAgICBtYXJrdXAgKz0gdXRpbHMuZXNjYXBlKGNyZWF0ZUNsYXNzKHRoaXMuY2xhc3NlcykpO1xuICAgICAgICBtYXJrdXAgKz0gXCJcXFwiXCI7XG4gICAgfVxuXG4gICAgdmFyIHN0eWxlcyA9IFwiXCI7XG5cbiAgICBpZiAodGhpcy5pdGFsaWMgPiAwKSB7XG4gICAgICAgIHN0eWxlcyArPSBcIm1hcmdpbi1yaWdodDpcIiArIHRoaXMuaXRhbGljICsgXCJlbTtcIjtcbiAgICB9XG4gICAgZm9yICh2YXIgc3R5bGUgaW4gdGhpcy5zdHlsZSkge1xuICAgICAgICBpZiAodGhpcy5zdHlsZS5oYXNPd25Qcm9wZXJ0eShzdHlsZSkpIHtcbiAgICAgICAgICAgIHN0eWxlcyArPSB1dGlscy5oeXBoZW5hdGUoc3R5bGUpICsgXCI6XCIgKyB0aGlzLnN0eWxlW3N0eWxlXSArIFwiO1wiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0eWxlcykge1xuICAgICAgICBuZWVkc1NwYW4gPSB0cnVlO1xuICAgICAgICBtYXJrdXAgKz0gXCIgc3R5bGU9XFxcIlwiICsgdXRpbHMuZXNjYXBlKHN0eWxlcykgKyBcIlxcXCJcIjtcbiAgICB9XG5cbiAgICB2YXIgZXNjYXBlZCA9IHV0aWxzLmVzY2FwZSh0aGlzLnZhbHVlKTtcbiAgICBpZiAobmVlZHNTcGFuKSB7XG4gICAgICAgIG1hcmt1cCArPSBcIj5cIjtcbiAgICAgICAgbWFya3VwICs9IGVzY2FwZWQ7XG4gICAgICAgIG1hcmt1cCArPSBcIjwvc3Bhbj5cIjtcbiAgICAgICAgcmV0dXJuIG1hcmt1cDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZXNjYXBlZDtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzcGFuOiBzcGFuLFxuICAgIGRvY3VtZW50RnJhZ21lbnQ6IGRvY3VtZW50RnJhZ21lbnQsXG4gICAgc3ltYm9sTm9kZTogc3ltYm9sTm9kZSxcbn07XG4iLCIvKipcbiAqIFRoaXMgZmlsZSBob2xkcyBhIGxpc3Qgb2YgYWxsIG5vLWFyZ3VtZW50IGZ1bmN0aW9ucyBhbmQgc2luZ2xlLWNoYXJhY3RlclxuICogc3ltYm9scyAobGlrZSAnYScgb3IgJzsnKS5cbiAqXG4gKiBGb3IgZWFjaCBvZiB0aGUgc3ltYm9scywgdGhlcmUgYXJlIHRocmVlIHByb3BlcnRpZXMgdGhleSBjYW4gaGF2ZTpcbiAqIC0gZm9udCAocmVxdWlyZWQpOiB0aGUgZm9udCB0byBiZSB1c2VkIGZvciB0aGlzIHN5bWJvbC4gRWl0aGVyIFwibWFpblwiICh0aGVcbiAgICAgbm9ybWFsIGZvbnQpLCBvciBcImFtc1wiICh0aGUgYW1zIGZvbnRzKS5cbiAqIC0gZ3JvdXAgKHJlcXVpcmVkKTogdGhlIFBhcnNlTm9kZSBncm91cCB0eXBlIHRoZSBzeW1ib2wgc2hvdWxkIGhhdmUgKGkuZS5cbiAgICAgXCJ0ZXh0b3JkXCIsIFwibWF0aG9yZFwiLCBldGMpLlxuICAgICBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0toYW4vS2FUZVgvd2lraS9FeGFtaW5pbmctVGVYI2dyb3VwLXR5cGVzXG4gKiAtIHJlcGxhY2U6IHRoZSBjaGFyYWN0ZXIgdGhhdCB0aGlzIHN5bWJvbCBvciBmdW5jdGlvbiBzaG91bGQgYmVcbiAqICAgcmVwbGFjZWQgd2l0aCAoaS5lLiBcIlxccGhpXCIgaGFzIGEgcmVwbGFjZSB2YWx1ZSBvZiBcIlxcdTAzZDVcIiwgdGhlIHBoaVxuICogICBjaGFyYWN0ZXIgaW4gdGhlIG1haW4gZm9udCkuXG4gKlxuICogVGhlIG91dGVybW9zdCBtYXAgaW4gdGhlIHRhYmxlIGluZGljYXRlcyB3aGF0IG1vZGUgdGhlIHN5bWJvbHMgc2hvdWxkIGJlXG4gKiBhY2NlcHRlZCBpbiAoZS5nLiBcIm1hdGhcIiBvciBcInRleHRcIikuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWF0aDoge30sXG4gICAgdGV4dDoge30sXG59O1xuXG5mdW5jdGlvbiBkZWZpbmVTeW1ib2wobW9kZSwgZm9udCwgZ3JvdXAsIHJlcGxhY2UsIG5hbWUpIHtcbiAgICBtb2R1bGUuZXhwb3J0c1ttb2RlXVtuYW1lXSA9IHtcbiAgICAgICAgZm9udDogZm9udCxcbiAgICAgICAgZ3JvdXA6IGdyb3VwLFxuICAgICAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIH07XG59XG5cbi8vIFNvbWUgYWJicmV2aWF0aW9ucyBmb3IgY29tbW9ubHkgdXNlZCBzdHJpbmdzLlxuLy8gVGhpcyBoZWxwcyBtaW5pZnkgdGhlIGNvZGUsIGFuZCBhbHNvIHNwb3R0aW5nIHR5cG9zIHVzaW5nIGpzaGludC5cblxuLy8gbW9kZXM6XG52YXIgbWF0aCA9IFwibWF0aFwiO1xudmFyIHRleHQgPSBcInRleHRcIjtcblxuLy8gZm9udHM6XG52YXIgbWFpbiA9IFwibWFpblwiO1xudmFyIGFtcyA9IFwiYW1zXCI7XG5cbi8vIGdyb3VwczpcbnZhciBhY2NlbnQgPSBcImFjY2VudFwiO1xudmFyIGJpbiA9IFwiYmluXCI7XG52YXIgY2xvc2UgPSBcImNsb3NlXCI7XG52YXIgaW5uZXIgPSBcImlubmVyXCI7XG52YXIgbWF0aG9yZCA9IFwibWF0aG9yZFwiO1xudmFyIG9wID0gXCJvcFwiO1xudmFyIG9wZW4gPSBcIm9wZW5cIjtcbnZhciBwdW5jdCA9IFwicHVuY3RcIjtcbnZhciByZWwgPSBcInJlbFwiO1xudmFyIHNwYWNpbmcgPSBcInNwYWNpbmdcIjtcbnZhciB0ZXh0b3JkID0gXCJ0ZXh0b3JkXCI7XG5cbi8vIE5vdyBjb21lcyB0aGUgc3ltYm9sIHRhYmxlXG5cbi8vIFJlbGF0aW9uIFN5bWJvbHNcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjI2MVwiLCBcIlxcXFxlcXVpdlwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjI3YVwiLCBcIlxcXFxwcmVjXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMjdiXCIsIFwiXFxcXHN1Y2NcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIyM2NcIiwgXCJcXFxcc2ltXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMmE1XCIsIFwiXFxcXHBlcnBcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTJhYWZcIiwgXCJcXFxccHJlY2VxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyYWIwXCIsIFwiXFxcXHN1Y2NlcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjI0M1wiLCBcIlxcXFxzaW1lcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjIyM1wiLCBcIlxcXFxtaWRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIyNmFcIiwgXCJcXFxcbGxcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIyNmJcIiwgXCJcXFxcZ2dcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIyNGRcIiwgXCJcXFxcYXN5bXBcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIyMjVcIiwgXCJcXFxccGFyYWxsZWxcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIyYzhcIiwgXCJcXFxcYm93dGllXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMzIzXCIsIFwiXFxcXHNtaWxlXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMjkxXCIsIFwiXFxcXHNxc3Vic2V0ZXFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIyOTJcIiwgXCJcXFxcc3FzdXBzZXRlcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjI1MFwiLCBcIlxcXFxkb3RlcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjMyMlwiLCBcIlxcXFxmcm93blwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjIwYlwiLCBcIlxcXFxuaVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjIxZFwiLCBcIlxcXFxwcm9wdG9cIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIyYTJcIiwgXCJcXFxcdmRhc2hcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIyYTNcIiwgXCJcXFxcZGFzaHZcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIyMGJcIiwgXCJcXFxcb3duc1wiKTtcblxuLy8gUHVuY3R1YXRpb25cbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBwdW5jdCwgXCJcXHUwMDJlXCIsIFwiXFxcXGxkb3RwXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHB1bmN0LCBcIlxcdTIyYzVcIiwgXCJcXFxcY2RvdHBcIik7XG5cbi8vIE1pc2MgU3ltYm9sc1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MDAyM1wiLCBcIlxcXFwjXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MDAyNlwiLCBcIlxcXFwmXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MjEzNVwiLCBcIlxcXFxhbGVwaFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTIyMDBcIiwgXCJcXFxcZm9yYWxsXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MjEwZlwiLCBcIlxcXFxoYmFyXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MjIwM1wiLCBcIlxcXFxleGlzdHNcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgdGV4dG9yZCwgXCJcXHUyMjA3XCIsIFwiXFxcXG5hYmxhXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MjY2ZFwiLCBcIlxcXFxmbGF0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MjExM1wiLCBcIlxcXFxlbGxcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgdGV4dG9yZCwgXCJcXHUyNjZlXCIsIFwiXFxcXG5hdHVyYWxcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgdGV4dG9yZCwgXCJcXHUyNjYzXCIsIFwiXFxcXGNsdWJzdWl0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MjExOFwiLCBcIlxcXFx3cFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTI2NmZcIiwgXCJcXFxcc2hhcnBcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgdGV4dG9yZCwgXCJcXHUyNjYyXCIsIFwiXFxcXGRpYW1vbmRzdWl0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MjExY1wiLCBcIlxcXFxSZVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTI2NjFcIiwgXCJcXFxcaGVhcnRzdWl0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MjExMVwiLCBcIlxcXFxJbVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTI2NjBcIiwgXCJcXFxcc3BhZGVzdWl0XCIpO1xuXG4vLyBNYXRoIGFuZCBUZXh0XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgdGV4dG9yZCwgXCJcXHUyMDIwXCIsIFwiXFxcXGRhZ1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTIwMjFcIiwgXCJcXFxcZGRhZ1wiKTtcblxuLy8gTGFyZ2UgRGVsaW1pdGVyc1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGNsb3NlLCBcIlxcdTIzYjFcIiwgXCJcXFxccm1vdXN0YWNoZVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBvcGVuLCBcIlxcdTIzYjBcIiwgXCJcXFxcbG1vdXN0YWNoZVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBjbG9zZSwgXCJcXHUyN2VmXCIsIFwiXFxcXHJncm91cFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBvcGVuLCBcIlxcdTI3ZWVcIiwgXCJcXFxcbGdyb3VwXCIpO1xuXG4vLyBCaW5hcnkgT3BlcmF0b3JzXG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYmluLCBcIlxcdTIyMTNcIiwgXCJcXFxcbXBcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYmluLCBcIlxcdTIyOTZcIiwgXCJcXFxcb21pbnVzXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUyMjhlXCIsIFwiXFxcXHVwbHVzXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUyMjkzXCIsIFwiXFxcXHNxY2FwXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUyMjE3XCIsIFwiXFxcXGFzdFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBiaW4sIFwiXFx1MjI5NFwiLCBcIlxcXFxzcWN1cFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBiaW4sIFwiXFx1MjVlZlwiLCBcIlxcXFxiaWdjaXJjXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUyMjE5XCIsIFwiXFxcXGJ1bGxldFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBiaW4sIFwiXFx1MjAyMVwiLCBcIlxcXFxkZGFnZ2VyXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUyMjQwXCIsIFwiXFxcXHdyXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUyYTNmXCIsIFwiXFxcXGFtYWxnXCIpO1xuXG4vLyBBcnJvdyBTeW1ib2xzXG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTI3ZjVcIiwgXCJcXFxcbG9uZ2xlZnRhcnJvd1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjFkMFwiLCBcIlxcXFxMZWZ0YXJyb3dcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTI3ZjhcIiwgXCJcXFxcTG9uZ2xlZnRhcnJvd1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjdmNlwiLCBcIlxcXFxsb25ncmlnaHRhcnJvd1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjFkMlwiLCBcIlxcXFxSaWdodGFycm93XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyN2Y5XCIsIFwiXFxcXExvbmdyaWdodGFycm93XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMTk0XCIsIFwiXFxcXGxlZnRyaWdodGFycm93XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyN2Y3XCIsIFwiXFxcXGxvbmdsZWZ0cmlnaHRhcnJvd1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjFkNFwiLCBcIlxcXFxMZWZ0cmlnaHRhcnJvd1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjdmYVwiLCBcIlxcXFxMb25nbGVmdHJpZ2h0YXJyb3dcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIxYTZcIiwgXCJcXFxcbWFwc3RvXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyN2ZjXCIsIFwiXFxcXGxvbmdtYXBzdG9cIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIxOTdcIiwgXCJcXFxcbmVhcnJvd1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjFhOVwiLCBcIlxcXFxob29rbGVmdGFycm93XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMWFhXCIsIFwiXFxcXGhvb2tyaWdodGFycm93XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMTk4XCIsIFwiXFxcXHNlYXJyb3dcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIxYmNcIiwgXCJcXFxcbGVmdGhhcnBvb251cFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjFjMFwiLCBcIlxcXFxyaWdodGhhcnBvb251cFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjE5OVwiLCBcIlxcXFxzd2Fycm93XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMWJkXCIsIFwiXFxcXGxlZnRoYXJwb29uZG93blwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjFjMVwiLCBcIlxcXFxyaWdodGhhcnBvb25kb3duXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMTk2XCIsIFwiXFxcXG53YXJyb3dcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIxY2NcIiwgXCJcXFxccmlnaHRsZWZ0aGFycG9vbnNcIik7XG5cbi8vIEFNUyBOZWdhdGVkIEJpbmFyeSBSZWxhdGlvbnNcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMjZlXCIsIFwiXFxcXG5sZXNzXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdWUwMTBcIiwgXCJcXFxcbmxlcXNsYW50XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdWUwMTFcIiwgXCJcXFxcbmxlcXFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MmE4N1wiLCBcIlxcXFxsbmVxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyNjhcIiwgXCJcXFxcbG5lcXFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1ZTAwY1wiLCBcIlxcXFxsdmVydG5lcXFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjJlNlwiLCBcIlxcXFxsbnNpbVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyYTg5XCIsIFwiXFxcXGxuYXBwcm94XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyODBcIiwgXCJcXFxcbnByZWNcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjJlMFwiLCBcIlxcXFxucHJlY2VxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyZThcIiwgXCJcXFxccHJlY25zaW1cIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MmFiOVwiLCBcIlxcXFxwcmVjbmFwcHJveFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMjQxXCIsIFwiXFxcXG5zaW1cIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1ZTAwNlwiLCBcIlxcXFxuc2hvcnRtaWRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjIyNFwiLCBcIlxcXFxubWlkXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyYWNcIiwgXCJcXFxcbnZkYXNoXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyYWRcIiwgXCJcXFxcbnZEYXNoXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyZWFcIiwgXCJcXFxcbnRyaWFuZ2xlbGVmdFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMmVjXCIsIFwiXFxcXG50cmlhbmdsZWxlZnRlcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMjhhXCIsIFwiXFxcXHN1YnNldG5lcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHVlMDFhXCIsIFwiXFxcXHZhcnN1YnNldG5lcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyYWNiXCIsIFwiXFxcXHN1YnNldG5lcXFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1ZTAxN1wiLCBcIlxcXFx2YXJzdWJzZXRuZXFxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyNmZcIiwgXCJcXFxcbmd0clwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHVlMDBmXCIsIFwiXFxcXG5nZXFzbGFudFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHVlMDBlXCIsIFwiXFxcXG5nZXFxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTJhODhcIiwgXCJcXFxcZ25lcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMjY5XCIsIFwiXFxcXGduZXFxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdWUwMGRcIiwgXCJcXFxcZ3ZlcnRuZXFxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyZTdcIiwgXCJcXFxcZ25zaW1cIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MmE4YVwiLCBcIlxcXFxnbmFwcHJveFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMjgxXCIsIFwiXFxcXG5zdWNjXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyZTFcIiwgXCJcXFxcbnN1Y2NlcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMmU5XCIsIFwiXFxcXHN1Y2Nuc2ltXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTJhYmFcIiwgXCJcXFxcc3VjY25hcHByb3hcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjI0NlwiLCBcIlxcXFxuY29uZ1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHVlMDA3XCIsIFwiXFxcXG5zaG9ydHBhcmFsbGVsXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyMjZcIiwgXCJcXFxcbnBhcmFsbGVsXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyYWZcIiwgXCJcXFxcblZEYXNoXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyZWJcIiwgXCJcXFxcbnRyaWFuZ2xlcmlnaHRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjJlZFwiLCBcIlxcXFxudHJpYW5nbGVyaWdodGVxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdWUwMThcIiwgXCJcXFxcbnN1cHNldGVxcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMjhiXCIsIFwiXFxcXHN1cHNldG5lcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHVlMDFiXCIsIFwiXFxcXHZhcnN1cHNldG5lcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyYWNjXCIsIFwiXFxcXHN1cHNldG5lcXFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1ZTAxOVwiLCBcIlxcXFx2YXJzdXBzZXRuZXFxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyYWVcIiwgXCJcXFxcblZkYXNoXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTJhYjVcIiwgXCJcXFxccHJlY25lcXFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MmFiNlwiLCBcIlxcXFxzdWNjbmVxcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHVlMDE2XCIsIFwiXFxcXG5zdWJzZXRlcXFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCBiaW4sIFwiXFx1MjJiNFwiLCBcIlxcXFx1bmxoZFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIGJpbiwgXCJcXHUyMmI1XCIsIFwiXFxcXHVucmhkXCIpO1xuXG4vLyBBTVMgTmVnYXRlZCBBcnJvd3NcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMTlhXCIsIFwiXFxcXG5sZWZ0YXJyb3dcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjE5YlwiLCBcIlxcXFxucmlnaHRhcnJvd1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMWNkXCIsIFwiXFxcXG5MZWZ0YXJyb3dcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjFjZlwiLCBcIlxcXFxuUmlnaHRhcnJvd1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMWFlXCIsIFwiXFxcXG5sZWZ0cmlnaHRhcnJvd1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMWNlXCIsIFwiXFxcXG5MZWZ0cmlnaHRhcnJvd1wiKTtcblxuLy8gQU1TIE1pc2NcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyNWIzXCIsIFwiXFxcXHZhcnRyaWFuZ2xlXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgdGV4dG9yZCwgXCJcXHUyMTBmXCIsIFwiXFxcXGhzbGFzaFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHRleHRvcmQsIFwiXFx1MjViZFwiLCBcIlxcXFx0cmlhbmdsZWRvd25cIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCB0ZXh0b3JkLCBcIlxcdTI1Y2FcIiwgXCJcXFxcbG96ZW5nZVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHRleHRvcmQsIFwiXFx1MjRjOFwiLCBcIlxcXFxjaXJjbGVkU1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHRleHRvcmQsIFwiXFx1MDBhZVwiLCBcIlxcXFxjaXJjbGVkUlwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHRleHRvcmQsIFwiXFx1MjIyMVwiLCBcIlxcXFxtZWFzdXJlZGFuZ2xlXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgdGV4dG9yZCwgXCJcXHUyMjA0XCIsIFwiXFxcXG5leGlzdHNcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCB0ZXh0b3JkLCBcIlxcdTIxMjdcIiwgXCJcXFxcbWhvXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgdGV4dG9yZCwgXCJcXHUyMTMyXCIsIFwiXFxcXEZpbnZcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCB0ZXh0b3JkLCBcIlxcdTIxNDFcIiwgXCJcXFxcR2FtZVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHRleHRvcmQsIFwiXFx1MDA2YlwiLCBcIlxcXFxCYmJrXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgdGV4dG9yZCwgXCJcXHUyMDM1XCIsIFwiXFxcXGJhY2twcmltZVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHRleHRvcmQsIFwiXFx1MjViMlwiLCBcIlxcXFxibGFja3RyaWFuZ2xlXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgdGV4dG9yZCwgXCJcXHUyNWJjXCIsIFwiXFxcXGJsYWNrdHJpYW5nbGVkb3duXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgdGV4dG9yZCwgXCJcXHUyNWEwXCIsIFwiXFxcXGJsYWNrc3F1YXJlXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgdGV4dG9yZCwgXCJcXHUyOWViXCIsIFwiXFxcXGJsYWNrbG96ZW5nZVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHRleHRvcmQsIFwiXFx1MjYwNVwiLCBcIlxcXFxiaWdzdGFyXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgdGV4dG9yZCwgXCJcXHUyMjIyXCIsIFwiXFxcXHNwaGVyaWNhbGFuZ2xlXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgdGV4dG9yZCwgXCJcXHUyMjAxXCIsIFwiXFxcXGNvbXBsZW1lbnRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCB0ZXh0b3JkLCBcIlxcdTAwZjBcIiwgXCJcXFxcZXRoXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgdGV4dG9yZCwgXCJcXHUyNTcxXCIsIFwiXFxcXGRpYWd1cFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHRleHRvcmQsIFwiXFx1MjU3MlwiLCBcIlxcXFxkaWFnZG93blwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHRleHRvcmQsIFwiXFx1MjVhMVwiLCBcIlxcXFxzcXVhcmVcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCB0ZXh0b3JkLCBcIlxcdTI1YTFcIiwgXCJcXFxcQm94XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgdGV4dG9yZCwgXCJcXHUyNWNhXCIsIFwiXFxcXERpYW1vbmRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCB0ZXh0b3JkLCBcIlxcdTAwYTVcIiwgXCJcXFxceWVuXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgdGV4dG9yZCwgXCJcXHUyNzEzXCIsIFwiXFxcXGNoZWNrbWFya1wiKTtcblxuLy8gQU1TIEhlYnJld1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgdGV4dG9yZCwgXCJcXHUyMTM2XCIsIFwiXFxcXGJldGhcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCB0ZXh0b3JkLCBcIlxcdTIxMzhcIiwgXCJcXFxcZGFsZXRoXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgdGV4dG9yZCwgXCJcXHUyMTM3XCIsIFwiXFxcXGdpbWVsXCIpO1xuXG4vLyBBTVMgR3JlZWtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHRleHRvcmQsIFwiXFx1MDNkZFwiLCBcIlxcXFxkaWdhbW1hXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgdGV4dG9yZCwgXCJcXHUwM2YwXCIsIFwiXFxcXHZhcmthcHBhXCIpO1xuXG4vLyBBTVMgRGVsaW1pdGVyc1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgb3BlbiwgXCJcXHUyNTBjXCIsIFwiXFxcXHVsY29ybmVyXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgY2xvc2UsIFwiXFx1MjUxMFwiLCBcIlxcXFx1cmNvcm5lclwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIG9wZW4sIFwiXFx1MjUxNFwiLCBcIlxcXFxsbGNvcm5lclwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIGNsb3NlLCBcIlxcdTI1MThcIiwgXCJcXFxcbHJjb3JuZXJcIik7XG5cbi8vIEFNUyBCaW5hcnkgUmVsYXRpb25zXG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjI2NlwiLCBcIlxcXFxsZXFxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTJhN2RcIiwgXCJcXFxcbGVxc2xhbnRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MmE5NVwiLCBcIlxcXFxlcXNsYW50bGVzc1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMjcyXCIsIFwiXFxcXGxlc3NzaW1cIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MmE4NVwiLCBcIlxcXFxsZXNzYXBwcm94XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyNGFcIiwgXCJcXFxcYXBwcm94ZXFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCBiaW4sIFwiXFx1MjJkNlwiLCBcIlxcXFxsZXNzZG90XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyZDhcIiwgXCJcXFxcbGxsXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyNzZcIiwgXCJcXFxcbGVzc2d0clwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMmRhXCIsIFwiXFxcXGxlc3NlcWd0clwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyYThiXCIsIFwiXFxcXGxlc3NlcXFndHJcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjI1MVwiLCBcIlxcXFxkb3RlcWRvdFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMjUzXCIsIFwiXFxcXHJpc2luZ2RvdHNlcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMjUyXCIsIFwiXFxcXGZhbGxpbmdkb3RzZXFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjIzZFwiLCBcIlxcXFxiYWNrc2ltXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyY2RcIiwgXCJcXFxcYmFja3NpbWVxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTJhYzVcIiwgXCJcXFxcc3Vic2V0ZXFxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyZDBcIiwgXCJcXFxcU3Vic2V0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyOGZcIiwgXCJcXFxcc3FzdWJzZXRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjI3Y1wiLCBcIlxcXFxwcmVjY3VybHllcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMmRlXCIsIFwiXFxcXGN1cmx5ZXFwcmVjXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyN2VcIiwgXCJcXFxccHJlY3NpbVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyYWI3XCIsIFwiXFxcXHByZWNhcHByb3hcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjJiMlwiLCBcIlxcXFx2YXJ0cmlhbmdsZWxlZnRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjJiNFwiLCBcIlxcXFx0cmlhbmdsZWxlZnRlcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMmE4XCIsIFwiXFxcXHZEYXNoXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyYWFcIiwgXCJcXFxcVnZkYXNoXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIzMjNcIiwgXCJcXFxcc21hbGxzbWlsZVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMzIyXCIsIFwiXFxcXHNtYWxsZnJvd25cIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjI0ZlwiLCBcIlxcXFxidW1wZXFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjI0ZVwiLCBcIlxcXFxCdW1wZXFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjI2N1wiLCBcIlxcXFxnZXFxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTJhN2VcIiwgXCJcXFxcZ2Vxc2xhbnRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MmE5NlwiLCBcIlxcXFxlcXNsYW50Z3RyXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyNzNcIiwgXCJcXFxcZ3Ryc2ltXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTJhODZcIiwgXCJcXFxcZ3RyYXBwcm94XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgYmluLCBcIlxcdTIyZDdcIiwgXCJcXFxcZ3RyZG90XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyZDlcIiwgXCJcXFxcZ2dnXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyNzdcIiwgXCJcXFxcZ3RybGVzc1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMmRiXCIsIFwiXFxcXGd0cmVxbGVzc1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyYThjXCIsIFwiXFxcXGd0cmVxcWxlc3NcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjI1NlwiLCBcIlxcXFxlcWNpcmNcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjI1N1wiLCBcIlxcXFxjaXJjZXFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjI1Y1wiLCBcIlxcXFx0cmlhbmdsZXFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjIzY1wiLCBcIlxcXFx0aGlja3NpbVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMjQ4XCIsIFwiXFxcXHRoaWNrYXBwcm94XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTJhYzZcIiwgXCJcXFxcc3Vwc2V0ZXFxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyZDFcIiwgXCJcXFxcU3Vwc2V0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyOTBcIiwgXCJcXFxcc3FzdXBzZXRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjI3ZFwiLCBcIlxcXFxzdWNjY3VybHllcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMmRmXCIsIFwiXFxcXGN1cmx5ZXFzdWNjXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyN2ZcIiwgXCJcXFxcc3VjY3NpbVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyYWI4XCIsIFwiXFxcXHN1Y2NhcHByb3hcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjJiM1wiLCBcIlxcXFx2YXJ0cmlhbmdsZXJpZ2h0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyYjVcIiwgXCJcXFxcdHJpYW5nbGVyaWdodGVxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyYTlcIiwgXCJcXFxcVmRhc2hcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjIyM1wiLCBcIlxcXFxzaG9ydG1pZFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMjI1XCIsIFwiXFxcXHNob3J0cGFyYWxsZWxcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjI2Y1wiLCBcIlxcXFxiZXR3ZWVuXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyZDRcIiwgXCJcXFxccGl0Y2hmb3JrXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyMWRcIiwgXCJcXFxcdmFycHJvcHRvXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTI1YzBcIiwgXCJcXFxcYmxhY2t0cmlhbmdsZWxlZnRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjIzNFwiLCBcIlxcXFx0aGVyZWZvcmVcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjIwZFwiLCBcIlxcXFxiYWNrZXBzaWxvblwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyNWI2XCIsIFwiXFxcXGJsYWNrdHJpYW5nbGVyaWdodFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMjM1XCIsIFwiXFxcXGJlY2F1c2VcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjJkOFwiLCBcIlxcXFxsbGxlc3NcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjJkOVwiLCBcIlxcXFxnZ2d0clwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIGJpbiwgXCJcXHUyMmIyXCIsIFwiXFxcXGxoZFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIGJpbiwgXCJcXHUyMmIzXCIsIFwiXFxcXHJoZFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMjQyXCIsIFwiXFxcXGVxc2ltXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMmM4XCIsIFwiXFxcXEpvaW5cIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjI1MVwiLCBcIlxcXFxEb3RlcVwiKTtcblxuLy8gQU1TIEJpbmFyeSBPcGVyYXRvcnNcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIGJpbiwgXCJcXHUyMjE0XCIsIFwiXFxcXGRvdHBsdXNcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCBiaW4sIFwiXFx1MjIxNlwiLCBcIlxcXFxzbWFsbHNldG1pbnVzXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgYmluLCBcIlxcdTIyZDJcIiwgXCJcXFxcQ2FwXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgYmluLCBcIlxcdTIyZDNcIiwgXCJcXFxcQ3VwXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgYmluLCBcIlxcdTJhNWVcIiwgXCJcXFxcZG91YmxlYmFyd2VkZ2VcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCBiaW4sIFwiXFx1MjI5ZlwiLCBcIlxcXFxib3htaW51c1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIGJpbiwgXCJcXHUyMjllXCIsIFwiXFxcXGJveHBsdXNcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCBiaW4sIFwiXFx1MjJjN1wiLCBcIlxcXFxkaXZpZGVvbnRpbWVzXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgYmluLCBcIlxcdTIyYzlcIiwgXCJcXFxcbHRpbWVzXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgYmluLCBcIlxcdTIyY2FcIiwgXCJcXFxccnRpbWVzXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgYmluLCBcIlxcdTIyY2JcIiwgXCJcXFxcbGVmdHRocmVldGltZXNcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCBiaW4sIFwiXFx1MjJjY1wiLCBcIlxcXFxyaWdodHRocmVldGltZXNcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCBiaW4sIFwiXFx1MjJjZlwiLCBcIlxcXFxjdXJseXdlZGdlXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgYmluLCBcIlxcdTIyY2VcIiwgXCJcXFxcY3VybHl2ZWVcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCBiaW4sIFwiXFx1MjI5ZFwiLCBcIlxcXFxjaXJjbGVkZGFzaFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIGJpbiwgXCJcXHUyMjliXCIsIFwiXFxcXGNpcmNsZWRhc3RcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCBiaW4sIFwiXFx1MjJjNVwiLCBcIlxcXFxjZW50ZXJkb3RcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCBiaW4sIFwiXFx1MjJiYVwiLCBcIlxcXFxpbnRlcmNhbFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIGJpbiwgXCJcXHUyMmQyXCIsIFwiXFxcXGRvdWJsZWNhcFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIGJpbiwgXCJcXHUyMmQzXCIsIFwiXFxcXGRvdWJsZWN1cFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIGJpbiwgXCJcXHUyMmEwXCIsIFwiXFxcXGJveHRpbWVzXCIpO1xuXG4vLyBBTVMgQXJyb3dzXG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjFlMlwiLCBcIlxcXFxkYXNocmlnaHRhcnJvd1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMWUwXCIsIFwiXFxcXGRhc2hsZWZ0YXJyb3dcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjFjN1wiLCBcIlxcXFxsZWZ0bGVmdGFycm93c1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMWM2XCIsIFwiXFxcXGxlZnRyaWdodGFycm93c1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMWRhXCIsIFwiXFxcXExsZWZ0YXJyb3dcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjE5ZVwiLCBcIlxcXFx0d29oZWFkbGVmdGFycm93XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIxYTJcIiwgXCJcXFxcbGVmdGFycm93dGFpbFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMWFiXCIsIFwiXFxcXGxvb3BhcnJvd2xlZnRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjFjYlwiLCBcIlxcXFxsZWZ0cmlnaHRoYXJwb29uc1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMWI2XCIsIFwiXFxcXGN1cnZlYXJyb3dsZWZ0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIxYmFcIiwgXCJcXFxcY2lyY2xlYXJyb3dsZWZ0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIxYjBcIiwgXCJcXFxcTHNoXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIxYzhcIiwgXCJcXFxcdXB1cGFycm93c1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMWJmXCIsIFwiXFxcXHVwaGFycG9vbmxlZnRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjFjM1wiLCBcIlxcXFxkb3duaGFycG9vbmxlZnRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjJiOFwiLCBcIlxcXFxtdWx0aW1hcFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMWFkXCIsIFwiXFxcXGxlZnRyaWdodHNxdWlnYXJyb3dcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjFjOVwiLCBcIlxcXFxyaWdodHJpZ2h0YXJyb3dzXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIxYzRcIiwgXCJcXFxccmlnaHRsZWZ0YXJyb3dzXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIxYTBcIiwgXCJcXFxcdHdvaGVhZHJpZ2h0YXJyb3dcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjFhM1wiLCBcIlxcXFxyaWdodGFycm93dGFpbFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMWFjXCIsIFwiXFxcXGxvb3BhcnJvd3JpZ2h0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIxYjdcIiwgXCJcXFxcY3VydmVhcnJvd3JpZ2h0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIxYmJcIiwgXCJcXFxcY2lyY2xlYXJyb3dyaWdodFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMWIxXCIsIFwiXFxcXFJzaFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMWNhXCIsIFwiXFxcXGRvd25kb3duYXJyb3dzXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIxYmVcIiwgXCJcXFxcdXBoYXJwb29ucmlnaHRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgYW1zLCByZWwsIFwiXFx1MjFjMlwiLCBcIlxcXFxkb3duaGFycG9vbnJpZ2h0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIxZGRcIiwgXCJcXFxccmlnaHRzcXVpZ2Fycm93XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIxZGRcIiwgXCJcXFxcbGVhZHN0b1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMWRiXCIsIFwiXFxcXFJyaWdodGFycm93XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIxYmVcIiwgXCJcXFxccmVzdHJpY3Rpb25cIik7XG5cbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTIwMThcIiwgXCJgXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiJFwiLCBcIlxcXFwkXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiJVwiLCBcIlxcXFwlXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiX1wiLCBcIlxcXFxfXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MjIyMFwiLCBcIlxcXFxhbmdsZVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTIyMWVcIiwgXCJcXFxcaW5mdHlcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgdGV4dG9yZCwgXCJcXHUyMDMyXCIsIFwiXFxcXHByaW1lXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MjViM1wiLCBcIlxcXFx0cmlhbmdsZVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTAzOTNcIiwgXCJcXFxcR2FtbWFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgdGV4dG9yZCwgXCJcXHUwMzk0XCIsIFwiXFxcXERlbHRhXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MDM5OFwiLCBcIlxcXFxUaGV0YVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTAzOWJcIiwgXCJcXFxcTGFtYmRhXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MDM5ZVwiLCBcIlxcXFxYaVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTAzYTBcIiwgXCJcXFxcUGlcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgdGV4dG9yZCwgXCJcXHUwM2EzXCIsIFwiXFxcXFNpZ21hXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MDNhNVwiLCBcIlxcXFxVcHNpbG9uXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MDNhNlwiLCBcIlxcXFxQaGlcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgdGV4dG9yZCwgXCJcXHUwM2E4XCIsIFwiXFxcXFBzaVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTAzYTlcIiwgXCJcXFxcT21lZ2FcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgdGV4dG9yZCwgXCJcXHUwMGFjXCIsIFwiXFxcXG5lZ1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTAwYWNcIiwgXCJcXFxcbG5vdFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTIyYTRcIiwgXCJcXFxcdG9wXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MjJhNVwiLCBcIlxcXFxib3RcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgdGV4dG9yZCwgXCJcXHUyMjA1XCIsIFwiXFxcXGVtcHR5c2V0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgdGV4dG9yZCwgXCJcXHUyMjA1XCIsIFwiXFxcXHZhcm5vdGhpbmdcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgbWF0aG9yZCwgXCJcXHUwM2IxXCIsIFwiXFxcXGFscGhhXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIG1hdGhvcmQsIFwiXFx1MDNiMlwiLCBcIlxcXFxiZXRhXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIG1hdGhvcmQsIFwiXFx1MDNiM1wiLCBcIlxcXFxnYW1tYVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBtYXRob3JkLCBcIlxcdTAzYjRcIiwgXCJcXFxcZGVsdGFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgbWF0aG9yZCwgXCJcXHUwM2Y1XCIsIFwiXFxcXGVwc2lsb25cIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgbWF0aG9yZCwgXCJcXHUwM2I2XCIsIFwiXFxcXHpldGFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgbWF0aG9yZCwgXCJcXHUwM2I3XCIsIFwiXFxcXGV0YVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBtYXRob3JkLCBcIlxcdTAzYjhcIiwgXCJcXFxcdGhldGFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgbWF0aG9yZCwgXCJcXHUwM2I5XCIsIFwiXFxcXGlvdGFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgbWF0aG9yZCwgXCJcXHUwM2JhXCIsIFwiXFxcXGthcHBhXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIG1hdGhvcmQsIFwiXFx1MDNiYlwiLCBcIlxcXFxsYW1iZGFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgbWF0aG9yZCwgXCJcXHUwM2JjXCIsIFwiXFxcXG11XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIG1hdGhvcmQsIFwiXFx1MDNiZFwiLCBcIlxcXFxudVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBtYXRob3JkLCBcIlxcdTAzYmVcIiwgXCJcXFxceGlcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgbWF0aG9yZCwgXCJvXCIsIFwiXFxcXG9taWNyb25cIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgbWF0aG9yZCwgXCJcXHUwM2MwXCIsIFwiXFxcXHBpXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIG1hdGhvcmQsIFwiXFx1MDNjMVwiLCBcIlxcXFxyaG9cIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgbWF0aG9yZCwgXCJcXHUwM2MzXCIsIFwiXFxcXHNpZ21hXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIG1hdGhvcmQsIFwiXFx1MDNjNFwiLCBcIlxcXFx0YXVcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgbWF0aG9yZCwgXCJcXHUwM2M1XCIsIFwiXFxcXHVwc2lsb25cIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgbWF0aG9yZCwgXCJcXHUwM2Q1XCIsIFwiXFxcXHBoaVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBtYXRob3JkLCBcIlxcdTAzYzdcIiwgXCJcXFxcY2hpXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIG1hdGhvcmQsIFwiXFx1MDNjOFwiLCBcIlxcXFxwc2lcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgbWF0aG9yZCwgXCJcXHUwM2M5XCIsIFwiXFxcXG9tZWdhXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIG1hdGhvcmQsIFwiXFx1MDNiNVwiLCBcIlxcXFx2YXJlcHNpbG9uXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIG1hdGhvcmQsIFwiXFx1MDNkMVwiLCBcIlxcXFx2YXJ0aGV0YVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBtYXRob3JkLCBcIlxcdTAzZDZcIiwgXCJcXFxcdmFycGlcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgbWF0aG9yZCwgXCJcXHUwM2YxXCIsIFwiXFxcXHZhcnJob1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBtYXRob3JkLCBcIlxcdTAzYzJcIiwgXCJcXFxcdmFyc2lnbWFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgbWF0aG9yZCwgXCJcXHUwM2M2XCIsIFwiXFxcXHZhcnBoaVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBiaW4sIFwiXFx1MjIxN1wiLCBcIipcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYmluLCBcIitcIiwgXCIrXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUyMjEyXCIsIFwiLVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBiaW4sIFwiXFx1MjJjNVwiLCBcIlxcXFxjZG90XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUyMjE4XCIsIFwiXFxcXGNpcmNcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYmluLCBcIlxcdTAwZjdcIiwgXCJcXFxcZGl2XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUwMGIxXCIsIFwiXFxcXHBtXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUwMGQ3XCIsIFwiXFxcXHRpbWVzXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUyMjI5XCIsIFwiXFxcXGNhcFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBiaW4sIFwiXFx1MjIyYVwiLCBcIlxcXFxjdXBcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYmluLCBcIlxcdTIyMTZcIiwgXCJcXFxcc2V0bWludXNcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYmluLCBcIlxcdTIyMjdcIiwgXCJcXFxcbGFuZFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBiaW4sIFwiXFx1MjIyOFwiLCBcIlxcXFxsb3JcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYmluLCBcIlxcdTIyMjdcIiwgXCJcXFxcd2VkZ2VcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYmluLCBcIlxcdTIyMjhcIiwgXCJcXFxcdmVlXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MjIxYVwiLCBcIlxcXFxzdXJkXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIG9wZW4sIFwiKFwiLCBcIihcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgb3BlbiwgXCJbXCIsIFwiW1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBvcGVuLCBcIlxcdTI3ZThcIiwgXCJcXFxcbGFuZ2xlXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIG9wZW4sIFwiXFx1MjIyM1wiLCBcIlxcXFxsdmVydFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBvcGVuLCBcIlxcdTIyMjVcIiwgXCJcXFxcbFZlcnRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgY2xvc2UsIFwiKVwiLCBcIilcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgY2xvc2UsIFwiXVwiLCBcIl1cIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgY2xvc2UsIFwiP1wiLCBcIj9cIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgY2xvc2UsIFwiIVwiLCBcIiFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgY2xvc2UsIFwiXFx1MjdlOVwiLCBcIlxcXFxyYW5nbGVcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgY2xvc2UsIFwiXFx1MjIyM1wiLCBcIlxcXFxydmVydFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBjbG9zZSwgXCJcXHUyMjI1XCIsIFwiXFxcXHJWZXJ0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCI9XCIsIFwiPVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiPFwiLCBcIjxcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIj5cIiwgXCI+XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCI6XCIsIFwiOlwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjI0OFwiLCBcIlxcXFxhcHByb3hcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIyNDVcIiwgXCJcXFxcY29uZ1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjI2NVwiLCBcIlxcXFxnZVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjI2NVwiLCBcIlxcXFxnZXFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIxOTBcIiwgXCJcXFxcZ2V0c1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiPlwiLCBcIlxcXFxndFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjIwOFwiLCBcIlxcXFxpblwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjIwOVwiLCBcIlxcXFxub3RpblwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjI4MlwiLCBcIlxcXFxzdWJzZXRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIyODNcIiwgXCJcXFxcc3Vwc2V0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMjg2XCIsIFwiXFxcXHN1YnNldGVxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMjg3XCIsIFwiXFxcXHN1cHNldGVxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyODhcIiwgXCJcXFxcbnN1YnNldGVxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyODlcIiwgXCJcXFxcbnN1cHNldGVxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMmE4XCIsIFwiXFxcXG1vZGVsc1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjE5MFwiLCBcIlxcXFxsZWZ0YXJyb3dcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIyNjRcIiwgXCJcXFxcbGVcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIyNjRcIiwgXCJcXFxcbGVxXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCI8XCIsIFwiXFxcXGx0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMjYwXCIsIFwiXFxcXG5lXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMjYwXCIsIFwiXFxcXG5lcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjE5MlwiLCBcIlxcXFxyaWdodGFycm93XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMTkyXCIsIFwiXFxcXHRvXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgcmVsLCBcIlxcdTIyNzFcIiwgXCJcXFxcbmdlcVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIHJlbCwgXCJcXHUyMjcwXCIsIFwiXFxcXG5sZXFcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgc3BhY2luZywgbnVsbCwgXCJcXFxcIVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBzcGFjaW5nLCBcIlxcdTAwYTBcIiwgXCJcXFxcIFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBzcGFjaW5nLCBcIlxcdTAwYTBcIiwgXCJ+XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHNwYWNpbmcsIG51bGwsIFwiXFxcXCxcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgc3BhY2luZywgbnVsbCwgXCJcXFxcOlwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBzcGFjaW5nLCBudWxsLCBcIlxcXFw7XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHNwYWNpbmcsIG51bGwsIFwiXFxcXGVuc3BhY2VcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgc3BhY2luZywgbnVsbCwgXCJcXFxccXF1YWRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgc3BhY2luZywgbnVsbCwgXCJcXFxccXVhZFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBzcGFjaW5nLCBcIlxcdTAwYTBcIiwgXCJcXFxcc3BhY2VcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcHVuY3QsIFwiLFwiLCBcIixcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcHVuY3QsIFwiO1wiLCBcIjtcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcHVuY3QsIFwiOlwiLCBcIlxcXFxjb2xvblwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIGJpbiwgXCJcXHUyMmJjXCIsIFwiXFxcXGJhcndlZGdlXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgYmluLCBcIlxcdTIyYmJcIiwgXCJcXFxcdmVlYmFyXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUyMjk5XCIsIFwiXFxcXG9kb3RcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYmluLCBcIlxcdTIyOTVcIiwgXCJcXFxcb3BsdXNcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYmluLCBcIlxcdTIyOTdcIiwgXCJcXFxcb3RpbWVzXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFx1MjIwMlwiLCBcIlxcXFxwYXJ0aWFsXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUyMjk4XCIsIFwiXFxcXG9zbGFzaFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBhbXMsIGJpbiwgXCJcXHUyMjlhXCIsIFwiXFxcXGNpcmNsZWRjaXJjXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIGFtcywgYmluLCBcIlxcdTIyYTFcIiwgXCJcXFxcYm94ZG90XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUyNWIzXCIsIFwiXFxcXGJpZ3RyaWFuZ2xldXBcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYmluLCBcIlxcdTI1YmRcIiwgXCJcXFxcYmlndHJpYW5nbGVkb3duXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUyMDIwXCIsIFwiXFxcXGRhZ2dlclwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBiaW4sIFwiXFx1MjJjNFwiLCBcIlxcXFxkaWFtb25kXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUyMmM2XCIsIFwiXFxcXHN0YXJcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYmluLCBcIlxcdTI1YzNcIiwgXCJcXFxcdHJpYW5nbGVsZWZ0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGJpbiwgXCJcXHUyNWI5XCIsIFwiXFxcXHRyaWFuZ2xlcmlnaHRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgb3BlbiwgXCJ7XCIsIFwiXFxcXHtcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgY2xvc2UsIFwifVwiLCBcIlxcXFx9XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIG9wZW4sIFwie1wiLCBcIlxcXFxsYnJhY2VcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgY2xvc2UsIFwifVwiLCBcIlxcXFxyYnJhY2VcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgb3BlbiwgXCJbXCIsIFwiXFxcXGxicmFja1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBjbG9zZSwgXCJdXCIsIFwiXFxcXHJicmFja1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBvcGVuLCBcIlxcdTIzMGFcIiwgXCJcXFxcbGZsb29yXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGNsb3NlLCBcIlxcdTIzMGJcIiwgXCJcXFxccmZsb29yXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIG9wZW4sIFwiXFx1MjMwOFwiLCBcIlxcXFxsY2VpbFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBjbG9zZSwgXCJcXHUyMzA5XCIsIFwiXFxcXHJjZWlsXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHRleHRvcmQsIFwiXFxcXFwiLCBcIlxcXFxiYWNrc2xhc2hcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgdGV4dG9yZCwgXCJcXHUyMjIzXCIsIFwifFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTIyMjNcIiwgXCJcXFxcdmVydFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTIyMjVcIiwgXCJcXFxcfFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTIyMjVcIiwgXCJcXFxcVmVydFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjE5MVwiLCBcIlxcXFx1cGFycm93XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMWQxXCIsIFwiXFxcXFVwYXJyb3dcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgcmVsLCBcIlxcdTIxOTNcIiwgXCJcXFxcZG93bmFycm93XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIHJlbCwgXCJcXHUyMWQzXCIsIFwiXFxcXERvd25hcnJvd1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjE5NVwiLCBcIlxcXFx1cGRvd25hcnJvd1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCByZWwsIFwiXFx1MjFkNVwiLCBcIlxcXFxVcGRvd25hcnJvd1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYXRoLCBvcCwgXCJcXHUyMjEwXCIsIFwiXFxcXGNvcHJvZFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYXRoLCBvcCwgXCJcXHUyMmMxXCIsIFwiXFxcXGJpZ3ZlZVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYXRoLCBvcCwgXCJcXHUyMmMwXCIsIFwiXFxcXGJpZ3dlZGdlXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1hdGgsIG9wLCBcIlxcdTJhMDRcIiwgXCJcXFxcYmlndXBsdXNcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWF0aCwgb3AsIFwiXFx1MjJjMlwiLCBcIlxcXFxiaWdjYXBcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWF0aCwgb3AsIFwiXFx1MjJjM1wiLCBcIlxcXFxiaWdjdXBcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWF0aCwgb3AsIFwiXFx1MjIyYlwiLCBcIlxcXFxpbnRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWF0aCwgb3AsIFwiXFx1MjIyYlwiLCBcIlxcXFxpbnRvcFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYXRoLCBvcCwgXCJcXHUyMjJjXCIsIFwiXFxcXGlpbnRcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWF0aCwgb3AsIFwiXFx1MjIyZFwiLCBcIlxcXFxpaWludFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYXRoLCBvcCwgXCJcXHUyMjBmXCIsIFwiXFxcXHByb2RcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWF0aCwgb3AsIFwiXFx1MjIxMVwiLCBcIlxcXFxzdW1cIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWF0aCwgb3AsIFwiXFx1MmEwMlwiLCBcIlxcXFxiaWdvdGltZXNcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWF0aCwgb3AsIFwiXFx1MmEwMVwiLCBcIlxcXFxiaWdvcGx1c1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYXRoLCBvcCwgXCJcXHUyYTAwXCIsIFwiXFxcXGJpZ29kb3RcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWF0aCwgb3AsIFwiXFx1MjIyZVwiLCBcIlxcXFxvaW50XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1hdGgsIG9wLCBcIlxcdTJhMDZcIiwgXCJcXFxcYmlnc3FjdXBcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWF0aCwgb3AsIFwiXFx1MjIyYlwiLCBcIlxcXFxzbWFsbGludFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBpbm5lciwgXCJcXHUyMDI2XCIsIFwiXFxcXGxkb3RzXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGlubmVyLCBcIlxcdTIyZWZcIiwgXCJcXFxcY2RvdHNcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgaW5uZXIsIFwiXFx1MjJmMVwiLCBcIlxcXFxkZG90c1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBcIlxcdTIyZWVcIiwgXCJcXFxcdmRvdHNcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYWNjZW50LCBcIlxcdTAwYjRcIiwgXCJcXFxcYWN1dGVcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYWNjZW50LCBcIlxcdTAwNjBcIiwgXCJcXFxcZ3JhdmVcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYWNjZW50LCBcIlxcdTAwYThcIiwgXCJcXFxcZGRvdFwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBhY2NlbnQsIFwiXFx1MDA3ZVwiLCBcIlxcXFx0aWxkZVwiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBhY2NlbnQsIFwiXFx1MDBhZlwiLCBcIlxcXFxiYXJcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYWNjZW50LCBcIlxcdTAyZDhcIiwgXCJcXFxcYnJldmVcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYWNjZW50LCBcIlxcdTAyYzdcIiwgXCJcXFxcY2hlY2tcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgYWNjZW50LCBcIlxcdTAwNWVcIiwgXCJcXFxcaGF0XCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIGFjY2VudCwgXCJcXHUyMGQ3XCIsIFwiXFxcXHZlY1wiKTtcbmRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBhY2NlbnQsIFwiXFx1MDJkOVwiLCBcIlxcXFxkb3RcIik7XG5kZWZpbmVTeW1ib2wobWF0aCwgbWFpbiwgbWF0aG9yZCwgXCJcXHUwMTMxXCIsIFwiXFxcXGltYXRoXCIpO1xuZGVmaW5lU3ltYm9sKG1hdGgsIG1haW4sIG1hdGhvcmQsIFwiXFx1MDIzN1wiLCBcIlxcXFxqbWF0aFwiKTtcblxuZGVmaW5lU3ltYm9sKHRleHQsIG1haW4sIHNwYWNpbmcsIFwiXFx1MDBhMFwiLCBcIlxcXFwgXCIpO1xuZGVmaW5lU3ltYm9sKHRleHQsIG1haW4sIHNwYWNpbmcsIFwiXFx1MDBhMFwiLCBcIiBcIik7XG5kZWZpbmVTeW1ib2wodGV4dCwgbWFpbiwgc3BhY2luZywgXCJcXHUwMGEwXCIsIFwiflwiKTtcblxuLy8gVGhlcmUgYXJlIGxvdHMgb2Ygc3ltYm9scyB3aGljaCBhcmUgdGhlIHNhbWUsIHNvIHdlIGFkZCB0aGVtIGluIGFmdGVyd2FyZHMuXG52YXIgaTtcbnZhciBjaDtcblxuLy8gQWxsIG9mIHRoZXNlIGFyZSB0ZXh0b3JkcyBpbiBtYXRoIG1vZGVcbnZhciBtYXRoVGV4dFN5bWJvbHMgPSBcIjAxMjM0NTY3ODkvQC5cXFwiXCI7XG5mb3IgKGkgPSAwOyBpIDwgbWF0aFRleHRTeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG4gICAgY2ggPSBtYXRoVGV4dFN5bWJvbHMuY2hhckF0KGkpO1xuICAgIGRlZmluZVN5bWJvbChtYXRoLCBtYWluLCB0ZXh0b3JkLCBjaCwgY2gpO1xufVxuXG4vLyBBbGwgb2YgdGhlc2UgYXJlIHRleHRvcmRzIGluIHRleHQgbW9kZVxudmFyIHRleHRTeW1ib2xzID0gXCIwMTIzNDU2Nzg5YCFAKigpLT0rW10nXFxcIjs6Py8uLFwiO1xuZm9yIChpID0gMDsgaSA8IHRleHRTeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG4gICAgY2ggPSB0ZXh0U3ltYm9scy5jaGFyQXQoaSk7XG4gICAgZGVmaW5lU3ltYm9sKHRleHQsIG1haW4sIHRleHRvcmQsIGNoLCBjaCk7XG59XG5cbi8vIEFsbCBvZiB0aGVzZSBhcmUgdGV4dG9yZHMgaW4gdGV4dCBtb2RlLCBhbmQgbWF0aG9yZHMgaW4gbWF0aCBtb2RlXG52YXIgbGV0dGVycyA9IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiO1xuZm9yIChpID0gMDsgaSA8IGxldHRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBjaCA9IGxldHRlcnMuY2hhckF0KGkpO1xuICAgIGRlZmluZVN5bWJvbChtYXRoLCBtYWluLCBtYXRob3JkLCBjaCwgY2gpO1xuICAgIGRlZmluZVN5bWJvbCh0ZXh0LCBtYWluLCB0ZXh0b3JkLCBjaCwgY2gpO1xufVxuIiwidmFyIGJ1aWxkSFRNTCA9IHJlcXVpcmUoXCIuL2J1aWxkSFRNTFwiKTtcbnZhciBidWlsZE1hdGhNTCA9IHJlcXVpcmUoXCIuL2J1aWxkTWF0aE1MXCIpO1xudmFyIGJ1aWxkQ29tbW9uID0gcmVxdWlyZShcIi4vYnVpbGRDb21tb25cIik7XG52YXIgT3B0aW9ucyA9IHJlcXVpcmUoXCIuL09wdGlvbnNcIik7XG52YXIgU2V0dGluZ3MgPSByZXF1aXJlKFwiLi9TZXR0aW5nc1wiKTtcbnZhciBTdHlsZSA9IHJlcXVpcmUoXCIuL1N0eWxlXCIpO1xuXG52YXIgbWFrZVNwYW4gPSBidWlsZENvbW1vbi5tYWtlU3BhbjtcblxudmFyIGJ1aWxkVHJlZSA9IGZ1bmN0aW9uKHRyZWUsIGV4cHJlc3Npb24sIHNldHRpbmdzKSB7XG4gICAgc2V0dGluZ3MgPSBzZXR0aW5ncyB8fCBuZXcgU2V0dGluZ3Moe30pO1xuXG4gICAgdmFyIHN0YXJ0U3R5bGUgPSBTdHlsZS5URVhUO1xuICAgIGlmIChzZXR0aW5ncy5kaXNwbGF5TW9kZSkge1xuICAgICAgICBzdGFydFN0eWxlID0gU3R5bGUuRElTUExBWTtcbiAgICB9XG5cbiAgICAvLyBTZXR1cCB0aGUgZGVmYXVsdCBvcHRpb25zXG4gICAgdmFyIG9wdGlvbnMgPSBuZXcgT3B0aW9ucyh7XG4gICAgICAgIHN0eWxlOiBzdGFydFN0eWxlLFxuICAgICAgICBzaXplOiBcInNpemU1XCIsXG4gICAgfSk7XG5cbiAgICAvLyBgYnVpbGRIVE1MYCBzb21ldGltZXMgbWVzc2VzIHdpdGggdGhlIHBhcnNlIHRyZWUgKGxpa2UgdHVybmluZyBiaW5zIC0+XG4gICAgLy8gb3JkcyksIHNvIHdlIGJ1aWxkIHRoZSBNYXRoTUwgdmVyc2lvbiBmaXJzdC5cbiAgICB2YXIgbWF0aE1MTm9kZSA9IGJ1aWxkTWF0aE1MKHRyZWUsIGV4cHJlc3Npb24sIG9wdGlvbnMpO1xuICAgIHZhciBodG1sTm9kZSA9IGJ1aWxkSFRNTCh0cmVlLCBvcHRpb25zKTtcblxuICAgIHZhciBrYXRleE5vZGUgPSBtYWtlU3BhbihbXCJrYXRleFwiXSwgW1xuICAgICAgICBtYXRoTUxOb2RlLCBodG1sTm9kZSxcbiAgICBdKTtcblxuICAgIGlmIChzZXR0aW5ncy5kaXNwbGF5TW9kZSkge1xuICAgICAgICByZXR1cm4gbWFrZVNwYW4oW1wia2F0ZXgtZGlzcGxheVwiXSwgW2thdGV4Tm9kZV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrYXRleE5vZGU7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBidWlsZFRyZWU7XG4iLCIvKipcbiAqIFRoZXNlIG9iamVjdHMgc3RvcmUgZGF0YSBhYm91dCBNYXRoTUwgbm9kZXMuIFRoaXMgaXMgdGhlIE1hdGhNTCBlcXVpdmFsZW50XG4gKiBvZiB0aGUgdHlwZXMgaW4gZG9tVHJlZS5qcy4gU2luY2UgTWF0aE1MIGhhbmRsZXMgaXRzIG93biByZW5kZXJpbmcsIGFuZFxuICogc2luY2Ugd2UncmUgbWFpbmx5IHVzaW5nIE1hdGhNTCB0byBpbXByb3ZlIGFjY2Vzc2liaWxpdHksIHdlIGRvbid0IG1hbmFnZVxuICogYW55IG9mIHRoZSBzdHlsaW5nIHN0YXRlIHRoYXQgdGhlIHBsYWluIERPTSBub2RlcyBkby5cbiAqXG4gKiBUaGUgYHRvTm9kZWAgYW5kIGB0b01hcmt1cGAgZnVuY3Rpb25zIHdvcmsgc2ltbGFybHkgdG8gaG93IHRoZXkgZG8gaW5cbiAqIGRvbVRyZWUuanMsIGNyZWF0aW5nIG5hbWVzcGFjZWQgRE9NIG5vZGVzIGFuZCBIVE1MIHRleHQgbWFya3VwIHJlc3BlY3RpdmVseS5cbiAqL1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcblxuLyoqXG4gKiBUaGlzIG5vZGUgcmVwcmVzZW50cyBhIGdlbmVyYWwgcHVycG9zZSBNYXRoTUwgbm9kZSBvZiBhbnkgdHlwZS4gVGhlXG4gKiBjb25zdHJ1Y3RvciByZXF1aXJlcyB0aGUgdHlwZSBvZiBub2RlIHRvIGNyZWF0ZSAoZm9yIGV4YW1wbGUsIGBcIm1vXCJgIG9yXG4gKiBgXCJtc3BhY2VcImAsIGNvcnJlc3BvbmRpbmcgdG8gYDxtbz5gIGFuZCBgPG1zcGFjZT5gIHRhZ3MpLlxuICovXG5mdW5jdGlvbiBNYXRoTm9kZSh0eXBlLCBjaGlsZHJlbikge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuIHx8IFtdO1xufVxuXG4vKipcbiAqIFNldHMgYW4gYXR0cmlidXRlIG9uIGEgTWF0aE1MIG5vZGUuIE1hdGhNTCBkZXBlbmRzIG9uIGF0dHJpYnV0ZXMgdG8gY29udmV5IGFcbiAqIHNlbWFudGljIGNvbnRlbnQsIHNvIHRoaXMgaXMgdXNlZCBoZWF2aWx5LlxuICovXG5NYXRoTm9kZS5wcm90b3R5cGUuc2V0QXR0cmlidXRlID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLmF0dHJpYnV0ZXNbbmFtZV0gPSB2YWx1ZTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgdGhlIG1hdGggbm9kZSBpbnRvIGEgTWF0aE1MLW5hbWVzcGFjZWQgRE9NIGVsZW1lbnQuXG4gKi9cbk1hdGhOb2RlLnByb3RvdHlwZS50b05vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgXCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MXCIsIHRoaXMudHlwZSk7XG5cbiAgICBmb3IgKHZhciBhdHRyIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuYXR0cmlidXRlcywgYXR0cikpIHtcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGF0dHIsIHRoaXMuYXR0cmlidXRlc1thdHRyXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbm9kZS5hcHBlbmRDaGlsZCh0aGlzLmNoaWxkcmVuW2ldLnRvTm9kZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgdGhlIG1hdGggbm9kZSBpbnRvIGFuIEhUTUwgbWFya3VwIHN0cmluZy5cbiAqL1xuTWF0aE5vZGUucHJvdG90eXBlLnRvTWFya3VwID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1hcmt1cCA9IFwiPFwiICsgdGhpcy50eXBlO1xuXG4gICAgLy8gQWRkIHRoZSBhdHRyaWJ1dGVzXG4gICAgZm9yICh2YXIgYXR0ciBpbiB0aGlzLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmF0dHJpYnV0ZXMsIGF0dHIpKSB7XG4gICAgICAgICAgICBtYXJrdXAgKz0gXCIgXCIgKyBhdHRyICsgXCI9XFxcIlwiO1xuICAgICAgICAgICAgbWFya3VwICs9IHV0aWxzLmVzY2FwZSh0aGlzLmF0dHJpYnV0ZXNbYXR0cl0pO1xuICAgICAgICAgICAgbWFya3VwICs9IFwiXFxcIlwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWFya3VwICs9IFwiPlwiO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1hcmt1cCArPSB0aGlzLmNoaWxkcmVuW2ldLnRvTWFya3VwKCk7XG4gICAgfVxuXG4gICAgbWFya3VwICs9IFwiPC9cIiArIHRoaXMudHlwZSArIFwiPlwiO1xuXG4gICAgcmV0dXJuIG1hcmt1cDtcbn07XG5cbi8qKlxuICogVGhpcyBub2RlIHJlcHJlc2VudHMgYSBwaWVjZSBvZiB0ZXh0LlxuICovXG5mdW5jdGlvbiBUZXh0Tm9kZSh0ZXh0KSB7XG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgdGV4dCBub2RlIGludG8gYSBET00gdGV4dCBub2RlLlxuICovXG5UZXh0Tm9kZS5wcm90b3R5cGUudG9Ob2RlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMudGV4dCk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHRoZSB0ZXh0IG5vZGUgaW50byBIVE1MIG1hcmt1cCAod2hpY2ggaXMganVzdCB0aGUgdGV4dCBpdHNlbGYpLlxuICovXG5UZXh0Tm9kZS5wcm90b3R5cGUudG9NYXJrdXAgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdXRpbHMuZXNjYXBlKHRoaXMudGV4dCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBNYXRoTm9kZTogTWF0aE5vZGUsXG4gICAgVGV4dE5vZGU6IFRleHROb2RlLFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFwiQU1TLVJlZ3VsYXJcIjoge1xuICAgICAgICBcIjY1XCI6IFswLCAwLjY4ODg5LCAwLCAwXSxcbiAgICAgICAgXCI2NlwiOiBbMCwgMC42ODg4OSwgMCwgMF0sXG4gICAgICAgIFwiNjdcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjY4XCI6IFswLCAwLjY4ODg5LCAwLCAwXSxcbiAgICAgICAgXCI2OVwiOiBbMCwgMC42ODg4OSwgMCwgMF0sXG4gICAgICAgIFwiNzBcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjcxXCI6IFswLCAwLjY4ODg5LCAwLCAwXSxcbiAgICAgICAgXCI3MlwiOiBbMCwgMC42ODg4OSwgMCwgMF0sXG4gICAgICAgIFwiNzNcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjc0XCI6IFswLjE2NjY3LCAwLjY4ODg5LCAwLCAwXSxcbiAgICAgICAgXCI3NVwiOiBbMCwgMC42ODg4OSwgMCwgMF0sXG4gICAgICAgIFwiNzZcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjc3XCI6IFswLCAwLjY4ODg5LCAwLCAwXSxcbiAgICAgICAgXCI3OFwiOiBbMCwgMC42ODg4OSwgMCwgMF0sXG4gICAgICAgIFwiNzlcIjogWzAuMTY2NjcsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjgwXCI6IFswLCAwLjY4ODg5LCAwLCAwXSxcbiAgICAgICAgXCI4MVwiOiBbMC4xNjY2NywgMC42ODg4OSwgMCwgMF0sXG4gICAgICAgIFwiODJcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjgzXCI6IFswLCAwLjY4ODg5LCAwLCAwXSxcbiAgICAgICAgXCI4NFwiOiBbMCwgMC42ODg4OSwgMCwgMF0sXG4gICAgICAgIFwiODVcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjg2XCI6IFswLCAwLjY4ODg5LCAwLCAwXSxcbiAgICAgICAgXCI4N1wiOiBbMCwgMC42ODg4OSwgMCwgMF0sXG4gICAgICAgIFwiODhcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjg5XCI6IFswLCAwLjY4ODg5LCAwLCAwXSxcbiAgICAgICAgXCI5MFwiOiBbMCwgMC42ODg4OSwgMCwgMF0sXG4gICAgICAgIFwiMTA3XCI6IFswLCAwLjY4ODg5LCAwLCAwXSxcbiAgICAgICAgXCIxNjVcIjogWzAsIDAuNjc1LCAwLjAyNSwgMF0sXG4gICAgICAgIFwiMTc0XCI6IFswLjE1NTU5LCAwLjY5MjI0LCAwLCAwXSxcbiAgICAgICAgXCIyNDBcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjI5NVwiOiBbMCwgMC42ODg4OSwgMCwgMF0sXG4gICAgICAgIFwiNzEwXCI6IFswLCAwLjgyNSwgMCwgMF0sXG4gICAgICAgIFwiNzMyXCI6IFswLCAwLjksIDAsIDBdLFxuICAgICAgICBcIjc3MFwiOiBbMCwgMC44MjUsIDAsIDBdLFxuICAgICAgICBcIjc3MVwiOiBbMCwgMC45LCAwLCAwXSxcbiAgICAgICAgXCI5ODlcIjogWzAuMDgxNjcsIDAuNTgxNjcsIDAsIDBdLFxuICAgICAgICBcIjEwMDhcIjogWzAsIDAuNDMwNTYsIDAuMDQwMjgsIDBdLFxuICAgICAgICBcIjgyNDVcIjogWzAsIDAuNTQ5ODYsIDAsIDBdLFxuICAgICAgICBcIjg0NjNcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjg0ODdcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjg0OThcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjg1MDJcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjg1MDNcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjg1MDRcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjg1MTNcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjg1OTJcIjogWy0wLjAzNTk4LCAwLjQ2NDAyLCAwLCAwXSxcbiAgICAgICAgXCI4NTk0XCI6IFstMC4wMzU5OCwgMC40NjQwMiwgMCwgMF0sXG4gICAgICAgIFwiODYwMlwiOiBbLTAuMTMzMTMsIDAuMzY2ODcsIDAsIDBdLFxuICAgICAgICBcIjg2MDNcIjogWy0wLjEzMzEzLCAwLjM2Njg3LCAwLCAwXSxcbiAgICAgICAgXCI4NjA2XCI6IFswLjAxMzU0LCAwLjUyMjM5LCAwLCAwXSxcbiAgICAgICAgXCI4NjA4XCI6IFswLjAxMzU0LCAwLjUyMjM5LCAwLCAwXSxcbiAgICAgICAgXCI4NjEwXCI6IFswLjAxMzU0LCAwLjUyMjM5LCAwLCAwXSxcbiAgICAgICAgXCI4NjExXCI6IFswLjAxMzU0LCAwLjUyMjM5LCAwLCAwXSxcbiAgICAgICAgXCI4NjE5XCI6IFswLCAwLjU0OTg2LCAwLCAwXSxcbiAgICAgICAgXCI4NjIwXCI6IFswLCAwLjU0OTg2LCAwLCAwXSxcbiAgICAgICAgXCI4NjIxXCI6IFstMC4xMzMxMywgMC4zNzc4OCwgMCwgMF0sXG4gICAgICAgIFwiODYyMlwiOiBbLTAuMTMzMTMsIDAuMzY2ODcsIDAsIDBdLFxuICAgICAgICBcIjg2MjRcIjogWzAsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg2MjVcIjogWzAsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg2MzBcIjogWzAsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjg2MzFcIjogWzAsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjg2MzRcIjogWzAuMDgxOTgsIDAuNTgxOTgsIDAsIDBdLFxuICAgICAgICBcIjg2MzVcIjogWzAuMDgxOTgsIDAuNTgxOTgsIDAsIDBdLFxuICAgICAgICBcIjg2MzhcIjogWzAuMTk0NDQsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg2MzlcIjogWzAuMTk0NDQsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg2NDJcIjogWzAuMTk0NDQsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg2NDNcIjogWzAuMTk0NDQsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg2NDRcIjogWzAuMTgwOCwgMC42NzUsIDAsIDBdLFxuICAgICAgICBcIjg2NDZcIjogWzAuMTgwOCwgMC42NzUsIDAsIDBdLFxuICAgICAgICBcIjg2NDdcIjogWzAuMTgwOCwgMC42NzUsIDAsIDBdLFxuICAgICAgICBcIjg2NDhcIjogWzAuMTk0NDQsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg2NDlcIjogWzAuMTgwOCwgMC42NzUsIDAsIDBdLFxuICAgICAgICBcIjg2NTBcIjogWzAuMTk0NDQsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg2NTFcIjogWzAuMDEzNTQsIDAuNTIyMzksIDAsIDBdLFxuICAgICAgICBcIjg2NTJcIjogWzAuMDEzNTQsIDAuNTIyMzksIDAsIDBdLFxuICAgICAgICBcIjg2NTNcIjogWy0wLjEzMzEzLCAwLjM2Njg3LCAwLCAwXSxcbiAgICAgICAgXCI4NjU0XCI6IFstMC4xMzMxMywgMC4zNjY4NywgMCwgMF0sXG4gICAgICAgIFwiODY1NVwiOiBbLTAuMTMzMTMsIDAuMzY2ODcsIDAsIDBdLFxuICAgICAgICBcIjg2NjZcIjogWzAuMTM2NjcsIDAuNjM2NjcsIDAsIDBdLFxuICAgICAgICBcIjg2NjdcIjogWzAuMTM2NjcsIDAuNjM2NjcsIDAsIDBdLFxuICAgICAgICBcIjg2NjlcIjogWy0wLjEzMzEzLCAwLjM3Nzg4LCAwLCAwXSxcbiAgICAgICAgXCI4NjcyXCI6IFstMC4wNjQsIDAuNDM3LCAwLCAwXSxcbiAgICAgICAgXCI4Njc0XCI6IFstMC4wNjQsIDAuNDM3LCAwLCAwXSxcbiAgICAgICAgXCI4NzA1XCI6IFswLCAwLjgyNSwgMCwgMF0sXG4gICAgICAgIFwiODcwOFwiOiBbMCwgMC42ODg4OSwgMCwgMF0sXG4gICAgICAgIFwiODcwOVwiOiBbMC4wODE2NywgMC41ODE2NywgMCwgMF0sXG4gICAgICAgIFwiODcxN1wiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiODcyMlwiOiBbLTAuMDM1OTgsIDAuNDY0MDIsIDAsIDBdLFxuICAgICAgICBcIjg3MjRcIjogWzAuMDgxOTgsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg3MjZcIjogWzAuMDgxNjcsIDAuNTgxNjcsIDAsIDBdLFxuICAgICAgICBcIjg3MzNcIjogWzAsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg3MzZcIjogWzAsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg3MzdcIjogWzAsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg3MzhcIjogWzAuMDM1MTcsIDAuNTIyMzksIDAsIDBdLFxuICAgICAgICBcIjg3MzlcIjogWzAuMDgxNjcsIDAuNTgxNjcsIDAsIDBdLFxuICAgICAgICBcIjg3NDBcIjogWzAuMjUxNDIsIDAuNzQxMTEsIDAsIDBdLFxuICAgICAgICBcIjg3NDFcIjogWzAuMDgxNjcsIDAuNTgxNjcsIDAsIDBdLFxuICAgICAgICBcIjg3NDJcIjogWzAuMjUxNDIsIDAuNzQxMTEsIDAsIDBdLFxuICAgICAgICBcIjg3NTZcIjogWzAsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg3NTdcIjogWzAsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg3NjRcIjogWy0wLjEzMzEzLCAwLjM2Njg3LCAwLCAwXSxcbiAgICAgICAgXCI4NzY1XCI6IFstMC4xMzMxMywgMC4zNzc4OCwgMCwgMF0sXG4gICAgICAgIFwiODc2OVwiOiBbLTAuMTMzMTMsIDAuMzY2ODcsIDAsIDBdLFxuICAgICAgICBcIjg3NzBcIjogWy0wLjAzNjI1LCAwLjQ2Mzc1LCAwLCAwXSxcbiAgICAgICAgXCI4Nzc0XCI6IFswLjMwMjc0LCAwLjc5MzgzLCAwLCAwXSxcbiAgICAgICAgXCI4Nzc2XCI6IFstMC4wMTY4OCwgMC40ODMxMiwgMCwgMF0sXG4gICAgICAgIFwiODc3OFwiOiBbMC4wODE2NywgMC41ODE2NywgMCwgMF0sXG4gICAgICAgIFwiODc4MlwiOiBbMC4wNjA2MiwgMC41NDk4NiwgMCwgMF0sXG4gICAgICAgIFwiODc4M1wiOiBbMC4wNjA2MiwgMC41NDk4NiwgMCwgMF0sXG4gICAgICAgIFwiODc4NVwiOiBbMC4wODE5OCwgMC41ODE5OCwgMCwgMF0sXG4gICAgICAgIFwiODc4NlwiOiBbMC4wODE5OCwgMC41ODE5OCwgMCwgMF0sXG4gICAgICAgIFwiODc4N1wiOiBbMC4wODE5OCwgMC41ODE5OCwgMCwgMF0sXG4gICAgICAgIFwiODc5MFwiOiBbMCwgMC42OTIyNCwgMCwgMF0sXG4gICAgICAgIFwiODc5MVwiOiBbMC4yMjk1OCwgMC43Mjk1OCwgMCwgMF0sXG4gICAgICAgIFwiODc5NlwiOiBbMC4wODE5OCwgMC45MTY2NywgMCwgMF0sXG4gICAgICAgIFwiODgwNlwiOiBbMC4yNTU4MywgMC43NTU4MywgMCwgMF0sXG4gICAgICAgIFwiODgwN1wiOiBbMC4yNTU4MywgMC43NTU4MywgMCwgMF0sXG4gICAgICAgIFwiODgwOFwiOiBbMC4yNTE0MiwgMC43NTcyNiwgMCwgMF0sXG4gICAgICAgIFwiODgwOVwiOiBbMC4yNTE0MiwgMC43NTcyNiwgMCwgMF0sXG4gICAgICAgIFwiODgxMlwiOiBbMC4yNTU4MywgMC43NTU4MywgMCwgMF0sXG4gICAgICAgIFwiODgxNFwiOiBbMC4yMDU3NiwgMC43MDU3NiwgMCwgMF0sXG4gICAgICAgIFwiODgxNVwiOiBbMC4yMDU3NiwgMC43MDU3NiwgMCwgMF0sXG4gICAgICAgIFwiODgxNlwiOiBbMC4zMDI3NCwgMC43OTM4MywgMCwgMF0sXG4gICAgICAgIFwiODgxN1wiOiBbMC4zMDI3NCwgMC43OTM4MywgMCwgMF0sXG4gICAgICAgIFwiODgxOFwiOiBbMC4yMjk1OCwgMC43Mjk1OCwgMCwgMF0sXG4gICAgICAgIFwiODgxOVwiOiBbMC4yMjk1OCwgMC43Mjk1OCwgMCwgMF0sXG4gICAgICAgIFwiODgyMlwiOiBbMC4xODA4LCAwLjY3NSwgMCwgMF0sXG4gICAgICAgIFwiODgyM1wiOiBbMC4xODA4LCAwLjY3NSwgMCwgMF0sXG4gICAgICAgIFwiODgyOFwiOiBbMC4xMzY2NywgMC42MzY2NywgMCwgMF0sXG4gICAgICAgIFwiODgyOVwiOiBbMC4xMzY2NywgMC42MzY2NywgMCwgMF0sXG4gICAgICAgIFwiODgzMFwiOiBbMC4yMjk1OCwgMC43Mjk1OCwgMCwgMF0sXG4gICAgICAgIFwiODgzMVwiOiBbMC4yMjk1OCwgMC43Mjk1OCwgMCwgMF0sXG4gICAgICAgIFwiODgzMlwiOiBbMC4yMDU3NiwgMC43MDU3NiwgMCwgMF0sXG4gICAgICAgIFwiODgzM1wiOiBbMC4yMDU3NiwgMC43MDU3NiwgMCwgMF0sXG4gICAgICAgIFwiODg0MFwiOiBbMC4zMDI3NCwgMC43OTM4MywgMCwgMF0sXG4gICAgICAgIFwiODg0MVwiOiBbMC4zMDI3NCwgMC43OTM4MywgMCwgMF0sXG4gICAgICAgIFwiODg0MlwiOiBbMC4xMzU5NywgMC42MzU5NywgMCwgMF0sXG4gICAgICAgIFwiODg0M1wiOiBbMC4xMzU5NywgMC42MzU5NywgMCwgMF0sXG4gICAgICAgIFwiODg0N1wiOiBbMC4wMzUxNywgMC41NDk4NiwgMCwgMF0sXG4gICAgICAgIFwiODg0OFwiOiBbMC4wMzUxNywgMC41NDk4NiwgMCwgMF0sXG4gICAgICAgIFwiODg1OFwiOiBbMC4wODE5OCwgMC41ODE5OCwgMCwgMF0sXG4gICAgICAgIFwiODg1OVwiOiBbMC4wODE5OCwgMC41ODE5OCwgMCwgMF0sXG4gICAgICAgIFwiODg2MVwiOiBbMC4wODE5OCwgMC41ODE5OCwgMCwgMF0sXG4gICAgICAgIFwiODg2MlwiOiBbMCwgMC42NzUsIDAsIDBdLFxuICAgICAgICBcIjg4NjNcIjogWzAsIDAuNjc1LCAwLCAwXSxcbiAgICAgICAgXCI4ODY0XCI6IFswLCAwLjY3NSwgMCwgMF0sXG4gICAgICAgIFwiODg2NVwiOiBbMCwgMC42NzUsIDAsIDBdLFxuICAgICAgICBcIjg4NzJcIjogWzAsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg4NzNcIjogWzAsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg4NzRcIjogWzAsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg4NzZcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjg4NzdcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjg4NzhcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjg4NzlcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjg4ODJcIjogWzAuMDM1MTcsIDAuNTQ5ODYsIDAsIDBdLFxuICAgICAgICBcIjg4ODNcIjogWzAuMDM1MTcsIDAuNTQ5ODYsIDAsIDBdLFxuICAgICAgICBcIjg4ODRcIjogWzAuMTM2NjcsIDAuNjM2NjcsIDAsIDBdLFxuICAgICAgICBcIjg4ODVcIjogWzAuMTM2NjcsIDAuNjM2NjcsIDAsIDBdLFxuICAgICAgICBcIjg4ODhcIjogWzAsIDAuNTQ5ODYsIDAsIDBdLFxuICAgICAgICBcIjg4OTBcIjogWzAuMTk0NDQsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjg4OTFcIjogWzAuMTk0NDQsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg4OTJcIjogWzAuMTk0NDQsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg5MDFcIjogWzAsIDAuNTQ5ODYsIDAsIDBdLFxuICAgICAgICBcIjg5MDNcIjogWzAuMDgxNjcsIDAuNTgxNjcsIDAsIDBdLFxuICAgICAgICBcIjg5MDVcIjogWzAuMDgxNjcsIDAuNTgxNjcsIDAsIDBdLFxuICAgICAgICBcIjg5MDZcIjogWzAuMDgxNjcsIDAuNTgxNjcsIDAsIDBdLFxuICAgICAgICBcIjg5MDdcIjogWzAsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg5MDhcIjogWzAsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg5MDlcIjogWy0wLjAzNTk4LCAwLjQ2NDAyLCAwLCAwXSxcbiAgICAgICAgXCI4OTEwXCI6IFswLCAwLjU0OTg2LCAwLCAwXSxcbiAgICAgICAgXCI4OTExXCI6IFswLCAwLjU0OTg2LCAwLCAwXSxcbiAgICAgICAgXCI4OTEyXCI6IFswLjAzNTE3LCAwLjU0OTg2LCAwLCAwXSxcbiAgICAgICAgXCI4OTEzXCI6IFswLjAzNTE3LCAwLjU0OTg2LCAwLCAwXSxcbiAgICAgICAgXCI4OTE0XCI6IFswLCAwLjU0OTg2LCAwLCAwXSxcbiAgICAgICAgXCI4OTE1XCI6IFswLCAwLjU0OTg2LCAwLCAwXSxcbiAgICAgICAgXCI4OTE2XCI6IFswLCAwLjY5MjI0LCAwLCAwXSxcbiAgICAgICAgXCI4OTE4XCI6IFswLjAzOTEsIDAuNTM5MSwgMCwgMF0sXG4gICAgICAgIFwiODkxOVwiOiBbMC4wMzkxLCAwLjUzOTEsIDAsIDBdLFxuICAgICAgICBcIjg5MjBcIjogWzAuMDM1MTcsIDAuNTQ5ODYsIDAsIDBdLFxuICAgICAgICBcIjg5MjFcIjogWzAuMDM1MTcsIDAuNTQ5ODYsIDAsIDBdLFxuICAgICAgICBcIjg5MjJcIjogWzAuMzg1NjksIDAuODg1NjksIDAsIDBdLFxuICAgICAgICBcIjg5MjNcIjogWzAuMzg1NjksIDAuODg1NjksIDAsIDBdLFxuICAgICAgICBcIjg5MjZcIjogWzAuMTM2NjcsIDAuNjM2NjcsIDAsIDBdLFxuICAgICAgICBcIjg5MjdcIjogWzAuMTM2NjcsIDAuNjM2NjcsIDAsIDBdLFxuICAgICAgICBcIjg5MjhcIjogWzAuMzAyNzQsIDAuNzkzODMsIDAsIDBdLFxuICAgICAgICBcIjg5MjlcIjogWzAuMzAyNzQsIDAuNzkzODMsIDAsIDBdLFxuICAgICAgICBcIjg5MzRcIjogWzAuMjMyMjIsIDAuNzQxMTEsIDAsIDBdLFxuICAgICAgICBcIjg5MzVcIjogWzAuMjMyMjIsIDAuNzQxMTEsIDAsIDBdLFxuICAgICAgICBcIjg5MzZcIjogWzAuMjMyMjIsIDAuNzQxMTEsIDAsIDBdLFxuICAgICAgICBcIjg5MzdcIjogWzAuMjMyMjIsIDAuNzQxMTEsIDAsIDBdLFxuICAgICAgICBcIjg5MzhcIjogWzAuMjA1NzYsIDAuNzA1NzYsIDAsIDBdLFxuICAgICAgICBcIjg5MzlcIjogWzAuMjA1NzYsIDAuNzA1NzYsIDAsIDBdLFxuICAgICAgICBcIjg5NDBcIjogWzAuMzAyNzQsIDAuNzkzODMsIDAsIDBdLFxuICAgICAgICBcIjg5NDFcIjogWzAuMzAyNzQsIDAuNzkzODMsIDAsIDBdLFxuICAgICAgICBcIjg5OTRcIjogWzAuMTk0NDQsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjg5OTVcIjogWzAuMTk0NDQsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjk0MTZcIjogWzAuMTU1NTksIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjk0ODRcIjogWzAsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjk0ODhcIjogWzAsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjk0OTJcIjogWzAsIDAuMzc3ODgsIDAsIDBdLFxuICAgICAgICBcIjk0OTZcIjogWzAsIDAuMzc3ODgsIDAsIDBdLFxuICAgICAgICBcIjk1ODVcIjogWzAuMTk0NDQsIDAuNjg4ODksIDAsIDBdLFxuICAgICAgICBcIjk1ODZcIjogWzAuMTk0NDQsIDAuNzQxMTEsIDAsIDBdLFxuICAgICAgICBcIjk2MzJcIjogWzAsIDAuNjc1LCAwLCAwXSxcbiAgICAgICAgXCI5NjMzXCI6IFswLCAwLjY3NSwgMCwgMF0sXG4gICAgICAgIFwiOTY1MFwiOiBbMCwgMC41NDk4NiwgMCwgMF0sXG4gICAgICAgIFwiOTY1MVwiOiBbMCwgMC41NDk4NiwgMCwgMF0sXG4gICAgICAgIFwiOTY1NFwiOiBbMC4wMzUxNywgMC41NDk4NiwgMCwgMF0sXG4gICAgICAgIFwiOTY2MFwiOiBbMCwgMC41NDk4NiwgMCwgMF0sXG4gICAgICAgIFwiOTY2MVwiOiBbMCwgMC41NDk4NiwgMCwgMF0sXG4gICAgICAgIFwiOTY2NFwiOiBbMC4wMzUxNywgMC41NDk4NiwgMCwgMF0sXG4gICAgICAgIFwiOTY3NFwiOiBbMC4xMTExMSwgMC42OTIyNCwgMCwgMF0sXG4gICAgICAgIFwiOTczM1wiOiBbMC4xOTQ0NCwgMC42OTIyNCwgMCwgMF0sXG4gICAgICAgIFwiMTAwMDNcIjogWzAsIDAuNjkyMjQsIDAsIDBdLFxuICAgICAgICBcIjEwMDE2XCI6IFswLCAwLjY5MjI0LCAwLCAwXSxcbiAgICAgICAgXCIxMDczMVwiOiBbMC4xMTExMSwgMC42OTIyNCwgMCwgMF0sXG4gICAgICAgIFwiMTA4NDZcIjogWzAuMTk0NDQsIDAuNzU1ODMsIDAsIDBdLFxuICAgICAgICBcIjEwODc3XCI6IFswLjEzNjY3LCAwLjYzNjY3LCAwLCAwXSxcbiAgICAgICAgXCIxMDg3OFwiOiBbMC4xMzY2NywgMC42MzY2NywgMCwgMF0sXG4gICAgICAgIFwiMTA4ODVcIjogWzAuMjU1ODMsIDAuNzU1ODMsIDAsIDBdLFxuICAgICAgICBcIjEwODg2XCI6IFswLjI1NTgzLCAwLjc1NTgzLCAwLCAwXSxcbiAgICAgICAgXCIxMDg4N1wiOiBbMC4xMzU5NywgMC42MzU5NywgMCwgMF0sXG4gICAgICAgIFwiMTA4ODhcIjogWzAuMTM1OTcsIDAuNjM1OTcsIDAsIDBdLFxuICAgICAgICBcIjEwODg5XCI6IFswLjI2MTY3LCAwLjc1NzI2LCAwLCAwXSxcbiAgICAgICAgXCIxMDg5MFwiOiBbMC4yNjE2NywgMC43NTcyNiwgMCwgMF0sXG4gICAgICAgIFwiMTA4OTFcIjogWzAuNDgyNTYsIDAuOTgyNTYsIDAsIDBdLFxuICAgICAgICBcIjEwODkyXCI6IFswLjQ4MjU2LCAwLjk4MjU2LCAwLCAwXSxcbiAgICAgICAgXCIxMDkwMVwiOiBbMC4xMzY2NywgMC42MzY2NywgMCwgMF0sXG4gICAgICAgIFwiMTA5MDJcIjogWzAuMTM2NjcsIDAuNjM2NjcsIDAsIDBdLFxuICAgICAgICBcIjEwOTMzXCI6IFswLjI1MTQyLCAwLjc1NzI2LCAwLCAwXSxcbiAgICAgICAgXCIxMDkzNFwiOiBbMC4yNTE0MiwgMC43NTcyNiwgMCwgMF0sXG4gICAgICAgIFwiMTA5MzVcIjogWzAuMjYxNjcsIDAuNzU3MjYsIDAsIDBdLFxuICAgICAgICBcIjEwOTM2XCI6IFswLjI2MTY3LCAwLjc1NzI2LCAwLCAwXSxcbiAgICAgICAgXCIxMDkzN1wiOiBbMC4yNjE2NywgMC43NTcyNiwgMCwgMF0sXG4gICAgICAgIFwiMTA5MzhcIjogWzAuMjYxNjcsIDAuNzU3MjYsIDAsIDBdLFxuICAgICAgICBcIjEwOTQ5XCI6IFswLjI1NTgzLCAwLjc1NTgzLCAwLCAwXSxcbiAgICAgICAgXCIxMDk1MFwiOiBbMC4yNTU4MywgMC43NTU4MywgMCwgMF0sXG4gICAgICAgIFwiMTA5NTVcIjogWzAuMjg0ODEsIDAuNzkzODMsIDAsIDBdLFxuICAgICAgICBcIjEwOTU2XCI6IFswLjI4NDgxLCAwLjc5MzgzLCAwLCAwXSxcbiAgICAgICAgXCI1NzM1MFwiOiBbMC4wODE2NywgMC41ODE2NywgMCwgMF0sXG4gICAgICAgIFwiNTczNTFcIjogWzAuMDgxNjcsIDAuNTgxNjcsIDAsIDBdLFxuICAgICAgICBcIjU3MzUyXCI6IFswLjA4MTY3LCAwLjU4MTY3LCAwLCAwXSxcbiAgICAgICAgXCI1NzM1M1wiOiBbMCwgMC40MzA1NiwgMC4wNDAyOCwgMF0sXG4gICAgICAgIFwiNTczNTZcIjogWzAuMjUxNDIsIDAuNzU3MjYsIDAsIDBdLFxuICAgICAgICBcIjU3MzU3XCI6IFswLjI1MTQyLCAwLjc1NzI2LCAwLCAwXSxcbiAgICAgICAgXCI1NzM1OFwiOiBbMC40MTk1MSwgMC45MTk1MSwgMCwgMF0sXG4gICAgICAgIFwiNTczNTlcIjogWzAuMzAyNzQsIDAuNzkzODMsIDAsIDBdLFxuICAgICAgICBcIjU3MzYwXCI6IFswLjMwMjc0LCAwLjc5MzgzLCAwLCAwXSxcbiAgICAgICAgXCI1NzM2MVwiOiBbMC40MTk1MSwgMC45MTk1MSwgMCwgMF0sXG4gICAgICAgIFwiNTczNjZcIjogWzAuMjUxNDIsIDAuNzU3MjYsIDAsIDBdLFxuICAgICAgICBcIjU3MzY3XCI6IFswLjI1MTQyLCAwLjc1NzI2LCAwLCAwXSxcbiAgICAgICAgXCI1NzM2OFwiOiBbMC4yNTE0MiwgMC43NTcyNiwgMCwgMF0sXG4gICAgICAgIFwiNTczNjlcIjogWzAuMjUxNDIsIDAuNzU3MjYsIDAsIDBdLFxuICAgICAgICBcIjU3MzcwXCI6IFswLjEzNTk3LCAwLjYzNTk3LCAwLCAwXSxcbiAgICAgICAgXCI1NzM3MVwiOiBbMC4xMzU5NywgMC42MzU5NywgMCwgMF0sXG4gICAgfSxcbiAgICBcIkNhbGlncmFwaGljLVJlZ3VsYXJcIjoge1xuICAgICAgICBcIjQ4XCI6IFswLCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCI0OVwiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiNTBcIjogWzAsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjUxXCI6IFswLjE5NDQ0LCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCI1MlwiOiBbMC4xOTQ0NCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiNTNcIjogWzAuMTk0NDQsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjU0XCI6IFswLCAwLjY0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI1NVwiOiBbMC4xOTQ0NCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiNTZcIjogWzAsIDAuNjQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjU3XCI6IFswLjE5NDQ0LCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCI2NVwiOiBbMCwgMC42ODMzMywgMCwgMC4xOTQ0NV0sXG4gICAgICAgIFwiNjZcIjogWzAsIDAuNjgzMzMsIDAuMDMwNDEsIDAuMTM4ODldLFxuICAgICAgICBcIjY3XCI6IFswLCAwLjY4MzMzLCAwLjA1ODM0LCAwLjEzODg5XSxcbiAgICAgICAgXCI2OFwiOiBbMCwgMC42ODMzMywgMC4wMjc3OCwgMC4wODMzNF0sXG4gICAgICAgIFwiNjlcIjogWzAsIDAuNjgzMzMsIDAuMDg5NDQsIDAuMTExMTFdLFxuICAgICAgICBcIjcwXCI6IFswLCAwLjY4MzMzLCAwLjA5OTMxLCAwLjExMTExXSxcbiAgICAgICAgXCI3MVwiOiBbMC4wOTcyMiwgMC42ODMzMywgMC4wNTkzLCAwLjExMTExXSxcbiAgICAgICAgXCI3MlwiOiBbMCwgMC42ODMzMywgMC4wMDk2NSwgMC4xMTExMV0sXG4gICAgICAgIFwiNzNcIjogWzAsIDAuNjgzMzMsIDAuMDczODIsIDBdLFxuICAgICAgICBcIjc0XCI6IFswLjA5NzIyLCAwLjY4MzMzLCAwLjE4NDcyLCAwLjE2NjY3XSxcbiAgICAgICAgXCI3NVwiOiBbMCwgMC42ODMzMywgMC4wMTQ0NSwgMC4wNTU1Nl0sXG4gICAgICAgIFwiNzZcIjogWzAsIDAuNjgzMzMsIDAsIDAuMTM4ODldLFxuICAgICAgICBcIjc3XCI6IFswLCAwLjY4MzMzLCAwLCAwLjEzODg5XSxcbiAgICAgICAgXCI3OFwiOiBbMCwgMC42ODMzMywgMC4xNDczNiwgMC4wODMzNF0sXG4gICAgICAgIFwiNzlcIjogWzAsIDAuNjgzMzMsIDAuMDI3NzgsIDAuMTExMTFdLFxuICAgICAgICBcIjgwXCI6IFswLCAwLjY4MzMzLCAwLjA4MjIyLCAwLjA4MzM0XSxcbiAgICAgICAgXCI4MVwiOiBbMC4wOTcyMiwgMC42ODMzMywgMCwgMC4xMTExMV0sXG4gICAgICAgIFwiODJcIjogWzAsIDAuNjgzMzMsIDAsIDAuMDgzMzRdLFxuICAgICAgICBcIjgzXCI6IFswLCAwLjY4MzMzLCAwLjA3NSwgMC4xMzg4OV0sXG4gICAgICAgIFwiODRcIjogWzAsIDAuNjgzMzMsIDAuMjU0MTcsIDBdLFxuICAgICAgICBcIjg1XCI6IFswLCAwLjY4MzMzLCAwLjA5OTMxLCAwLjA4MzM0XSxcbiAgICAgICAgXCI4NlwiOiBbMCwgMC42ODMzMywgMC4wODIyMiwgMF0sXG4gICAgICAgIFwiODdcIjogWzAsIDAuNjgzMzMsIDAuMDgyMjIsIDAuMDgzMzRdLFxuICAgICAgICBcIjg4XCI6IFswLCAwLjY4MzMzLCAwLjE0NjQzLCAwLjEzODg5XSxcbiAgICAgICAgXCI4OVwiOiBbMC4wOTcyMiwgMC42ODMzMywgMC4wODIyMiwgMC4wODMzNF0sXG4gICAgICAgIFwiOTBcIjogWzAsIDAuNjgzMzMsIDAuMDc5NDQsIDAuMTM4ODldLFxuICAgIH0sXG4gICAgXCJGcmFrdHVyLVJlZ3VsYXJcIjoge1xuICAgICAgICBcIjMzXCI6IFswLCAwLjY5MTQxLCAwLCAwXSxcbiAgICAgICAgXCIzNFwiOiBbMCwgMC42OTE0MSwgMCwgMF0sXG4gICAgICAgIFwiMzhcIjogWzAsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjM5XCI6IFswLCAwLjY5MTQxLCAwLCAwXSxcbiAgICAgICAgXCI0MFwiOiBbMC4yNDk4MiwgMC43NDk0NywgMCwgMF0sXG4gICAgICAgIFwiNDFcIjogWzAuMjQ5ODIsIDAuNzQ5NDcsIDAsIDBdLFxuICAgICAgICBcIjQyXCI6IFswLCAwLjYyMTE5LCAwLCAwXSxcbiAgICAgICAgXCI0M1wiOiBbMC4wODMxOSwgMC41ODI4MywgMCwgMF0sXG4gICAgICAgIFwiNDRcIjogWzAsIDAuMTA4MDMsIDAsIDBdLFxuICAgICAgICBcIjQ1XCI6IFswLjA4MzE5LCAwLjU4MjgzLCAwLCAwXSxcbiAgICAgICAgXCI0NlwiOiBbMCwgMC4xMDgwMywgMCwgMF0sXG4gICAgICAgIFwiNDdcIjogWzAuMjQ5ODIsIDAuNzQ5NDcsIDAsIDBdLFxuICAgICAgICBcIjQ4XCI6IFswLCAwLjQ3NTM0LCAwLCAwXSxcbiAgICAgICAgXCI0OVwiOiBbMCwgMC40NzUzNCwgMCwgMF0sXG4gICAgICAgIFwiNTBcIjogWzAsIDAuNDc1MzQsIDAsIDBdLFxuICAgICAgICBcIjUxXCI6IFswLjE4OTA2LCAwLjQ3NTM0LCAwLCAwXSxcbiAgICAgICAgXCI1MlwiOiBbMC4xODkwNiwgMC40NzUzNCwgMCwgMF0sXG4gICAgICAgIFwiNTNcIjogWzAuMTg5MDYsIDAuNDc1MzQsIDAsIDBdLFxuICAgICAgICBcIjU0XCI6IFswLCAwLjY5MTQxLCAwLCAwXSxcbiAgICAgICAgXCI1NVwiOiBbMC4xODkwNiwgMC40NzUzNCwgMCwgMF0sXG4gICAgICAgIFwiNTZcIjogWzAsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjU3XCI6IFswLjE4OTA2LCAwLjQ3NTM0LCAwLCAwXSxcbiAgICAgICAgXCI1OFwiOiBbMCwgMC40NzUzNCwgMCwgMF0sXG4gICAgICAgIFwiNTlcIjogWzAuMTI2MDQsIDAuNDc1MzQsIDAsIDBdLFxuICAgICAgICBcIjYxXCI6IFstMC4xMzA5OSwgMC4zNjg2NiwgMCwgMF0sXG4gICAgICAgIFwiNjNcIjogWzAsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjY1XCI6IFswLCAwLjY5MTQxLCAwLCAwXSxcbiAgICAgICAgXCI2NlwiOiBbMCwgMC42OTE0MSwgMCwgMF0sXG4gICAgICAgIFwiNjdcIjogWzAsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjY4XCI6IFswLCAwLjY5MTQxLCAwLCAwXSxcbiAgICAgICAgXCI2OVwiOiBbMCwgMC42OTE0MSwgMCwgMF0sXG4gICAgICAgIFwiNzBcIjogWzAuMTI2MDQsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjcxXCI6IFswLCAwLjY5MTQxLCAwLCAwXSxcbiAgICAgICAgXCI3MlwiOiBbMC4wNjMwMiwgMC42OTE0MSwgMCwgMF0sXG4gICAgICAgIFwiNzNcIjogWzAsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjc0XCI6IFswLjEyNjA0LCAwLjY5MTQxLCAwLCAwXSxcbiAgICAgICAgXCI3NVwiOiBbMCwgMC42OTE0MSwgMCwgMF0sXG4gICAgICAgIFwiNzZcIjogWzAsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjc3XCI6IFswLCAwLjY5MTQxLCAwLCAwXSxcbiAgICAgICAgXCI3OFwiOiBbMCwgMC42OTE0MSwgMCwgMF0sXG4gICAgICAgIFwiNzlcIjogWzAsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjgwXCI6IFswLjE4OTA2LCAwLjY5MTQxLCAwLCAwXSxcbiAgICAgICAgXCI4MVwiOiBbMC4wMzc4MSwgMC42OTE0MSwgMCwgMF0sXG4gICAgICAgIFwiODJcIjogWzAsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjgzXCI6IFswLCAwLjY5MTQxLCAwLCAwXSxcbiAgICAgICAgXCI4NFwiOiBbMCwgMC42OTE0MSwgMCwgMF0sXG4gICAgICAgIFwiODVcIjogWzAsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjg2XCI6IFswLCAwLjY5MTQxLCAwLCAwXSxcbiAgICAgICAgXCI4N1wiOiBbMCwgMC42OTE0MSwgMCwgMF0sXG4gICAgICAgIFwiODhcIjogWzAsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjg5XCI6IFswLjE4OTA2LCAwLjY5MTQxLCAwLCAwXSxcbiAgICAgICAgXCI5MFwiOiBbMC4xMjYwNCwgMC42OTE0MSwgMCwgMF0sXG4gICAgICAgIFwiOTFcIjogWzAuMjQ5ODIsIDAuNzQ5NDcsIDAsIDBdLFxuICAgICAgICBcIjkzXCI6IFswLjI0OTgyLCAwLjc0OTQ3LCAwLCAwXSxcbiAgICAgICAgXCI5NFwiOiBbMCwgMC42OTE0MSwgMCwgMF0sXG4gICAgICAgIFwiOTdcIjogWzAsIDAuNDc1MzQsIDAsIDBdLFxuICAgICAgICBcIjk4XCI6IFswLCAwLjY5MTQxLCAwLCAwXSxcbiAgICAgICAgXCI5OVwiOiBbMCwgMC40NzUzNCwgMCwgMF0sXG4gICAgICAgIFwiMTAwXCI6IFswLCAwLjYyMTE5LCAwLCAwXSxcbiAgICAgICAgXCIxMDFcIjogWzAsIDAuNDc1MzQsIDAsIDBdLFxuICAgICAgICBcIjEwMlwiOiBbMC4xODkwNiwgMC42OTE0MSwgMCwgMF0sXG4gICAgICAgIFwiMTAzXCI6IFswLjE4OTA2LCAwLjQ3NTM0LCAwLCAwXSxcbiAgICAgICAgXCIxMDRcIjogWzAuMTg5MDYsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjEwNVwiOiBbMCwgMC42OTE0MSwgMCwgMF0sXG4gICAgICAgIFwiMTA2XCI6IFswLCAwLjY5MTQxLCAwLCAwXSxcbiAgICAgICAgXCIxMDdcIjogWzAsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjEwOFwiOiBbMCwgMC42OTE0MSwgMCwgMF0sXG4gICAgICAgIFwiMTA5XCI6IFswLCAwLjQ3NTM0LCAwLCAwXSxcbiAgICAgICAgXCIxMTBcIjogWzAsIDAuNDc1MzQsIDAsIDBdLFxuICAgICAgICBcIjExMVwiOiBbMCwgMC40NzUzNCwgMCwgMF0sXG4gICAgICAgIFwiMTEyXCI6IFswLjE4OTA2LCAwLjUyMzk2LCAwLCAwXSxcbiAgICAgICAgXCIxMTNcIjogWzAuMTg5MDYsIDAuNDc1MzQsIDAsIDBdLFxuICAgICAgICBcIjExNFwiOiBbMCwgMC40NzUzNCwgMCwgMF0sXG4gICAgICAgIFwiMTE1XCI6IFswLCAwLjQ3NTM0LCAwLCAwXSxcbiAgICAgICAgXCIxMTZcIjogWzAsIDAuNjIxMTksIDAsIDBdLFxuICAgICAgICBcIjExN1wiOiBbMCwgMC40NzUzNCwgMCwgMF0sXG4gICAgICAgIFwiMTE4XCI6IFswLCAwLjUyMzk2LCAwLCAwXSxcbiAgICAgICAgXCIxMTlcIjogWzAsIDAuNTIzOTYsIDAsIDBdLFxuICAgICAgICBcIjEyMFwiOiBbMC4xODkwNiwgMC40NzUzNCwgMCwgMF0sXG4gICAgICAgIFwiMTIxXCI6IFswLjE4OTA2LCAwLjQ3NTM0LCAwLCAwXSxcbiAgICAgICAgXCIxMjJcIjogWzAuMTg5MDYsIDAuNDc1MzQsIDAsIDBdLFxuICAgICAgICBcIjgyMTZcIjogWzAsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjgyMTdcIjogWzAsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjU4MTEyXCI6IFswLCAwLjYyMTE5LCAwLCAwXSxcbiAgICAgICAgXCI1ODExM1wiOiBbMCwgMC42MjExOSwgMCwgMF0sXG4gICAgICAgIFwiNTgxMTRcIjogWzAuMTg5MDYsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjU4MTE1XCI6IFswLjE4OTA2LCAwLjY5MTQxLCAwLCAwXSxcbiAgICAgICAgXCI1ODExNlwiOiBbMC4xODkwNiwgMC40NzUzNCwgMCwgMF0sXG4gICAgICAgIFwiNTgxMTdcIjogWzAsIDAuNjkxNDEsIDAsIDBdLFxuICAgICAgICBcIjU4MTE4XCI6IFswLCAwLjYyMTE5LCAwLCAwXSxcbiAgICAgICAgXCI1ODExOVwiOiBbMCwgMC40NzUzNCwgMCwgMF0sXG4gICAgfSxcbiAgICBcIk1haW4tQm9sZFwiOiB7XG4gICAgICAgIFwiMzNcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjM0XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIzNVwiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMzZcIjogWzAuMDU1NTYsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjM3XCI6IFswLjA1NTU2LCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCIzOFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMzlcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjQwXCI6IFswLjI1LCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI0MVwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiNDJcIjogWzAsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjQzXCI6IFswLjEzMzMzLCAwLjYzMzMzLCAwLCAwXSxcbiAgICAgICAgXCI0NFwiOiBbMC4xOTQ0NCwgMC4xNTU1NiwgMCwgMF0sXG4gICAgICAgIFwiNDVcIjogWzAsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjQ2XCI6IFswLCAwLjE1NTU2LCAwLCAwXSxcbiAgICAgICAgXCI0N1wiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiNDhcIjogWzAsIDAuNjQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjQ5XCI6IFswLCAwLjY0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI1MFwiOiBbMCwgMC42NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNTFcIjogWzAsIDAuNjQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjUyXCI6IFswLCAwLjY0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI1M1wiOiBbMCwgMC42NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNTRcIjogWzAsIDAuNjQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjU1XCI6IFswLCAwLjY0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI1NlwiOiBbMCwgMC42NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNTdcIjogWzAsIDAuNjQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjU4XCI6IFswLCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI1OVwiOiBbMC4xOTQ0NCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNjBcIjogWzAuMDg1NTYsIDAuNTg1NTYsIDAsIDBdLFxuICAgICAgICBcIjYxXCI6IFstMC4xMDg4OSwgMC4zOTExMSwgMCwgMF0sXG4gICAgICAgIFwiNjJcIjogWzAuMDg1NTYsIDAuNTg1NTYsIDAsIDBdLFxuICAgICAgICBcIjYzXCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI2NFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNjVcIjogWzAsIDAuNjg2MTEsIDAsIDBdLFxuICAgICAgICBcIjY2XCI6IFswLCAwLjY4NjExLCAwLCAwXSxcbiAgICAgICAgXCI2N1wiOiBbMCwgMC42ODYxMSwgMCwgMF0sXG4gICAgICAgIFwiNjhcIjogWzAsIDAuNjg2MTEsIDAsIDBdLFxuICAgICAgICBcIjY5XCI6IFswLCAwLjY4NjExLCAwLCAwXSxcbiAgICAgICAgXCI3MFwiOiBbMCwgMC42ODYxMSwgMCwgMF0sXG4gICAgICAgIFwiNzFcIjogWzAsIDAuNjg2MTEsIDAsIDBdLFxuICAgICAgICBcIjcyXCI6IFswLCAwLjY4NjExLCAwLCAwXSxcbiAgICAgICAgXCI3M1wiOiBbMCwgMC42ODYxMSwgMCwgMF0sXG4gICAgICAgIFwiNzRcIjogWzAsIDAuNjg2MTEsIDAsIDBdLFxuICAgICAgICBcIjc1XCI6IFswLCAwLjY4NjExLCAwLCAwXSxcbiAgICAgICAgXCI3NlwiOiBbMCwgMC42ODYxMSwgMCwgMF0sXG4gICAgICAgIFwiNzdcIjogWzAsIDAuNjg2MTEsIDAsIDBdLFxuICAgICAgICBcIjc4XCI6IFswLCAwLjY4NjExLCAwLCAwXSxcbiAgICAgICAgXCI3OVwiOiBbMCwgMC42ODYxMSwgMCwgMF0sXG4gICAgICAgIFwiODBcIjogWzAsIDAuNjg2MTEsIDAsIDBdLFxuICAgICAgICBcIjgxXCI6IFswLjE5NDQ0LCAwLjY4NjExLCAwLCAwXSxcbiAgICAgICAgXCI4MlwiOiBbMCwgMC42ODYxMSwgMCwgMF0sXG4gICAgICAgIFwiODNcIjogWzAsIDAuNjg2MTEsIDAsIDBdLFxuICAgICAgICBcIjg0XCI6IFswLCAwLjY4NjExLCAwLCAwXSxcbiAgICAgICAgXCI4NVwiOiBbMCwgMC42ODYxMSwgMCwgMF0sXG4gICAgICAgIFwiODZcIjogWzAsIDAuNjg2MTEsIDAuMDE1OTcsIDBdLFxuICAgICAgICBcIjg3XCI6IFswLCAwLjY4NjExLCAwLjAxNTk3LCAwXSxcbiAgICAgICAgXCI4OFwiOiBbMCwgMC42ODYxMSwgMCwgMF0sXG4gICAgICAgIFwiODlcIjogWzAsIDAuNjg2MTEsIDAuMDI4NzUsIDBdLFxuICAgICAgICBcIjkwXCI6IFswLCAwLjY4NjExLCAwLCAwXSxcbiAgICAgICAgXCI5MVwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiOTJcIjogWzAuMjUsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjkzXCI6IFswLjI1LCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI5NFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiOTVcIjogWzAuMzEsIDAuMTM0NDQsIDAuMDMxOTQsIDBdLFxuICAgICAgICBcIjk2XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5N1wiOiBbMCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiOThcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjk5XCI6IFswLCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMDBcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjEwMVwiOiBbMCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTAyXCI6IFswLCAwLjY5NDQ0LCAwLjEwOTAzLCAwXSxcbiAgICAgICAgXCIxMDNcIjogWzAuMTk0NDQsIDAuNDQ0NDQsIDAuMDE1OTcsIDBdLFxuICAgICAgICBcIjEwNFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTA1XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMDZcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjEwN1wiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTA4XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMDlcIjogWzAsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjExMFwiOiBbMCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTExXCI6IFswLCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMTJcIjogWzAuMTk0NDQsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjExM1wiOiBbMC4xOTQ0NCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTE0XCI6IFswLCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMTVcIjogWzAsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjExNlwiOiBbMCwgMC42MzQ5MiwgMCwgMF0sXG4gICAgICAgIFwiMTE3XCI6IFswLCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMThcIjogWzAsIDAuNDQ0NDQsIDAuMDE1OTcsIDBdLFxuICAgICAgICBcIjExOVwiOiBbMCwgMC40NDQ0NCwgMC4wMTU5NywgMF0sXG4gICAgICAgIFwiMTIwXCI6IFswLCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMjFcIjogWzAuMTk0NDQsIDAuNDQ0NDQsIDAuMDE1OTcsIDBdLFxuICAgICAgICBcIjEyMlwiOiBbMCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTIzXCI6IFswLjI1LCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCIxMjRcIjogWzAuMjUsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjEyNVwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiMTI2XCI6IFswLjM1LCAwLjM0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxNjhcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjE3MlwiOiBbMCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTc1XCI6IFswLCAwLjU5NjExLCAwLCAwXSxcbiAgICAgICAgXCIxNzZcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjE3N1wiOiBbMC4xMzMzMywgMC42MzMzMywgMCwgMF0sXG4gICAgICAgIFwiMTgwXCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIyMTVcIjogWzAuMTMzMzMsIDAuNjMzMzMsIDAsIDBdLFxuICAgICAgICBcIjI0N1wiOiBbMC4xMzMzMywgMC42MzMzMywgMCwgMF0sXG4gICAgICAgIFwiMzA1XCI6IFswLCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI1NjdcIjogWzAuMTk0NDQsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjcxMFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzExXCI6IFswLCAwLjYzMTk0LCAwLCAwXSxcbiAgICAgICAgXCI3MTNcIjogWzAsIDAuNTk2MTEsIDAsIDBdLFxuICAgICAgICBcIjcxNFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzE1XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI3MjhcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjcyOVwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzMwXCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI3MzJcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjc2OFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzY5XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI3NzBcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjc3MVwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzcyXCI6IFswLCAwLjU5NjExLCAwLCAwXSxcbiAgICAgICAgXCI3NzRcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjc3NVwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzc2XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI3NzhcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjc3OVwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzgwXCI6IFswLCAwLjYzMTk0LCAwLCAwXSxcbiAgICAgICAgXCI4MjRcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjkxNVwiOiBbMCwgMC42ODYxMSwgMCwgMF0sXG4gICAgICAgIFwiOTE2XCI6IFswLCAwLjY4NjExLCAwLCAwXSxcbiAgICAgICAgXCI5MjBcIjogWzAsIDAuNjg2MTEsIDAsIDBdLFxuICAgICAgICBcIjkyM1wiOiBbMCwgMC42ODYxMSwgMCwgMF0sXG4gICAgICAgIFwiOTI2XCI6IFswLCAwLjY4NjExLCAwLCAwXSxcbiAgICAgICAgXCI5MjhcIjogWzAsIDAuNjg2MTEsIDAsIDBdLFxuICAgICAgICBcIjkzMVwiOiBbMCwgMC42ODYxMSwgMCwgMF0sXG4gICAgICAgIFwiOTMzXCI6IFswLCAwLjY4NjExLCAwLCAwXSxcbiAgICAgICAgXCI5MzRcIjogWzAsIDAuNjg2MTEsIDAsIDBdLFxuICAgICAgICBcIjkzNlwiOiBbMCwgMC42ODYxMSwgMCwgMF0sXG4gICAgICAgIFwiOTM3XCI6IFswLCAwLjY4NjExLCAwLCAwXSxcbiAgICAgICAgXCI4MjExXCI6IFswLCAwLjQ0NDQ0LCAwLjAzMTk0LCAwXSxcbiAgICAgICAgXCI4MjEyXCI6IFswLCAwLjQ0NDQ0LCAwLjAzMTk0LCAwXSxcbiAgICAgICAgXCI4MjE2XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4MjE3XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4MjIwXCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4MjIxXCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4MjI0XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4MjI1XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4MjQyXCI6IFswLCAwLjU1NTU2LCAwLCAwXSxcbiAgICAgICAgXCI4NDA3XCI6IFswLCAwLjcyNDQ0LCAwLjE1NDg2LCAwXSxcbiAgICAgICAgXCI4NDYzXCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4NDY1XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4NDY3XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4NDcyXCI6IFswLjE5NDQ0LCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4NDc2XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4NTAxXCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4NTkyXCI6IFstMC4xMDg4OSwgMC4zOTExMSwgMCwgMF0sXG4gICAgICAgIFwiODU5M1wiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODU5NFwiOiBbLTAuMTA4ODksIDAuMzkxMTEsIDAsIDBdLFxuICAgICAgICBcIjg1OTVcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjg1OTZcIjogWy0wLjEwODg5LCAwLjM5MTExLCAwLCAwXSxcbiAgICAgICAgXCI4NTk3XCI6IFswLjI1LCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI4NTk4XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4NTk5XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4NjAwXCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4NjAxXCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4NjM2XCI6IFstMC4xMDg4OSwgMC4zOTExMSwgMCwgMF0sXG4gICAgICAgIFwiODYzN1wiOiBbLTAuMTA4ODksIDAuMzkxMTEsIDAsIDBdLFxuICAgICAgICBcIjg2NDBcIjogWy0wLjEwODg5LCAwLjM5MTExLCAwLCAwXSxcbiAgICAgICAgXCI4NjQxXCI6IFstMC4xMDg4OSwgMC4zOTExMSwgMCwgMF0sXG4gICAgICAgIFwiODY1NlwiOiBbLTAuMTA4ODksIDAuMzkxMTEsIDAsIDBdLFxuICAgICAgICBcIjg2NTdcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjg2NThcIjogWy0wLjEwODg5LCAwLjM5MTExLCAwLCAwXSxcbiAgICAgICAgXCI4NjU5XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4NjYwXCI6IFstMC4xMDg4OSwgMC4zOTExMSwgMCwgMF0sXG4gICAgICAgIFwiODY2MVwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODcwNFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODcwNlwiOiBbMCwgMC42OTQ0NCwgMC4wNjM4OSwgMF0sXG4gICAgICAgIFwiODcwN1wiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODcwOVwiOiBbMC4wNTU1NiwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODcxMVwiOiBbMCwgMC42ODYxMSwgMCwgMF0sXG4gICAgICAgIFwiODcxMlwiOiBbMC4wODU1NiwgMC41ODU1NiwgMCwgMF0sXG4gICAgICAgIFwiODcxNVwiOiBbMC4wODU1NiwgMC41ODU1NiwgMCwgMF0sXG4gICAgICAgIFwiODcyMlwiOiBbMC4xMzMzMywgMC42MzMzMywgMCwgMF0sXG4gICAgICAgIFwiODcyM1wiOiBbMC4xMzMzMywgMC42MzMzMywgMCwgMF0sXG4gICAgICAgIFwiODcyNVwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODcyNlwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODcyN1wiOiBbLTAuMDI3NzgsIDAuNDcyMjIsIDAsIDBdLFxuICAgICAgICBcIjg3MjhcIjogWy0wLjAyNjM5LCAwLjQ3MzYxLCAwLCAwXSxcbiAgICAgICAgXCI4NzI5XCI6IFstMC4wMjYzOSwgMC40NzM2MSwgMCwgMF0sXG4gICAgICAgIFwiODczMFwiOiBbMC4xOCwgMC44MiwgMCwgMF0sXG4gICAgICAgIFwiODczM1wiOiBbMCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODczNFwiOiBbMCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODczNlwiOiBbMCwgMC42OTIyNCwgMCwgMF0sXG4gICAgICAgIFwiODczOVwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODc0MVwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODc0M1wiOiBbMCwgMC41NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiODc0NFwiOiBbMCwgMC41NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiODc0NVwiOiBbMCwgMC41NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiODc0NlwiOiBbMCwgMC41NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiODc0N1wiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMC4xMjc3OCwgMF0sXG4gICAgICAgIFwiODc2NFwiOiBbLTAuMTA4ODksIDAuMzkxMTEsIDAsIDBdLFxuICAgICAgICBcIjg3NjhcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjg3NzFcIjogWzAuMDAyMjIsIDAuNTAyMjIsIDAsIDBdLFxuICAgICAgICBcIjg3NzZcIjogWzAuMDI0NDQsIDAuNTI0NDQsIDAsIDBdLFxuICAgICAgICBcIjg3ODFcIjogWzAuMDAyMjIsIDAuNTAyMjIsIDAsIDBdLFxuICAgICAgICBcIjg4MDFcIjogWzAuMDAyMjIsIDAuNTAyMjIsIDAsIDBdLFxuICAgICAgICBcIjg4MDRcIjogWzAuMTk2NjcsIDAuNjk2NjcsIDAsIDBdLFxuICAgICAgICBcIjg4MDVcIjogWzAuMTk2NjcsIDAuNjk2NjcsIDAsIDBdLFxuICAgICAgICBcIjg4MTBcIjogWzAuMDg1NTYsIDAuNTg1NTYsIDAsIDBdLFxuICAgICAgICBcIjg4MTFcIjogWzAuMDg1NTYsIDAuNTg1NTYsIDAsIDBdLFxuICAgICAgICBcIjg4MjZcIjogWzAuMDg1NTYsIDAuNTg1NTYsIDAsIDBdLFxuICAgICAgICBcIjg4MjdcIjogWzAuMDg1NTYsIDAuNTg1NTYsIDAsIDBdLFxuICAgICAgICBcIjg4MzRcIjogWzAuMDg1NTYsIDAuNTg1NTYsIDAsIDBdLFxuICAgICAgICBcIjg4MzVcIjogWzAuMDg1NTYsIDAuNTg1NTYsIDAsIDBdLFxuICAgICAgICBcIjg4MzhcIjogWzAuMTk2NjcsIDAuNjk2NjcsIDAsIDBdLFxuICAgICAgICBcIjg4MzlcIjogWzAuMTk2NjcsIDAuNjk2NjcsIDAsIDBdLFxuICAgICAgICBcIjg4NDZcIjogWzAsIDAuNTU1NTYsIDAsIDBdLFxuICAgICAgICBcIjg4NDlcIjogWzAuMTk2NjcsIDAuNjk2NjcsIDAsIDBdLFxuICAgICAgICBcIjg4NTBcIjogWzAuMTk2NjcsIDAuNjk2NjcsIDAsIDBdLFxuICAgICAgICBcIjg4NTFcIjogWzAsIDAuNTU1NTYsIDAsIDBdLFxuICAgICAgICBcIjg4NTJcIjogWzAsIDAuNTU1NTYsIDAsIDBdLFxuICAgICAgICBcIjg4NTNcIjogWzAuMTMzMzMsIDAuNjMzMzMsIDAsIDBdLFxuICAgICAgICBcIjg4NTRcIjogWzAuMTMzMzMsIDAuNjMzMzMsIDAsIDBdLFxuICAgICAgICBcIjg4NTVcIjogWzAuMTMzMzMsIDAuNjMzMzMsIDAsIDBdLFxuICAgICAgICBcIjg4NTZcIjogWzAuMTMzMzMsIDAuNjMzMzMsIDAsIDBdLFxuICAgICAgICBcIjg4NTdcIjogWzAuMTMzMzMsIDAuNjMzMzMsIDAsIDBdLFxuICAgICAgICBcIjg4NjZcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjg4NjdcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjg4NjhcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjg4NjlcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjg5MDBcIjogWy0wLjAyNjM5LCAwLjQ3MzYxLCAwLCAwXSxcbiAgICAgICAgXCI4OTAxXCI6IFstMC4wMjYzOSwgMC40NzM2MSwgMCwgMF0sXG4gICAgICAgIFwiODkwMlwiOiBbLTAuMDI3NzgsIDAuNDcyMjIsIDAsIDBdLFxuICAgICAgICBcIjg5NjhcIjogWzAuMjUsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjg5NjlcIjogWzAuMjUsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjg5NzBcIjogWzAuMjUsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjg5NzFcIjogWzAuMjUsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjg5OTRcIjogWy0wLjEzODg5LCAwLjM2MTExLCAwLCAwXSxcbiAgICAgICAgXCI4OTk1XCI6IFstMC4xMzg4OSwgMC4zNjExMSwgMCwgMF0sXG4gICAgICAgIFwiOTY1MVwiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiOTY1N1wiOiBbLTAuMDI3NzgsIDAuNDcyMjIsIDAsIDBdLFxuICAgICAgICBcIjk2NjFcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjk2NjdcIjogWy0wLjAyNzc4LCAwLjQ3MjIyLCAwLCAwXSxcbiAgICAgICAgXCI5NzExXCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5ODI0XCI6IFswLjEyOTYzLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5ODI1XCI6IFswLjEyOTYzLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5ODI2XCI6IFswLjEyOTYzLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5ODI3XCI6IFswLjEyOTYzLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5ODM3XCI6IFswLCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI5ODM4XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5ODM5XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMDIxNlwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiMTAyMTdcIjogWzAuMjUsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjEwODE1XCI6IFswLCAwLjY4NjExLCAwLCAwXSxcbiAgICAgICAgXCIxMDkyN1wiOiBbMC4xOTY2NywgMC42OTY2NywgMCwgMF0sXG4gICAgICAgIFwiMTA5MjhcIjogWzAuMTk2NjcsIDAuNjk2NjcsIDAsIDBdLFxuICAgIH0sXG4gICAgXCJNYWluLUl0YWxpY1wiOiB7XG4gICAgICAgIFwiMzNcIjogWzAsIDAuNjk0NDQsIDAuMTI0MTcsIDBdLFxuICAgICAgICBcIjM0XCI6IFswLCAwLjY5NDQ0LCAwLjA2OTYxLCAwXSxcbiAgICAgICAgXCIzNVwiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMC4wNjYxNiwgMF0sXG4gICAgICAgIFwiMzdcIjogWzAuMDU1NTYsIDAuNzUsIDAuMTM2MzksIDBdLFxuICAgICAgICBcIjM4XCI6IFswLCAwLjY5NDQ0LCAwLjA5Njk0LCAwXSxcbiAgICAgICAgXCIzOVwiOiBbMCwgMC42OTQ0NCwgMC4xMjQxNywgMF0sXG4gICAgICAgIFwiNDBcIjogWzAuMjUsIDAuNzUsIDAuMTYxOTQsIDBdLFxuICAgICAgICBcIjQxXCI6IFswLjI1LCAwLjc1LCAwLjAzNjk0LCAwXSxcbiAgICAgICAgXCI0MlwiOiBbMCwgMC43NSwgMC4xNDkxNywgMF0sXG4gICAgICAgIFwiNDNcIjogWzAuMDU2NjcsIDAuNTYxNjcsIDAuMDM2OTQsIDBdLFxuICAgICAgICBcIjQ0XCI6IFswLjE5NDQ0LCAwLjEwNTU2LCAwLCAwXSxcbiAgICAgICAgXCI0NVwiOiBbMCwgMC40MzA1NiwgMC4wMjgyNiwgMF0sXG4gICAgICAgIFwiNDZcIjogWzAsIDAuMTA1NTYsIDAsIDBdLFxuICAgICAgICBcIjQ3XCI6IFswLjI1LCAwLjc1LCAwLjE2MTk0LCAwXSxcbiAgICAgICAgXCI0OFwiOiBbMCwgMC42NDQ0NCwgMC4xMzU1NiwgMF0sXG4gICAgICAgIFwiNDlcIjogWzAsIDAuNjQ0NDQsIDAuMTM1NTYsIDBdLFxuICAgICAgICBcIjUwXCI6IFswLCAwLjY0NDQ0LCAwLjEzNTU2LCAwXSxcbiAgICAgICAgXCI1MVwiOiBbMCwgMC42NDQ0NCwgMC4xMzU1NiwgMF0sXG4gICAgICAgIFwiNTJcIjogWzAuMTk0NDQsIDAuNjQ0NDQsIDAuMTM1NTYsIDBdLFxuICAgICAgICBcIjUzXCI6IFswLCAwLjY0NDQ0LCAwLjEzNTU2LCAwXSxcbiAgICAgICAgXCI1NFwiOiBbMCwgMC42NDQ0NCwgMC4xMzU1NiwgMF0sXG4gICAgICAgIFwiNTVcIjogWzAuMTk0NDQsIDAuNjQ0NDQsIDAuMTM1NTYsIDBdLFxuICAgICAgICBcIjU2XCI6IFswLCAwLjY0NDQ0LCAwLjEzNTU2LCAwXSxcbiAgICAgICAgXCI1N1wiOiBbMCwgMC42NDQ0NCwgMC4xMzU1NiwgMF0sXG4gICAgICAgIFwiNThcIjogWzAsIDAuNDMwNTYsIDAuMDU4MiwgMF0sXG4gICAgICAgIFwiNTlcIjogWzAuMTk0NDQsIDAuNDMwNTYsIDAuMDU4MiwgMF0sXG4gICAgICAgIFwiNjFcIjogWy0wLjEzMzEzLCAwLjM2Njg3LCAwLjA2NjE2LCAwXSxcbiAgICAgICAgXCI2M1wiOiBbMCwgMC42OTQ0NCwgMC4xMjI1LCAwXSxcbiAgICAgICAgXCI2NFwiOiBbMCwgMC42OTQ0NCwgMC4wOTU5NywgMF0sXG4gICAgICAgIFwiNjVcIjogWzAsIDAuNjgzMzMsIDAsIDBdLFxuICAgICAgICBcIjY2XCI6IFswLCAwLjY4MzMzLCAwLjEwMjU3LCAwXSxcbiAgICAgICAgXCI2N1wiOiBbMCwgMC42ODMzMywgMC4xNDUyOCwgMF0sXG4gICAgICAgIFwiNjhcIjogWzAsIDAuNjgzMzMsIDAuMDk0MDMsIDBdLFxuICAgICAgICBcIjY5XCI6IFswLCAwLjY4MzMzLCAwLjEyMDI4LCAwXSxcbiAgICAgICAgXCI3MFwiOiBbMCwgMC42ODMzMywgMC4xMzMwNSwgMF0sXG4gICAgICAgIFwiNzFcIjogWzAsIDAuNjgzMzMsIDAuMDg3MjIsIDBdLFxuICAgICAgICBcIjcyXCI6IFswLCAwLjY4MzMzLCAwLjE2Mzg5LCAwXSxcbiAgICAgICAgXCI3M1wiOiBbMCwgMC42ODMzMywgMC4xNTgwNiwgMF0sXG4gICAgICAgIFwiNzRcIjogWzAsIDAuNjgzMzMsIDAuMTQwMjgsIDBdLFxuICAgICAgICBcIjc1XCI6IFswLCAwLjY4MzMzLCAwLjE0NTI4LCAwXSxcbiAgICAgICAgXCI3NlwiOiBbMCwgMC42ODMzMywgMCwgMF0sXG4gICAgICAgIFwiNzdcIjogWzAsIDAuNjgzMzMsIDAuMTYzODksIDBdLFxuICAgICAgICBcIjc4XCI6IFswLCAwLjY4MzMzLCAwLjE2Mzg5LCAwXSxcbiAgICAgICAgXCI3OVwiOiBbMCwgMC42ODMzMywgMC4wOTQwMywgMF0sXG4gICAgICAgIFwiODBcIjogWzAsIDAuNjgzMzMsIDAuMTAyNTcsIDBdLFxuICAgICAgICBcIjgxXCI6IFswLjE5NDQ0LCAwLjY4MzMzLCAwLjA5NDAzLCAwXSxcbiAgICAgICAgXCI4MlwiOiBbMCwgMC42ODMzMywgMC4wMzg2OCwgMF0sXG4gICAgICAgIFwiODNcIjogWzAsIDAuNjgzMzMsIDAuMTE5NzIsIDBdLFxuICAgICAgICBcIjg0XCI6IFswLCAwLjY4MzMzLCAwLjEzMzA1LCAwXSxcbiAgICAgICAgXCI4NVwiOiBbMCwgMC42ODMzMywgMC4xNjM4OSwgMF0sXG4gICAgICAgIFwiODZcIjogWzAsIDAuNjgzMzMsIDAuMTgzNjEsIDBdLFxuICAgICAgICBcIjg3XCI6IFswLCAwLjY4MzMzLCAwLjE4MzYxLCAwXSxcbiAgICAgICAgXCI4OFwiOiBbMCwgMC42ODMzMywgMC4xNTgwNiwgMF0sXG4gICAgICAgIFwiODlcIjogWzAsIDAuNjgzMzMsIDAuMTkzODMsIDBdLFxuICAgICAgICBcIjkwXCI6IFswLCAwLjY4MzMzLCAwLjE0NTI4LCAwXSxcbiAgICAgICAgXCI5MVwiOiBbMC4yNSwgMC43NSwgMC4xODc1LCAwXSxcbiAgICAgICAgXCI5M1wiOiBbMC4yNSwgMC43NSwgMC4xMDUyOCwgMF0sXG4gICAgICAgIFwiOTRcIjogWzAsIDAuNjk0NDQsIDAuMDY2NDYsIDBdLFxuICAgICAgICBcIjk1XCI6IFswLjMxLCAwLjEyMDU2LCAwLjA5MjA4LCAwXSxcbiAgICAgICAgXCI5N1wiOiBbMCwgMC40MzA1NiwgMC4wNzY3MSwgMF0sXG4gICAgICAgIFwiOThcIjogWzAsIDAuNjk0NDQsIDAuMDYzMTIsIDBdLFxuICAgICAgICBcIjk5XCI6IFswLCAwLjQzMDU2LCAwLjA1NjUzLCAwXSxcbiAgICAgICAgXCIxMDBcIjogWzAsIDAuNjk0NDQsIDAuMTAzMzMsIDBdLFxuICAgICAgICBcIjEwMVwiOiBbMCwgMC40MzA1NiwgMC4wNzUxNCwgMF0sXG4gICAgICAgIFwiMTAyXCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLjIxMTk0LCAwXSxcbiAgICAgICAgXCIxMDNcIjogWzAuMTk0NDQsIDAuNDMwNTYsIDAuMDg4NDcsIDBdLFxuICAgICAgICBcIjEwNFwiOiBbMCwgMC42OTQ0NCwgMC4wNzY3MSwgMF0sXG4gICAgICAgIFwiMTA1XCI6IFswLCAwLjY1NTM2LCAwLjEwMTksIDBdLFxuICAgICAgICBcIjEwNlwiOiBbMC4xOTQ0NCwgMC42NTUzNiwgMC4xNDQ2NywgMF0sXG4gICAgICAgIFwiMTA3XCI6IFswLCAwLjY5NDQ0LCAwLjEwNzY0LCAwXSxcbiAgICAgICAgXCIxMDhcIjogWzAsIDAuNjk0NDQsIDAuMTAzMzMsIDBdLFxuICAgICAgICBcIjEwOVwiOiBbMCwgMC40MzA1NiwgMC4wNzY3MSwgMF0sXG4gICAgICAgIFwiMTEwXCI6IFswLCAwLjQzMDU2LCAwLjA3NjcxLCAwXSxcbiAgICAgICAgXCIxMTFcIjogWzAsIDAuNDMwNTYsIDAuMDYzMTIsIDBdLFxuICAgICAgICBcIjExMlwiOiBbMC4xOTQ0NCwgMC40MzA1NiwgMC4wNjMxMiwgMF0sXG4gICAgICAgIFwiMTEzXCI6IFswLjE5NDQ0LCAwLjQzMDU2LCAwLjA4ODQ3LCAwXSxcbiAgICAgICAgXCIxMTRcIjogWzAsIDAuNDMwNTYsIDAuMTA3NjQsIDBdLFxuICAgICAgICBcIjExNVwiOiBbMCwgMC40MzA1NiwgMC4wODIwOCwgMF0sXG4gICAgICAgIFwiMTE2XCI6IFswLCAwLjYxNTA4LCAwLjA5NDg2LCAwXSxcbiAgICAgICAgXCIxMTdcIjogWzAsIDAuNDMwNTYsIDAuMDc2NzEsIDBdLFxuICAgICAgICBcIjExOFwiOiBbMCwgMC40MzA1NiwgMC4xMDc2NCwgMF0sXG4gICAgICAgIFwiMTE5XCI6IFswLCAwLjQzMDU2LCAwLjEwNzY0LCAwXSxcbiAgICAgICAgXCIxMjBcIjogWzAsIDAuNDMwNTYsIDAuMTIwNDIsIDBdLFxuICAgICAgICBcIjEyMVwiOiBbMC4xOTQ0NCwgMC40MzA1NiwgMC4wODg0NywgMF0sXG4gICAgICAgIFwiMTIyXCI6IFswLCAwLjQzMDU2LCAwLjEyMjkyLCAwXSxcbiAgICAgICAgXCIxMjZcIjogWzAuMzUsIDAuMzE3ODYsIDAuMTE1ODUsIDBdLFxuICAgICAgICBcIjE2M1wiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMzA1XCI6IFswLCAwLjQzMDU2LCAwLCAwLjAyNzc4XSxcbiAgICAgICAgXCI1NjdcIjogWzAuMTk0NDQsIDAuNDMwNTYsIDAsIDAuMDgzMzRdLFxuICAgICAgICBcIjc2OFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzY5XCI6IFswLCAwLjY5NDQ0LCAwLjA5Njk0LCAwXSxcbiAgICAgICAgXCI3NzBcIjogWzAsIDAuNjk0NDQsIDAuMDY2NDYsIDBdLFxuICAgICAgICBcIjc3MVwiOiBbMCwgMC42Njc4NiwgMC4xMTU4NSwgMF0sXG4gICAgICAgIFwiNzcyXCI6IFswLCAwLjU2MTY3LCAwLjEwMzMzLCAwXSxcbiAgICAgICAgXCI3NzRcIjogWzAsIDAuNjk0NDQsIDAuMTA4MDYsIDBdLFxuICAgICAgICBcIjc3NVwiOiBbMCwgMC42Njc4NiwgMC4xMTc1MiwgMF0sXG4gICAgICAgIFwiNzc2XCI6IFswLCAwLjY2Nzg2LCAwLjEwNDc0LCAwXSxcbiAgICAgICAgXCI3NzhcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjc3OVwiOiBbMCwgMC42OTQ0NCwgMC4xMjI1LCAwXSxcbiAgICAgICAgXCI3ODBcIjogWzAsIDAuNjI4NDcsIDAuMDgyOTUsIDBdLFxuICAgICAgICBcIjkxNVwiOiBbMCwgMC42ODMzMywgMC4xMzMwNSwgMF0sXG4gICAgICAgIFwiOTE2XCI6IFswLCAwLjY4MzMzLCAwLCAwXSxcbiAgICAgICAgXCI5MjBcIjogWzAsIDAuNjgzMzMsIDAuMDk0MDMsIDBdLFxuICAgICAgICBcIjkyM1wiOiBbMCwgMC42ODMzMywgMCwgMF0sXG4gICAgICAgIFwiOTI2XCI6IFswLCAwLjY4MzMzLCAwLjE1Mjk0LCAwXSxcbiAgICAgICAgXCI5MjhcIjogWzAsIDAuNjgzMzMsIDAuMTYzODksIDBdLFxuICAgICAgICBcIjkzMVwiOiBbMCwgMC42ODMzMywgMC4xMjAyOCwgMF0sXG4gICAgICAgIFwiOTMzXCI6IFswLCAwLjY4MzMzLCAwLjExMTExLCAwXSxcbiAgICAgICAgXCI5MzRcIjogWzAsIDAuNjgzMzMsIDAuMDU5ODYsIDBdLFxuICAgICAgICBcIjkzNlwiOiBbMCwgMC42ODMzMywgMC4xMTExMSwgMF0sXG4gICAgICAgIFwiOTM3XCI6IFswLCAwLjY4MzMzLCAwLjEwMjU3LCAwXSxcbiAgICAgICAgXCI4MjExXCI6IFswLCAwLjQzMDU2LCAwLjA5MjA4LCAwXSxcbiAgICAgICAgXCI4MjEyXCI6IFswLCAwLjQzMDU2LCAwLjA5MjA4LCAwXSxcbiAgICAgICAgXCI4MjE2XCI6IFswLCAwLjY5NDQ0LCAwLjEyNDE3LCAwXSxcbiAgICAgICAgXCI4MjE3XCI6IFswLCAwLjY5NDQ0LCAwLjEyNDE3LCAwXSxcbiAgICAgICAgXCI4MjIwXCI6IFswLCAwLjY5NDQ0LCAwLjE2ODUsIDBdLFxuICAgICAgICBcIjgyMjFcIjogWzAsIDAuNjk0NDQsIDAuMDY5NjEsIDBdLFxuICAgICAgICBcIjg0NjNcIjogWzAsIDAuNjg4ODksIDAsIDBdLFxuICAgIH0sXG4gICAgXCJNYWluLVJlZ3VsYXJcIjoge1xuICAgICAgICBcIjMyXCI6IFswLCAwLCAwLCAwXSxcbiAgICAgICAgXCIzM1wiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMzRcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjM1XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIzNlwiOiBbMC4wNTU1NiwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiMzdcIjogWzAuMDU1NTYsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjM4XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIzOVwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNDBcIjogWzAuMjUsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjQxXCI6IFswLjI1LCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI0MlwiOiBbMCwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiNDNcIjogWzAuMDgzMzMsIDAuNTgzMzMsIDAsIDBdLFxuICAgICAgICBcIjQ0XCI6IFswLjE5NDQ0LCAwLjEwNTU2LCAwLCAwXSxcbiAgICAgICAgXCI0NVwiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiNDZcIjogWzAsIDAuMTA1NTYsIDAsIDBdLFxuICAgICAgICBcIjQ3XCI6IFswLjI1LCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI0OFwiOiBbMCwgMC42NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNDlcIjogWzAsIDAuNjQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjUwXCI6IFswLCAwLjY0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI1MVwiOiBbMCwgMC42NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNTJcIjogWzAsIDAuNjQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjUzXCI6IFswLCAwLjY0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI1NFwiOiBbMCwgMC42NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNTVcIjogWzAsIDAuNjQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjU2XCI6IFswLCAwLjY0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI1N1wiOiBbMCwgMC42NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNThcIjogWzAsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjU5XCI6IFswLjE5NDQ0LCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCI2MFwiOiBbMC4wMzkxLCAwLjUzOTEsIDAsIDBdLFxuICAgICAgICBcIjYxXCI6IFstMC4xMzMxMywgMC4zNjY4NywgMCwgMF0sXG4gICAgICAgIFwiNjJcIjogWzAuMDM5MSwgMC41MzkxLCAwLCAwXSxcbiAgICAgICAgXCI2M1wiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNjRcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjY1XCI6IFswLCAwLjY4MzMzLCAwLCAwXSxcbiAgICAgICAgXCI2NlwiOiBbMCwgMC42ODMzMywgMCwgMF0sXG4gICAgICAgIFwiNjdcIjogWzAsIDAuNjgzMzMsIDAsIDBdLFxuICAgICAgICBcIjY4XCI6IFswLCAwLjY4MzMzLCAwLCAwXSxcbiAgICAgICAgXCI2OVwiOiBbMCwgMC42ODMzMywgMCwgMF0sXG4gICAgICAgIFwiNzBcIjogWzAsIDAuNjgzMzMsIDAsIDBdLFxuICAgICAgICBcIjcxXCI6IFswLCAwLjY4MzMzLCAwLCAwXSxcbiAgICAgICAgXCI3MlwiOiBbMCwgMC42ODMzMywgMCwgMF0sXG4gICAgICAgIFwiNzNcIjogWzAsIDAuNjgzMzMsIDAsIDBdLFxuICAgICAgICBcIjc0XCI6IFswLCAwLjY4MzMzLCAwLCAwXSxcbiAgICAgICAgXCI3NVwiOiBbMCwgMC42ODMzMywgMCwgMF0sXG4gICAgICAgIFwiNzZcIjogWzAsIDAuNjgzMzMsIDAsIDBdLFxuICAgICAgICBcIjc3XCI6IFswLCAwLjY4MzMzLCAwLCAwXSxcbiAgICAgICAgXCI3OFwiOiBbMCwgMC42ODMzMywgMCwgMF0sXG4gICAgICAgIFwiNzlcIjogWzAsIDAuNjgzMzMsIDAsIDBdLFxuICAgICAgICBcIjgwXCI6IFswLCAwLjY4MzMzLCAwLCAwXSxcbiAgICAgICAgXCI4MVwiOiBbMC4xOTQ0NCwgMC42ODMzMywgMCwgMF0sXG4gICAgICAgIFwiODJcIjogWzAsIDAuNjgzMzMsIDAsIDBdLFxuICAgICAgICBcIjgzXCI6IFswLCAwLjY4MzMzLCAwLCAwXSxcbiAgICAgICAgXCI4NFwiOiBbMCwgMC42ODMzMywgMCwgMF0sXG4gICAgICAgIFwiODVcIjogWzAsIDAuNjgzMzMsIDAsIDBdLFxuICAgICAgICBcIjg2XCI6IFswLCAwLjY4MzMzLCAwLjAxMzg5LCAwXSxcbiAgICAgICAgXCI4N1wiOiBbMCwgMC42ODMzMywgMC4wMTM4OSwgMF0sXG4gICAgICAgIFwiODhcIjogWzAsIDAuNjgzMzMsIDAsIDBdLFxuICAgICAgICBcIjg5XCI6IFswLCAwLjY4MzMzLCAwLjAyNSwgMF0sXG4gICAgICAgIFwiOTBcIjogWzAsIDAuNjgzMzMsIDAsIDBdLFxuICAgICAgICBcIjkxXCI6IFswLjI1LCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI5MlwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiOTNcIjogWzAuMjUsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjk0XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5NVwiOiBbMC4zMSwgMC4xMjA1NiwgMC4wMjc3OCwgMF0sXG4gICAgICAgIFwiOTZcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjk3XCI6IFswLCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCI5OFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiOTlcIjogWzAsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjEwMFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTAxXCI6IFswLCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCIxMDJcIjogWzAsIDAuNjk0NDQsIDAuMDc3NzgsIDBdLFxuICAgICAgICBcIjEwM1wiOiBbMC4xOTQ0NCwgMC40MzA1NiwgMC4wMTM4OSwgMF0sXG4gICAgICAgIFwiMTA0XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMDVcIjogWzAsIDAuNjY3ODYsIDAsIDBdLFxuICAgICAgICBcIjEwNlwiOiBbMC4xOTQ0NCwgMC42Njc4NiwgMCwgMF0sXG4gICAgICAgIFwiMTA3XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMDhcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjEwOVwiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiMTEwXCI6IFswLCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCIxMTFcIjogWzAsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjExMlwiOiBbMC4xOTQ0NCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiMTEzXCI6IFswLjE5NDQ0LCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCIxMTRcIjogWzAsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjExNVwiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiMTE2XCI6IFswLCAwLjYxNTA4LCAwLCAwXSxcbiAgICAgICAgXCIxMTdcIjogWzAsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjExOFwiOiBbMCwgMC40MzA1NiwgMC4wMTM4OSwgMF0sXG4gICAgICAgIFwiMTE5XCI6IFswLCAwLjQzMDU2LCAwLjAxMzg5LCAwXSxcbiAgICAgICAgXCIxMjBcIjogWzAsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjEyMVwiOiBbMC4xOTQ0NCwgMC40MzA1NiwgMC4wMTM4OSwgMF0sXG4gICAgICAgIFwiMTIyXCI6IFswLCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCIxMjNcIjogWzAuMjUsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjEyNFwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiMTI1XCI6IFswLjI1LCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCIxMjZcIjogWzAuMzUsIDAuMzE3ODYsIDAsIDBdLFxuICAgICAgICBcIjE2MFwiOiBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFwiMTY4XCI6IFswLCAwLjY2Nzg2LCAwLCAwXSxcbiAgICAgICAgXCIxNzJcIjogWzAsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjE3NVwiOiBbMCwgMC41Njc3OCwgMCwgMF0sXG4gICAgICAgIFwiMTc2XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxNzdcIjogWzAuMDgzMzMsIDAuNTgzMzMsIDAsIDBdLFxuICAgICAgICBcIjE4MFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMjE1XCI6IFswLjA4MzMzLCAwLjU4MzMzLCAwLCAwXSxcbiAgICAgICAgXCIyNDdcIjogWzAuMDgzMzMsIDAuNTgzMzMsIDAsIDBdLFxuICAgICAgICBcIjMwNVwiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiNTY3XCI6IFswLjE5NDQ0LCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCI3MTBcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjcxMVwiOiBbMCwgMC42Mjg0NywgMCwgMF0sXG4gICAgICAgIFwiNzEzXCI6IFswLCAwLjU2Nzc4LCAwLCAwXSxcbiAgICAgICAgXCI3MTRcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjcxNVwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzI4XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI3MjlcIjogWzAsIDAuNjY3ODYsIDAsIDBdLFxuICAgICAgICBcIjczMFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzMyXCI6IFswLCAwLjY2Nzg2LCAwLCAwXSxcbiAgICAgICAgXCI3NjhcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjc2OVwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzcwXCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI3NzFcIjogWzAsIDAuNjY3ODYsIDAsIDBdLFxuICAgICAgICBcIjc3MlwiOiBbMCwgMC41Njc3OCwgMCwgMF0sXG4gICAgICAgIFwiNzc0XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI3NzVcIjogWzAsIDAuNjY3ODYsIDAsIDBdLFxuICAgICAgICBcIjc3NlwiOiBbMCwgMC42Njc4NiwgMCwgMF0sXG4gICAgICAgIFwiNzc4XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI3NzlcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjc4MFwiOiBbMCwgMC42Mjg0NywgMCwgMF0sXG4gICAgICAgIFwiODI0XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5MTVcIjogWzAsIDAuNjgzMzMsIDAsIDBdLFxuICAgICAgICBcIjkxNlwiOiBbMCwgMC42ODMzMywgMCwgMF0sXG4gICAgICAgIFwiOTIwXCI6IFswLCAwLjY4MzMzLCAwLCAwXSxcbiAgICAgICAgXCI5MjNcIjogWzAsIDAuNjgzMzMsIDAsIDBdLFxuICAgICAgICBcIjkyNlwiOiBbMCwgMC42ODMzMywgMCwgMF0sXG4gICAgICAgIFwiOTI4XCI6IFswLCAwLjY4MzMzLCAwLCAwXSxcbiAgICAgICAgXCI5MzFcIjogWzAsIDAuNjgzMzMsIDAsIDBdLFxuICAgICAgICBcIjkzM1wiOiBbMCwgMC42ODMzMywgMCwgMF0sXG4gICAgICAgIFwiOTM0XCI6IFswLCAwLjY4MzMzLCAwLCAwXSxcbiAgICAgICAgXCI5MzZcIjogWzAsIDAuNjgzMzMsIDAsIDBdLFxuICAgICAgICBcIjkzN1wiOiBbMCwgMC42ODMzMywgMCwgMF0sXG4gICAgICAgIFwiODIxMVwiOiBbMCwgMC40MzA1NiwgMC4wMjc3OCwgMF0sXG4gICAgICAgIFwiODIxMlwiOiBbMCwgMC40MzA1NiwgMC4wMjc3OCwgMF0sXG4gICAgICAgIFwiODIxNlwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODIxN1wiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODIyMFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODIyMVwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODIyNFwiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODIyNVwiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODIzMFwiOiBbMCwgMC4xMiwgMCwgMF0sXG4gICAgICAgIFwiODI0MlwiOiBbMCwgMC41NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiODQwN1wiOiBbMCwgMC43MTQ0NCwgMC4xNTM4MiwgMF0sXG4gICAgICAgIFwiODQ2M1wiOiBbMCwgMC42ODg4OSwgMCwgMF0sXG4gICAgICAgIFwiODQ2NVwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODQ2N1wiOiBbMCwgMC42OTQ0NCwgMCwgMC4xMTExMV0sXG4gICAgICAgIFwiODQ3MlwiOiBbMC4xOTQ0NCwgMC40MzA1NiwgMCwgMC4xMTExMV0sXG4gICAgICAgIFwiODQ3NlwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODUwMVwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODU5MlwiOiBbLTAuMTMzMTMsIDAuMzY2ODcsIDAsIDBdLFxuICAgICAgICBcIjg1OTNcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjg1OTRcIjogWy0wLjEzMzEzLCAwLjM2Njg3LCAwLCAwXSxcbiAgICAgICAgXCI4NTk1XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4NTk2XCI6IFstMC4xMzMxMywgMC4zNjY4NywgMCwgMF0sXG4gICAgICAgIFwiODU5N1wiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODU5OFwiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODU5OVwiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODYwMFwiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODYwMVwiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODYxNFwiOiBbMC4wMTEsIDAuNTExLCAwLCAwXSxcbiAgICAgICAgXCI4NjE3XCI6IFswLjAxMSwgMC41MTEsIDAsIDBdLFxuICAgICAgICBcIjg2MThcIjogWzAuMDExLCAwLjUxMSwgMCwgMF0sXG4gICAgICAgIFwiODYzNlwiOiBbLTAuMTMzMTMsIDAuMzY2ODcsIDAsIDBdLFxuICAgICAgICBcIjg2MzdcIjogWy0wLjEzMzEzLCAwLjM2Njg3LCAwLCAwXSxcbiAgICAgICAgXCI4NjQwXCI6IFstMC4xMzMxMywgMC4zNjY4NywgMCwgMF0sXG4gICAgICAgIFwiODY0MVwiOiBbLTAuMTMzMTMsIDAuMzY2ODcsIDAsIDBdLFxuICAgICAgICBcIjg2NTJcIjogWzAuMDExLCAwLjY3MSwgMCwgMF0sXG4gICAgICAgIFwiODY1NlwiOiBbLTAuMTMzMTMsIDAuMzY2ODcsIDAsIDBdLFxuICAgICAgICBcIjg2NTdcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjg2NThcIjogWy0wLjEzMzEzLCAwLjM2Njg3LCAwLCAwXSxcbiAgICAgICAgXCI4NjU5XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4NjYwXCI6IFstMC4xMzMxMywgMC4zNjY4NywgMCwgMF0sXG4gICAgICAgIFwiODY2MVwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODcwNFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODcwNlwiOiBbMCwgMC42OTQ0NCwgMC4wNTU1NiwgMC4wODMzNF0sXG4gICAgICAgIFwiODcwN1wiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODcwOVwiOiBbMC4wNTU1NiwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODcxMVwiOiBbMCwgMC42ODMzMywgMCwgMF0sXG4gICAgICAgIFwiODcxMlwiOiBbMC4wMzkxLCAwLjUzOTEsIDAsIDBdLFxuICAgICAgICBcIjg3MTVcIjogWzAuMDM5MSwgMC41MzkxLCAwLCAwXSxcbiAgICAgICAgXCI4NzIyXCI6IFswLjA4MzMzLCAwLjU4MzMzLCAwLCAwXSxcbiAgICAgICAgXCI4NzIzXCI6IFswLjA4MzMzLCAwLjU4MzMzLCAwLCAwXSxcbiAgICAgICAgXCI4NzI1XCI6IFswLjI1LCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI4NzI2XCI6IFswLjI1LCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI4NzI3XCI6IFstMC4wMzQ3MiwgMC40NjUyOCwgMCwgMF0sXG4gICAgICAgIFwiODcyOFwiOiBbLTAuMDU1NTUsIDAuNDQ0NDUsIDAsIDBdLFxuICAgICAgICBcIjg3MjlcIjogWy0wLjA1NTU1LCAwLjQ0NDQ1LCAwLCAwXSxcbiAgICAgICAgXCI4NzMwXCI6IFswLjIsIDAuOCwgMCwgMF0sXG4gICAgICAgIFwiODczM1wiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiODczNFwiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiODczNlwiOiBbMCwgMC42OTIyNCwgMCwgMF0sXG4gICAgICAgIFwiODczOVwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODc0MVwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODc0M1wiOiBbMCwgMC41NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiODc0NFwiOiBbMCwgMC41NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiODc0NVwiOiBbMCwgMC41NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiODc0NlwiOiBbMCwgMC41NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiODc0N1wiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMC4xMTExMSwgMF0sXG4gICAgICAgIFwiODc2NFwiOiBbLTAuMTMzMTMsIDAuMzY2ODcsIDAsIDBdLFxuICAgICAgICBcIjg3NjhcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjg3NzFcIjogWy0wLjAzNjI1LCAwLjQ2Mzc1LCAwLCAwXSxcbiAgICAgICAgXCI4NzczXCI6IFstMC4wMjIsIDAuNTg5LCAwLCAwXSxcbiAgICAgICAgXCI4Nzc2XCI6IFstMC4wMTY4OCwgMC40ODMxMiwgMCwgMF0sXG4gICAgICAgIFwiODc4MVwiOiBbLTAuMDM2MjUsIDAuNDYzNzUsIDAsIDBdLFxuICAgICAgICBcIjg3ODRcIjogWy0wLjEzMywgMC42NywgMCwgMF0sXG4gICAgICAgIFwiODgwMFwiOiBbMC4yMTUsIDAuNzE2LCAwLCAwXSxcbiAgICAgICAgXCI4ODAxXCI6IFstMC4wMzYyNSwgMC40NjM3NSwgMCwgMF0sXG4gICAgICAgIFwiODgwNFwiOiBbMC4xMzU5NywgMC42MzU5NywgMCwgMF0sXG4gICAgICAgIFwiODgwNVwiOiBbMC4xMzU5NywgMC42MzU5NywgMCwgMF0sXG4gICAgICAgIFwiODgxMFwiOiBbMC4wMzkxLCAwLjUzOTEsIDAsIDBdLFxuICAgICAgICBcIjg4MTFcIjogWzAuMDM5MSwgMC41MzkxLCAwLCAwXSxcbiAgICAgICAgXCI4ODI2XCI6IFswLjAzOTEsIDAuNTM5MSwgMCwgMF0sXG4gICAgICAgIFwiODgyN1wiOiBbMC4wMzkxLCAwLjUzOTEsIDAsIDBdLFxuICAgICAgICBcIjg4MzRcIjogWzAuMDM5MSwgMC41MzkxLCAwLCAwXSxcbiAgICAgICAgXCI4ODM1XCI6IFswLjAzOTEsIDAuNTM5MSwgMCwgMF0sXG4gICAgICAgIFwiODgzOFwiOiBbMC4xMzU5NywgMC42MzU5NywgMCwgMF0sXG4gICAgICAgIFwiODgzOVwiOiBbMC4xMzU5NywgMC42MzU5NywgMCwgMF0sXG4gICAgICAgIFwiODg0NlwiOiBbMCwgMC41NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiODg0OVwiOiBbMC4xMzU5NywgMC42MzU5NywgMCwgMF0sXG4gICAgICAgIFwiODg1MFwiOiBbMC4xMzU5NywgMC42MzU5NywgMCwgMF0sXG4gICAgICAgIFwiODg1MVwiOiBbMCwgMC41NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiODg1MlwiOiBbMCwgMC41NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiODg1M1wiOiBbMC4wODMzMywgMC41ODMzMywgMCwgMF0sXG4gICAgICAgIFwiODg1NFwiOiBbMC4wODMzMywgMC41ODMzMywgMCwgMF0sXG4gICAgICAgIFwiODg1NVwiOiBbMC4wODMzMywgMC41ODMzMywgMCwgMF0sXG4gICAgICAgIFwiODg1NlwiOiBbMC4wODMzMywgMC41ODMzMywgMCwgMF0sXG4gICAgICAgIFwiODg1N1wiOiBbMC4wODMzMywgMC41ODMzMywgMCwgMF0sXG4gICAgICAgIFwiODg2NlwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODg2N1wiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODg2OFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODg2OVwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODg3MlwiOiBbMC4yNDksIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjg5MDBcIjogWy0wLjA1NTU1LCAwLjQ0NDQ1LCAwLCAwXSxcbiAgICAgICAgXCI4OTAxXCI6IFstMC4wNTU1NSwgMC40NDQ0NSwgMCwgMF0sXG4gICAgICAgIFwiODkwMlwiOiBbLTAuMDM0NzIsIDAuNDY1MjgsIDAsIDBdLFxuICAgICAgICBcIjg5MDRcIjogWzAuMDA1LCAwLjUwNSwgMCwgMF0sXG4gICAgICAgIFwiODk0MlwiOiBbMC4wMywgMC45LCAwLCAwXSxcbiAgICAgICAgXCI4OTQzXCI6IFstMC4xOSwgMC4zMSwgMCwgMF0sXG4gICAgICAgIFwiODk0NVwiOiBbLTAuMSwgMC44MiwgMCwgMF0sXG4gICAgICAgIFwiODk2OFwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODk2OVwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODk3MFwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODk3MVwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODk5NFwiOiBbLTAuMTQyMzYsIDAuMzU3NjQsIDAsIDBdLFxuICAgICAgICBcIjg5OTVcIjogWy0wLjE0MjM2LCAwLjM1NzY0LCAwLCAwXSxcbiAgICAgICAgXCI5MTM2XCI6IFswLjI0NCwgMC43NDQsIDAsIDBdLFxuICAgICAgICBcIjkxMzdcIjogWzAuMjQ0LCAwLjc0NCwgMCwgMF0sXG4gICAgICAgIFwiOTY1MVwiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiOTY1N1wiOiBbLTAuMDM0NzIsIDAuNDY1MjgsIDAsIDBdLFxuICAgICAgICBcIjk2NjFcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjk2NjdcIjogWy0wLjAzNDcyLCAwLjQ2NTI4LCAwLCAwXSxcbiAgICAgICAgXCI5NzExXCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5ODI0XCI6IFswLjEyOTYzLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5ODI1XCI6IFswLjEyOTYzLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5ODI2XCI6IFswLjEyOTYzLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5ODI3XCI6IFswLjEyOTYzLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5ODM3XCI6IFswLCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI5ODM4XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5ODM5XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMDIxNlwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiMTAyMTdcIjogWzAuMjUsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjEwMjIyXCI6IFswLjI0NCwgMC43NDQsIDAsIDBdLFxuICAgICAgICBcIjEwMjIzXCI6IFswLjI0NCwgMC43NDQsIDAsIDBdLFxuICAgICAgICBcIjEwMjI5XCI6IFswLjAxMSwgMC41MTEsIDAsIDBdLFxuICAgICAgICBcIjEwMjMwXCI6IFswLjAxMSwgMC41MTEsIDAsIDBdLFxuICAgICAgICBcIjEwMjMxXCI6IFswLjAxMSwgMC41MTEsIDAsIDBdLFxuICAgICAgICBcIjEwMjMyXCI6IFswLjAyNCwgMC41MjUsIDAsIDBdLFxuICAgICAgICBcIjEwMjMzXCI6IFswLjAyNCwgMC41MjUsIDAsIDBdLFxuICAgICAgICBcIjEwMjM0XCI6IFswLjAyNCwgMC41MjUsIDAsIDBdLFxuICAgICAgICBcIjEwMjM2XCI6IFswLjAxMSwgMC41MTEsIDAsIDBdLFxuICAgICAgICBcIjEwODE1XCI6IFswLCAwLjY4MzMzLCAwLCAwXSxcbiAgICAgICAgXCIxMDkyN1wiOiBbMC4xMzU5NywgMC42MzU5NywgMCwgMF0sXG4gICAgICAgIFwiMTA5MjhcIjogWzAuMTM1OTcsIDAuNjM1OTcsIDAsIDBdLFxuICAgIH0sXG4gICAgXCJNYXRoLUJvbGRJdGFsaWNcIjoge1xuICAgICAgICBcIjQ3XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI2NVwiOiBbMCwgMC42ODYxMSwgMCwgMF0sXG4gICAgICAgIFwiNjZcIjogWzAsIDAuNjg2MTEsIDAuMDQ4MzUsIDBdLFxuICAgICAgICBcIjY3XCI6IFswLCAwLjY4NjExLCAwLjA2OTc5LCAwXSxcbiAgICAgICAgXCI2OFwiOiBbMCwgMC42ODYxMSwgMC4wMzE5NCwgMF0sXG4gICAgICAgIFwiNjlcIjogWzAsIDAuNjg2MTEsIDAuMDU0NTEsIDBdLFxuICAgICAgICBcIjcwXCI6IFswLCAwLjY4NjExLCAwLjE1OTcyLCAwXSxcbiAgICAgICAgXCI3MVwiOiBbMCwgMC42ODYxMSwgMCwgMF0sXG4gICAgICAgIFwiNzJcIjogWzAsIDAuNjg2MTEsIDAuMDgyMjksIDBdLFxuICAgICAgICBcIjczXCI6IFswLCAwLjY4NjExLCAwLjA3Nzc4LCAwXSxcbiAgICAgICAgXCI3NFwiOiBbMCwgMC42ODYxMSwgMC4xMDA2OSwgMF0sXG4gICAgICAgIFwiNzVcIjogWzAsIDAuNjg2MTEsIDAuMDY5NzksIDBdLFxuICAgICAgICBcIjc2XCI6IFswLCAwLjY4NjExLCAwLCAwXSxcbiAgICAgICAgXCI3N1wiOiBbMCwgMC42ODYxMSwgMC4xMTQyNCwgMF0sXG4gICAgICAgIFwiNzhcIjogWzAsIDAuNjg2MTEsIDAuMTE0MjQsIDBdLFxuICAgICAgICBcIjc5XCI6IFswLCAwLjY4NjExLCAwLjAzMTk0LCAwXSxcbiAgICAgICAgXCI4MFwiOiBbMCwgMC42ODYxMSwgMC4xNTk3MiwgMF0sXG4gICAgICAgIFwiODFcIjogWzAuMTk0NDQsIDAuNjg2MTEsIDAsIDBdLFxuICAgICAgICBcIjgyXCI6IFswLCAwLjY4NjExLCAwLjAwNDIxLCAwXSxcbiAgICAgICAgXCI4M1wiOiBbMCwgMC42ODYxMSwgMC4wNTM4MiwgMF0sXG4gICAgICAgIFwiODRcIjogWzAsIDAuNjg2MTEsIDAuMTU5NzIsIDBdLFxuICAgICAgICBcIjg1XCI6IFswLCAwLjY4NjExLCAwLjExNDI0LCAwXSxcbiAgICAgICAgXCI4NlwiOiBbMCwgMC42ODYxMSwgMC4yNTU1NSwgMF0sXG4gICAgICAgIFwiODdcIjogWzAsIDAuNjg2MTEsIDAuMTU5NzIsIDBdLFxuICAgICAgICBcIjg4XCI6IFswLCAwLjY4NjExLCAwLjA3Nzc4LCAwXSxcbiAgICAgICAgXCI4OVwiOiBbMCwgMC42ODYxMSwgMC4yNTU1NSwgMF0sXG4gICAgICAgIFwiOTBcIjogWzAsIDAuNjg2MTEsIDAuMDY5NzksIDBdLFxuICAgICAgICBcIjk3XCI6IFswLCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5OFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiOTlcIjogWzAsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjEwMFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTAxXCI6IFswLCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMDJcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAuMTEwNDIsIDBdLFxuICAgICAgICBcIjEwM1wiOiBbMC4xOTQ0NCwgMC40NDQ0NCwgMC4wMzcwNCwgMF0sXG4gICAgICAgIFwiMTA0XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMDVcIjogWzAsIDAuNjkzMjYsIDAsIDBdLFxuICAgICAgICBcIjEwNlwiOiBbMC4xOTQ0NCwgMC42OTMyNiwgMC4wNjIyLCAwXSxcbiAgICAgICAgXCIxMDdcIjogWzAsIDAuNjk0NDQsIDAuMDE4NTIsIDBdLFxuICAgICAgICBcIjEwOFwiOiBbMCwgMC42OTQ0NCwgMC4wMDg4LCAwXSxcbiAgICAgICAgXCIxMDlcIjogWzAsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjExMFwiOiBbMCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTExXCI6IFswLCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMTJcIjogWzAuMTk0NDQsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjExM1wiOiBbMC4xOTQ0NCwgMC40NDQ0NCwgMC4wMzcwNCwgMF0sXG4gICAgICAgIFwiMTE0XCI6IFswLCAwLjQ0NDQ0LCAwLjAzMTk0LCAwXSxcbiAgICAgICAgXCIxMTVcIjogWzAsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjExNlwiOiBbMCwgMC42MzQ5MiwgMCwgMF0sXG4gICAgICAgIFwiMTE3XCI6IFswLCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMThcIjogWzAsIDAuNDQ0NDQsIDAuMDM3MDQsIDBdLFxuICAgICAgICBcIjExOVwiOiBbMCwgMC40NDQ0NCwgMC4wMjc3OCwgMF0sXG4gICAgICAgIFwiMTIwXCI6IFswLCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMjFcIjogWzAuMTk0NDQsIDAuNDQ0NDQsIDAuMDM3MDQsIDBdLFxuICAgICAgICBcIjEyMlwiOiBbMCwgMC40NDQ0NCwgMC4wNDIxMywgMF0sXG4gICAgICAgIFwiOTE1XCI6IFswLCAwLjY4NjExLCAwLjE1OTcyLCAwXSxcbiAgICAgICAgXCI5MTZcIjogWzAsIDAuNjg2MTEsIDAsIDBdLFxuICAgICAgICBcIjkyMFwiOiBbMCwgMC42ODYxMSwgMC4wMzE5NCwgMF0sXG4gICAgICAgIFwiOTIzXCI6IFswLCAwLjY4NjExLCAwLCAwXSxcbiAgICAgICAgXCI5MjZcIjogWzAsIDAuNjg2MTEsIDAuMDc0NTgsIDBdLFxuICAgICAgICBcIjkyOFwiOiBbMCwgMC42ODYxMSwgMC4wODIyOSwgMF0sXG4gICAgICAgIFwiOTMxXCI6IFswLCAwLjY4NjExLCAwLjA1NDUxLCAwXSxcbiAgICAgICAgXCI5MzNcIjogWzAsIDAuNjg2MTEsIDAuMTU5NzIsIDBdLFxuICAgICAgICBcIjkzNFwiOiBbMCwgMC42ODYxMSwgMCwgMF0sXG4gICAgICAgIFwiOTM2XCI6IFswLCAwLjY4NjExLCAwLjExNjUzLCAwXSxcbiAgICAgICAgXCI5MzdcIjogWzAsIDAuNjg2MTEsIDAuMDQ4MzUsIDBdLFxuICAgICAgICBcIjk0NVwiOiBbMCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiOTQ2XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLjAzNDAzLCAwXSxcbiAgICAgICAgXCI5NDdcIjogWzAuMTk0NDQsIDAuNDQ0NDQsIDAuMDYzODksIDBdLFxuICAgICAgICBcIjk0OFwiOiBbMCwgMC42OTQ0NCwgMC4wMzgxOSwgMF0sXG4gICAgICAgIFwiOTQ5XCI6IFswLCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5NTBcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAuMDYyMTUsIDBdLFxuICAgICAgICBcIjk1MVwiOiBbMC4xOTQ0NCwgMC40NDQ0NCwgMC4wMzcwNCwgMF0sXG4gICAgICAgIFwiOTUyXCI6IFswLCAwLjY5NDQ0LCAwLjAzMTk0LCAwXSxcbiAgICAgICAgXCI5NTNcIjogWzAsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjk1NFwiOiBbMCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiOTU1XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5NTZcIjogWzAuMTk0NDQsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjk1N1wiOiBbMCwgMC40NDQ0NCwgMC4wNjg5OCwgMF0sXG4gICAgICAgIFwiOTU4XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLjAzMDIxLCAwXSxcbiAgICAgICAgXCI5NTlcIjogWzAsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjk2MFwiOiBbMCwgMC40NDQ0NCwgMC4wMzcwNCwgMF0sXG4gICAgICAgIFwiOTYxXCI6IFswLjE5NDQ0LCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5NjJcIjogWzAuMDk3MjIsIDAuNDQ0NDQsIDAuMDc5MTcsIDBdLFxuICAgICAgICBcIjk2M1wiOiBbMCwgMC40NDQ0NCwgMC4wMzcwNCwgMF0sXG4gICAgICAgIFwiOTY0XCI6IFswLCAwLjQ0NDQ0LCAwLjEzNDcyLCAwXSxcbiAgICAgICAgXCI5NjVcIjogWzAsIDAuNDQ0NDQsIDAuMDM3MDQsIDBdLFxuICAgICAgICBcIjk2NlwiOiBbMC4xOTQ0NCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiOTY3XCI6IFswLjE5NDQ0LCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5NjhcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAuMDM3MDQsIDBdLFxuICAgICAgICBcIjk2OVwiOiBbMCwgMC40NDQ0NCwgMC4wMzcwNCwgMF0sXG4gICAgICAgIFwiOTc3XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5ODFcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjk4MlwiOiBbMCwgMC40NDQ0NCwgMC4wMzE5NCwgMF0sXG4gICAgICAgIFwiMTAwOVwiOiBbMC4xOTQ0NCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTAxM1wiOiBbMCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgfSxcbiAgICBcIk1hdGgtSXRhbGljXCI6IHtcbiAgICAgICAgXCI0N1wiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNjVcIjogWzAsIDAuNjgzMzMsIDAsIDAuMTM4ODldLFxuICAgICAgICBcIjY2XCI6IFswLCAwLjY4MzMzLCAwLjA1MDE3LCAwLjA4MzM0XSxcbiAgICAgICAgXCI2N1wiOiBbMCwgMC42ODMzMywgMC4wNzE1MywgMC4wODMzNF0sXG4gICAgICAgIFwiNjhcIjogWzAsIDAuNjgzMzMsIDAuMDI3NzgsIDAuMDU1NTZdLFxuICAgICAgICBcIjY5XCI6IFswLCAwLjY4MzMzLCAwLjA1NzY0LCAwLjA4MzM0XSxcbiAgICAgICAgXCI3MFwiOiBbMCwgMC42ODMzMywgMC4xMzg4OSwgMC4wODMzNF0sXG4gICAgICAgIFwiNzFcIjogWzAsIDAuNjgzMzMsIDAsIDAuMDgzMzRdLFxuICAgICAgICBcIjcyXCI6IFswLCAwLjY4MzMzLCAwLjA4MTI1LCAwLjA1NTU2XSxcbiAgICAgICAgXCI3M1wiOiBbMCwgMC42ODMzMywgMC4wNzg0NywgMC4xMTExMV0sXG4gICAgICAgIFwiNzRcIjogWzAsIDAuNjgzMzMsIDAuMDk2MTgsIDAuMTY2NjddLFxuICAgICAgICBcIjc1XCI6IFswLCAwLjY4MzMzLCAwLjA3MTUzLCAwLjA1NTU2XSxcbiAgICAgICAgXCI3NlwiOiBbMCwgMC42ODMzMywgMCwgMC4wMjc3OF0sXG4gICAgICAgIFwiNzdcIjogWzAsIDAuNjgzMzMsIDAuMTA5MDMsIDAuMDgzMzRdLFxuICAgICAgICBcIjc4XCI6IFswLCAwLjY4MzMzLCAwLjEwOTAzLCAwLjA4MzM0XSxcbiAgICAgICAgXCI3OVwiOiBbMCwgMC42ODMzMywgMC4wMjc3OCwgMC4wODMzNF0sXG4gICAgICAgIFwiODBcIjogWzAsIDAuNjgzMzMsIDAuMTM4ODksIDAuMDgzMzRdLFxuICAgICAgICBcIjgxXCI6IFswLjE5NDQ0LCAwLjY4MzMzLCAwLCAwLjA4MzM0XSxcbiAgICAgICAgXCI4MlwiOiBbMCwgMC42ODMzMywgMC4wMDc3MywgMC4wODMzNF0sXG4gICAgICAgIFwiODNcIjogWzAsIDAuNjgzMzMsIDAuMDU3NjQsIDAuMDgzMzRdLFxuICAgICAgICBcIjg0XCI6IFswLCAwLjY4MzMzLCAwLjEzODg5LCAwLjA4MzM0XSxcbiAgICAgICAgXCI4NVwiOiBbMCwgMC42ODMzMywgMC4xMDkwMywgMC4wMjc3OF0sXG4gICAgICAgIFwiODZcIjogWzAsIDAuNjgzMzMsIDAuMjIyMjIsIDBdLFxuICAgICAgICBcIjg3XCI6IFswLCAwLjY4MzMzLCAwLjEzODg5LCAwXSxcbiAgICAgICAgXCI4OFwiOiBbMCwgMC42ODMzMywgMC4wNzg0NywgMC4wODMzNF0sXG4gICAgICAgIFwiODlcIjogWzAsIDAuNjgzMzMsIDAuMjIyMjIsIDBdLFxuICAgICAgICBcIjkwXCI6IFswLCAwLjY4MzMzLCAwLjA3MTUzLCAwLjA4MzM0XSxcbiAgICAgICAgXCI5N1wiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiOThcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjk5XCI6IFswLCAwLjQzMDU2LCAwLCAwLjA1NTU2XSxcbiAgICAgICAgXCIxMDBcIjogWzAsIDAuNjk0NDQsIDAsIDAuMTY2NjddLFxuICAgICAgICBcIjEwMVwiOiBbMCwgMC40MzA1NiwgMCwgMC4wNTU1Nl0sXG4gICAgICAgIFwiMTAyXCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLjEwNzY0LCAwLjE2NjY3XSxcbiAgICAgICAgXCIxMDNcIjogWzAuMTk0NDQsIDAuNDMwNTYsIDAuMDM1ODgsIDAuMDI3NzhdLFxuICAgICAgICBcIjEwNFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTA1XCI6IFswLCAwLjY1OTUyLCAwLCAwXSxcbiAgICAgICAgXCIxMDZcIjogWzAuMTk0NDQsIDAuNjU5NTIsIDAuMDU3MjQsIDBdLFxuICAgICAgICBcIjEwN1wiOiBbMCwgMC42OTQ0NCwgMC4wMzE0OCwgMF0sXG4gICAgICAgIFwiMTA4XCI6IFswLCAwLjY5NDQ0LCAwLjAxOTY4LCAwLjA4MzM0XSxcbiAgICAgICAgXCIxMDlcIjogWzAsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjExMFwiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiMTExXCI6IFswLCAwLjQzMDU2LCAwLCAwLjA1NTU2XSxcbiAgICAgICAgXCIxMTJcIjogWzAuMTk0NDQsIDAuNDMwNTYsIDAsIDAuMDgzMzRdLFxuICAgICAgICBcIjExM1wiOiBbMC4xOTQ0NCwgMC40MzA1NiwgMC4wMzU4OCwgMC4wODMzNF0sXG4gICAgICAgIFwiMTE0XCI6IFswLCAwLjQzMDU2LCAwLjAyNzc4LCAwLjA1NTU2XSxcbiAgICAgICAgXCIxMTVcIjogWzAsIDAuNDMwNTYsIDAsIDAuMDU1NTZdLFxuICAgICAgICBcIjExNlwiOiBbMCwgMC42MTUwOCwgMCwgMC4wODMzNF0sXG4gICAgICAgIFwiMTE3XCI6IFswLCAwLjQzMDU2LCAwLCAwLjAyNzc4XSxcbiAgICAgICAgXCIxMThcIjogWzAsIDAuNDMwNTYsIDAuMDM1ODgsIDAuMDI3NzhdLFxuICAgICAgICBcIjExOVwiOiBbMCwgMC40MzA1NiwgMC4wMjY5MSwgMC4wODMzNF0sXG4gICAgICAgIFwiMTIwXCI6IFswLCAwLjQzMDU2LCAwLCAwLjAyNzc4XSxcbiAgICAgICAgXCIxMjFcIjogWzAuMTk0NDQsIDAuNDMwNTYsIDAuMDM1ODgsIDAuMDU1NTZdLFxuICAgICAgICBcIjEyMlwiOiBbMCwgMC40MzA1NiwgMC4wNDM5OCwgMC4wNTU1Nl0sXG4gICAgICAgIFwiOTE1XCI6IFswLCAwLjY4MzMzLCAwLjEzODg5LCAwLjA4MzM0XSxcbiAgICAgICAgXCI5MTZcIjogWzAsIDAuNjgzMzMsIDAsIDAuMTY2NjddLFxuICAgICAgICBcIjkyMFwiOiBbMCwgMC42ODMzMywgMC4wMjc3OCwgMC4wODMzNF0sXG4gICAgICAgIFwiOTIzXCI6IFswLCAwLjY4MzMzLCAwLCAwLjE2NjY3XSxcbiAgICAgICAgXCI5MjZcIjogWzAsIDAuNjgzMzMsIDAuMDc1NjksIDAuMDgzMzRdLFxuICAgICAgICBcIjkyOFwiOiBbMCwgMC42ODMzMywgMC4wODEyNSwgMC4wNTU1Nl0sXG4gICAgICAgIFwiOTMxXCI6IFswLCAwLjY4MzMzLCAwLjA1NzY0LCAwLjA4MzM0XSxcbiAgICAgICAgXCI5MzNcIjogWzAsIDAuNjgzMzMsIDAuMTM4ODksIDAuMDU1NTZdLFxuICAgICAgICBcIjkzNFwiOiBbMCwgMC42ODMzMywgMCwgMC4wODMzNF0sXG4gICAgICAgIFwiOTM2XCI6IFswLCAwLjY4MzMzLCAwLjExLCAwLjA1NTU2XSxcbiAgICAgICAgXCI5MzdcIjogWzAsIDAuNjgzMzMsIDAuMDUwMTcsIDAuMDgzMzRdLFxuICAgICAgICBcIjk0NVwiOiBbMCwgMC40MzA1NiwgMC4wMDM3LCAwLjAyNzc4XSxcbiAgICAgICAgXCI5NDZcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAuMDUyNzgsIDAuMDgzMzRdLFxuICAgICAgICBcIjk0N1wiOiBbMC4xOTQ0NCwgMC40MzA1NiwgMC4wNTU1NiwgMF0sXG4gICAgICAgIFwiOTQ4XCI6IFswLCAwLjY5NDQ0LCAwLjAzNzg1LCAwLjA1NTU2XSxcbiAgICAgICAgXCI5NDlcIjogWzAsIDAuNDMwNTYsIDAsIDAuMDgzMzRdLFxuICAgICAgICBcIjk1MFwiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMC4wNzM3OCwgMC4wODMzNF0sXG4gICAgICAgIFwiOTUxXCI6IFswLjE5NDQ0LCAwLjQzMDU2LCAwLjAzNTg4LCAwLjA1NTU2XSxcbiAgICAgICAgXCI5NTJcIjogWzAsIDAuNjk0NDQsIDAuMDI3NzgsIDAuMDgzMzRdLFxuICAgICAgICBcIjk1M1wiOiBbMCwgMC40MzA1NiwgMCwgMC4wNTU1Nl0sXG4gICAgICAgIFwiOTU0XCI6IFswLCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCI5NTVcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjk1NlwiOiBbMC4xOTQ0NCwgMC40MzA1NiwgMCwgMC4wMjc3OF0sXG4gICAgICAgIFwiOTU3XCI6IFswLCAwLjQzMDU2LCAwLjA2MzY2LCAwLjAyNzc4XSxcbiAgICAgICAgXCI5NThcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAuMDQ2MDEsIDAuMTExMTFdLFxuICAgICAgICBcIjk1OVwiOiBbMCwgMC40MzA1NiwgMCwgMC4wNTU1Nl0sXG4gICAgICAgIFwiOTYwXCI6IFswLCAwLjQzMDU2LCAwLjAzNTg4LCAwXSxcbiAgICAgICAgXCI5NjFcIjogWzAuMTk0NDQsIDAuNDMwNTYsIDAsIDAuMDgzMzRdLFxuICAgICAgICBcIjk2MlwiOiBbMC4wOTcyMiwgMC40MzA1NiwgMC4wNzk4NiwgMC4wODMzNF0sXG4gICAgICAgIFwiOTYzXCI6IFswLCAwLjQzMDU2LCAwLjAzNTg4LCAwXSxcbiAgICAgICAgXCI5NjRcIjogWzAsIDAuNDMwNTYsIDAuMTEzMiwgMC4wMjc3OF0sXG4gICAgICAgIFwiOTY1XCI6IFswLCAwLjQzMDU2LCAwLjAzNTg4LCAwLjAyNzc4XSxcbiAgICAgICAgXCI5NjZcIjogWzAuMTk0NDQsIDAuNDMwNTYsIDAsIDAuMDgzMzRdLFxuICAgICAgICBcIjk2N1wiOiBbMC4xOTQ0NCwgMC40MzA1NiwgMCwgMC4wNTU1Nl0sXG4gICAgICAgIFwiOTY4XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLjAzNTg4LCAwLjExMTExXSxcbiAgICAgICAgXCI5NjlcIjogWzAsIDAuNDMwNTYsIDAuMDM1ODgsIDBdLFxuICAgICAgICBcIjk3N1wiOiBbMCwgMC42OTQ0NCwgMCwgMC4wODMzNF0sXG4gICAgICAgIFwiOTgxXCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLCAwLjA4MzM0XSxcbiAgICAgICAgXCI5ODJcIjogWzAsIDAuNDMwNTYsIDAuMDI3NzgsIDBdLFxuICAgICAgICBcIjEwMDlcIjogWzAuMTk0NDQsIDAuNDMwNTYsIDAsIDAuMDgzMzRdLFxuICAgICAgICBcIjEwMTNcIjogWzAsIDAuNDMwNTYsIDAsIDAuMDU1NTZdLFxuICAgIH0sXG4gICAgXCJNYXRoLVJlZ3VsYXJcIjoge1xuICAgICAgICBcIjY1XCI6IFswLCAwLjY4MzMzLCAwLCAwLjEzODg5XSxcbiAgICAgICAgXCI2NlwiOiBbMCwgMC42ODMzMywgMC4wNTAxNywgMC4wODMzNF0sXG4gICAgICAgIFwiNjdcIjogWzAsIDAuNjgzMzMsIDAuMDcxNTMsIDAuMDgzMzRdLFxuICAgICAgICBcIjY4XCI6IFswLCAwLjY4MzMzLCAwLjAyNzc4LCAwLjA1NTU2XSxcbiAgICAgICAgXCI2OVwiOiBbMCwgMC42ODMzMywgMC4wNTc2NCwgMC4wODMzNF0sXG4gICAgICAgIFwiNzBcIjogWzAsIDAuNjgzMzMsIDAuMTM4ODksIDAuMDgzMzRdLFxuICAgICAgICBcIjcxXCI6IFswLCAwLjY4MzMzLCAwLCAwLjA4MzM0XSxcbiAgICAgICAgXCI3MlwiOiBbMCwgMC42ODMzMywgMC4wODEyNSwgMC4wNTU1Nl0sXG4gICAgICAgIFwiNzNcIjogWzAsIDAuNjgzMzMsIDAuMDc4NDcsIDAuMTExMTFdLFxuICAgICAgICBcIjc0XCI6IFswLCAwLjY4MzMzLCAwLjA5NjE4LCAwLjE2NjY3XSxcbiAgICAgICAgXCI3NVwiOiBbMCwgMC42ODMzMywgMC4wNzE1MywgMC4wNTU1Nl0sXG4gICAgICAgIFwiNzZcIjogWzAsIDAuNjgzMzMsIDAsIDAuMDI3NzhdLFxuICAgICAgICBcIjc3XCI6IFswLCAwLjY4MzMzLCAwLjEwOTAzLCAwLjA4MzM0XSxcbiAgICAgICAgXCI3OFwiOiBbMCwgMC42ODMzMywgMC4xMDkwMywgMC4wODMzNF0sXG4gICAgICAgIFwiNzlcIjogWzAsIDAuNjgzMzMsIDAuMDI3NzgsIDAuMDgzMzRdLFxuICAgICAgICBcIjgwXCI6IFswLCAwLjY4MzMzLCAwLjEzODg5LCAwLjA4MzM0XSxcbiAgICAgICAgXCI4MVwiOiBbMC4xOTQ0NCwgMC42ODMzMywgMCwgMC4wODMzNF0sXG4gICAgICAgIFwiODJcIjogWzAsIDAuNjgzMzMsIDAuMDA3NzMsIDAuMDgzMzRdLFxuICAgICAgICBcIjgzXCI6IFswLCAwLjY4MzMzLCAwLjA1NzY0LCAwLjA4MzM0XSxcbiAgICAgICAgXCI4NFwiOiBbMCwgMC42ODMzMywgMC4xMzg4OSwgMC4wODMzNF0sXG4gICAgICAgIFwiODVcIjogWzAsIDAuNjgzMzMsIDAuMTA5MDMsIDAuMDI3NzhdLFxuICAgICAgICBcIjg2XCI6IFswLCAwLjY4MzMzLCAwLjIyMjIyLCAwXSxcbiAgICAgICAgXCI4N1wiOiBbMCwgMC42ODMzMywgMC4xMzg4OSwgMF0sXG4gICAgICAgIFwiODhcIjogWzAsIDAuNjgzMzMsIDAuMDc4NDcsIDAuMDgzMzRdLFxuICAgICAgICBcIjg5XCI6IFswLCAwLjY4MzMzLCAwLjIyMjIyLCAwXSxcbiAgICAgICAgXCI5MFwiOiBbMCwgMC42ODMzMywgMC4wNzE1MywgMC4wODMzNF0sXG4gICAgICAgIFwiOTdcIjogWzAsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjk4XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5OVwiOiBbMCwgMC40MzA1NiwgMCwgMC4wNTU1Nl0sXG4gICAgICAgIFwiMTAwXCI6IFswLCAwLjY5NDQ0LCAwLCAwLjE2NjY3XSxcbiAgICAgICAgXCIxMDFcIjogWzAsIDAuNDMwNTYsIDAsIDAuMDU1NTZdLFxuICAgICAgICBcIjEwMlwiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMC4xMDc2NCwgMC4xNjY2N10sXG4gICAgICAgIFwiMTAzXCI6IFswLjE5NDQ0LCAwLjQzMDU2LCAwLjAzNTg4LCAwLjAyNzc4XSxcbiAgICAgICAgXCIxMDRcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjEwNVwiOiBbMCwgMC42NTk1MiwgMCwgMF0sXG4gICAgICAgIFwiMTA2XCI6IFswLjE5NDQ0LCAwLjY1OTUyLCAwLjA1NzI0LCAwXSxcbiAgICAgICAgXCIxMDdcIjogWzAsIDAuNjk0NDQsIDAuMDMxNDgsIDBdLFxuICAgICAgICBcIjEwOFwiOiBbMCwgMC42OTQ0NCwgMC4wMTk2OCwgMC4wODMzNF0sXG4gICAgICAgIFwiMTA5XCI6IFswLCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCIxMTBcIjogWzAsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjExMVwiOiBbMCwgMC40MzA1NiwgMCwgMC4wNTU1Nl0sXG4gICAgICAgIFwiMTEyXCI6IFswLjE5NDQ0LCAwLjQzMDU2LCAwLCAwLjA4MzM0XSxcbiAgICAgICAgXCIxMTNcIjogWzAuMTk0NDQsIDAuNDMwNTYsIDAuMDM1ODgsIDAuMDgzMzRdLFxuICAgICAgICBcIjExNFwiOiBbMCwgMC40MzA1NiwgMC4wMjc3OCwgMC4wNTU1Nl0sXG4gICAgICAgIFwiMTE1XCI6IFswLCAwLjQzMDU2LCAwLCAwLjA1NTU2XSxcbiAgICAgICAgXCIxMTZcIjogWzAsIDAuNjE1MDgsIDAsIDAuMDgzMzRdLFxuICAgICAgICBcIjExN1wiOiBbMCwgMC40MzA1NiwgMCwgMC4wMjc3OF0sXG4gICAgICAgIFwiMTE4XCI6IFswLCAwLjQzMDU2LCAwLjAzNTg4LCAwLjAyNzc4XSxcbiAgICAgICAgXCIxMTlcIjogWzAsIDAuNDMwNTYsIDAuMDI2OTEsIDAuMDgzMzRdLFxuICAgICAgICBcIjEyMFwiOiBbMCwgMC40MzA1NiwgMCwgMC4wMjc3OF0sXG4gICAgICAgIFwiMTIxXCI6IFswLjE5NDQ0LCAwLjQzMDU2LCAwLjAzNTg4LCAwLjA1NTU2XSxcbiAgICAgICAgXCIxMjJcIjogWzAsIDAuNDMwNTYsIDAuMDQzOTgsIDAuMDU1NTZdLFxuICAgICAgICBcIjkxNVwiOiBbMCwgMC42ODMzMywgMC4xMzg4OSwgMC4wODMzNF0sXG4gICAgICAgIFwiOTE2XCI6IFswLCAwLjY4MzMzLCAwLCAwLjE2NjY3XSxcbiAgICAgICAgXCI5MjBcIjogWzAsIDAuNjgzMzMsIDAuMDI3NzgsIDAuMDgzMzRdLFxuICAgICAgICBcIjkyM1wiOiBbMCwgMC42ODMzMywgMCwgMC4xNjY2N10sXG4gICAgICAgIFwiOTI2XCI6IFswLCAwLjY4MzMzLCAwLjA3NTY5LCAwLjA4MzM0XSxcbiAgICAgICAgXCI5MjhcIjogWzAsIDAuNjgzMzMsIDAuMDgxMjUsIDAuMDU1NTZdLFxuICAgICAgICBcIjkzMVwiOiBbMCwgMC42ODMzMywgMC4wNTc2NCwgMC4wODMzNF0sXG4gICAgICAgIFwiOTMzXCI6IFswLCAwLjY4MzMzLCAwLjEzODg5LCAwLjA1NTU2XSxcbiAgICAgICAgXCI5MzRcIjogWzAsIDAuNjgzMzMsIDAsIDAuMDgzMzRdLFxuICAgICAgICBcIjkzNlwiOiBbMCwgMC42ODMzMywgMC4xMSwgMC4wNTU1Nl0sXG4gICAgICAgIFwiOTM3XCI6IFswLCAwLjY4MzMzLCAwLjA1MDE3LCAwLjA4MzM0XSxcbiAgICAgICAgXCI5NDVcIjogWzAsIDAuNDMwNTYsIDAuMDAzNywgMC4wMjc3OF0sXG4gICAgICAgIFwiOTQ2XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLjA1Mjc4LCAwLjA4MzM0XSxcbiAgICAgICAgXCI5NDdcIjogWzAuMTk0NDQsIDAuNDMwNTYsIDAuMDU1NTYsIDBdLFxuICAgICAgICBcIjk0OFwiOiBbMCwgMC42OTQ0NCwgMC4wMzc4NSwgMC4wNTU1Nl0sXG4gICAgICAgIFwiOTQ5XCI6IFswLCAwLjQzMDU2LCAwLCAwLjA4MzM0XSxcbiAgICAgICAgXCI5NTBcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAuMDczNzgsIDAuMDgzMzRdLFxuICAgICAgICBcIjk1MVwiOiBbMC4xOTQ0NCwgMC40MzA1NiwgMC4wMzU4OCwgMC4wNTU1Nl0sXG4gICAgICAgIFwiOTUyXCI6IFswLCAwLjY5NDQ0LCAwLjAyNzc4LCAwLjA4MzM0XSxcbiAgICAgICAgXCI5NTNcIjogWzAsIDAuNDMwNTYsIDAsIDAuMDU1NTZdLFxuICAgICAgICBcIjk1NFwiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiOTU1XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5NTZcIjogWzAuMTk0NDQsIDAuNDMwNTYsIDAsIDAuMDI3NzhdLFxuICAgICAgICBcIjk1N1wiOiBbMCwgMC40MzA1NiwgMC4wNjM2NiwgMC4wMjc3OF0sXG4gICAgICAgIFwiOTU4XCI6IFswLjE5NDQ0LCAwLjY5NDQ0LCAwLjA0NjAxLCAwLjExMTExXSxcbiAgICAgICAgXCI5NTlcIjogWzAsIDAuNDMwNTYsIDAsIDAuMDU1NTZdLFxuICAgICAgICBcIjk2MFwiOiBbMCwgMC40MzA1NiwgMC4wMzU4OCwgMF0sXG4gICAgICAgIFwiOTYxXCI6IFswLjE5NDQ0LCAwLjQzMDU2LCAwLCAwLjA4MzM0XSxcbiAgICAgICAgXCI5NjJcIjogWzAuMDk3MjIsIDAuNDMwNTYsIDAuMDc5ODYsIDAuMDgzMzRdLFxuICAgICAgICBcIjk2M1wiOiBbMCwgMC40MzA1NiwgMC4wMzU4OCwgMF0sXG4gICAgICAgIFwiOTY0XCI6IFswLCAwLjQzMDU2LCAwLjExMzIsIDAuMDI3NzhdLFxuICAgICAgICBcIjk2NVwiOiBbMCwgMC40MzA1NiwgMC4wMzU4OCwgMC4wMjc3OF0sXG4gICAgICAgIFwiOTY2XCI6IFswLjE5NDQ0LCAwLjQzMDU2LCAwLCAwLjA4MzM0XSxcbiAgICAgICAgXCI5NjdcIjogWzAuMTk0NDQsIDAuNDMwNTYsIDAsIDAuMDU1NTZdLFxuICAgICAgICBcIjk2OFwiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMC4wMzU4OCwgMC4xMTExMV0sXG4gICAgICAgIFwiOTY5XCI6IFswLCAwLjQzMDU2LCAwLjAzNTg4LCAwXSxcbiAgICAgICAgXCI5NzdcIjogWzAsIDAuNjk0NDQsIDAsIDAuMDgzMzRdLFxuICAgICAgICBcIjk4MVwiOiBbMC4xOTQ0NCwgMC42OTQ0NCwgMCwgMC4wODMzNF0sXG4gICAgICAgIFwiOTgyXCI6IFswLCAwLjQzMDU2LCAwLjAyNzc4LCAwXSxcbiAgICAgICAgXCIxMDA5XCI6IFswLjE5NDQ0LCAwLjQzMDU2LCAwLCAwLjA4MzM0XSxcbiAgICAgICAgXCIxMDEzXCI6IFswLCAwLjQzMDU2LCAwLCAwLjA1NTU2XSxcbiAgICB9LFxuICAgIFwiU2Fuc1NlcmlmLVJlZ3VsYXJcIjoge1xuICAgICAgICBcIjMzXCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIzNFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMzVcIjogWzAuMTk0NDQsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjM2XCI6IFswLjA1NTU2LCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCIzN1wiOiBbMC4wNTU1NiwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiMzhcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjM5XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI0MFwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiNDFcIjogWzAuMjUsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjQyXCI6IFswLCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI0M1wiOiBbMC4wODMzMywgMC41ODMzMywgMCwgMF0sXG4gICAgICAgIFwiNDRcIjogWzAuMTI1LCAwLjA4MzMzLCAwLCAwXSxcbiAgICAgICAgXCI0NVwiOiBbMCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNDZcIjogWzAsIDAuMDgzMzMsIDAsIDBdLFxuICAgICAgICBcIjQ3XCI6IFswLjI1LCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI0OFwiOiBbMCwgMC42NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiNDlcIjogWzAsIDAuNjU1NTYsIDAsIDBdLFxuICAgICAgICBcIjUwXCI6IFswLCAwLjY1NTU2LCAwLCAwXSxcbiAgICAgICAgXCI1MVwiOiBbMCwgMC42NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiNTJcIjogWzAsIDAuNjU1NTYsIDAsIDBdLFxuICAgICAgICBcIjUzXCI6IFswLCAwLjY1NTU2LCAwLCAwXSxcbiAgICAgICAgXCI1NFwiOiBbMCwgMC42NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiNTVcIjogWzAsIDAuNjU1NTYsIDAsIDBdLFxuICAgICAgICBcIjU2XCI6IFswLCAwLjY1NTU2LCAwLCAwXSxcbiAgICAgICAgXCI1N1wiOiBbMCwgMC42NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiNThcIjogWzAsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjU5XCI6IFswLjEyNSwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNjFcIjogWy0wLjEzLCAwLjM3LCAwLCAwXSxcbiAgICAgICAgXCI2M1wiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNjRcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjY1XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI2NlwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNjdcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjY4XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI2OVwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzBcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjcxXCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI3MlwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzNcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjc0XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI3NVwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzZcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjc3XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI3OFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzlcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjgwXCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4MVwiOiBbMC4xMjUsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjgyXCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4M1wiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODRcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjg1XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4NlwiOiBbMCwgMC42OTQ0NCwgMC4wMTM4OSwgMF0sXG4gICAgICAgIFwiODdcIjogWzAsIDAuNjk0NDQsIDAuMDEzODksIDBdLFxuICAgICAgICBcIjg4XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI4OVwiOiBbMCwgMC42OTQ0NCwgMC4wMjUsIDBdLFxuICAgICAgICBcIjkwXCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5MVwiOiBbMC4yNSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiOTNcIjogWzAuMjUsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjk0XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5NVwiOiBbMC4zNSwgMC4wOTQ0NCwgMC4wMjc3OCwgMF0sXG4gICAgICAgIFwiOTdcIjogWzAsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjk4XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5OVwiOiBbMCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTAwXCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMDFcIjogWzAsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjEwMlwiOiBbMCwgMC42OTQ0NCwgMC4wNjk0NCwgMF0sXG4gICAgICAgIFwiMTAzXCI6IFswLjE5NDQ0LCAwLjQ0NDQ0LCAwLjAxMzg5LCAwXSxcbiAgICAgICAgXCIxMDRcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjEwNVwiOiBbMCwgMC42NzkzNywgMCwgMF0sXG4gICAgICAgIFwiMTA2XCI6IFswLjE5NDQ0LCAwLjY3OTM3LCAwLCAwXSxcbiAgICAgICAgXCIxMDdcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjEwOFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTA5XCI6IFswLCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMTBcIjogWzAsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjExMVwiOiBbMCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTEyXCI6IFswLjE5NDQ0LCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMTNcIjogWzAuMTk0NDQsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjExNFwiOiBbMCwgMC40NDQ0NCwgMC4wMTM4OSwgMF0sXG4gICAgICAgIFwiMTE1XCI6IFswLCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMTZcIjogWzAsIDAuNTcxNDMsIDAsIDBdLFxuICAgICAgICBcIjExN1wiOiBbMCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTE4XCI6IFswLCAwLjQ0NDQ0LCAwLjAxMzg5LCAwXSxcbiAgICAgICAgXCIxMTlcIjogWzAsIDAuNDQ0NDQsIDAuMDEzODksIDBdLFxuICAgICAgICBcIjEyMFwiOiBbMCwgMC40NDQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTIxXCI6IFswLjE5NDQ0LCAwLjQ0NDQ0LCAwLjAxMzg5LCAwXSxcbiAgICAgICAgXCIxMjJcIjogWzAsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjEyNlwiOiBbMC4zNSwgMC4zMjY1OSwgMCwgMF0sXG4gICAgICAgIFwiMzA1XCI6IFswLCAwLjQ0NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI1NjdcIjogWzAuMTk0NDQsIDAuNDQ0NDQsIDAsIDBdLFxuICAgICAgICBcIjc2OFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzY5XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI3NzBcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjc3MVwiOiBbMCwgMC42NzY1OSwgMCwgMF0sXG4gICAgICAgIFwiNzcyXCI6IFswLCAwLjYwODg5LCAwLCAwXSxcbiAgICAgICAgXCI3NzRcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjc3NVwiOiBbMCwgMC42NzkzNywgMCwgMF0sXG4gICAgICAgIFwiNzc2XCI6IFswLCAwLjY3OTM3LCAwLCAwXSxcbiAgICAgICAgXCI3NzhcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjc3OVwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNzgwXCI6IFswLCAwLjYzMTk0LCAwLCAwXSxcbiAgICAgICAgXCI5MTVcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjkxNlwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiOTIwXCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5MjNcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjkyNlwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiOTI4XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5MzFcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjkzM1wiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiOTM0XCI6IFswLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5MzZcIjogWzAsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjkzN1wiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODIxMVwiOiBbMCwgMC40NDQ0NCwgMC4wMjc3OCwgMF0sXG4gICAgICAgIFwiODIxMlwiOiBbMCwgMC40NDQ0NCwgMC4wMjc3OCwgMF0sXG4gICAgICAgIFwiODIxNlwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODIxN1wiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODIyMFwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiODIyMVwiOiBbMCwgMC42OTQ0NCwgMCwgMF0sXG4gICAgfSxcbiAgICBcIlNjcmlwdC1SZWd1bGFyXCI6IHtcbiAgICAgICAgXCI2NVwiOiBbMCwgMC43LCAwLjIyOTI1LCAwXSxcbiAgICAgICAgXCI2NlwiOiBbMCwgMC43LCAwLjA0MDg3LCAwXSxcbiAgICAgICAgXCI2N1wiOiBbMCwgMC43LCAwLjE2ODksIDBdLFxuICAgICAgICBcIjY4XCI6IFswLCAwLjcsIDAuMDkzNzEsIDBdLFxuICAgICAgICBcIjY5XCI6IFswLCAwLjcsIDAuMTg1ODMsIDBdLFxuICAgICAgICBcIjcwXCI6IFswLCAwLjcsIDAuMTM2MzQsIDBdLFxuICAgICAgICBcIjcxXCI6IFswLCAwLjcsIDAuMTczMjIsIDBdLFxuICAgICAgICBcIjcyXCI6IFswLCAwLjcsIDAuMjk2OTQsIDBdLFxuICAgICAgICBcIjczXCI6IFswLCAwLjcsIDAuMTkxODksIDBdLFxuICAgICAgICBcIjc0XCI6IFswLjI3Nzc4LCAwLjcsIDAuMTkxODksIDBdLFxuICAgICAgICBcIjc1XCI6IFswLCAwLjcsIDAuMzEyNTksIDBdLFxuICAgICAgICBcIjc2XCI6IFswLCAwLjcsIDAuMTkxODksIDBdLFxuICAgICAgICBcIjc3XCI6IFswLCAwLjcsIDAuMTU5ODEsIDBdLFxuICAgICAgICBcIjc4XCI6IFswLCAwLjcsIDAuMzUyNSwgMF0sXG4gICAgICAgIFwiNzlcIjogWzAsIDAuNywgMC4wODA3OCwgMF0sXG4gICAgICAgIFwiODBcIjogWzAsIDAuNywgMC4wODA3OCwgMF0sXG4gICAgICAgIFwiODFcIjogWzAsIDAuNywgMC4wMzMwNSwgMF0sXG4gICAgICAgIFwiODJcIjogWzAsIDAuNywgMC4wNjI1OSwgMF0sXG4gICAgICAgIFwiODNcIjogWzAsIDAuNywgMC4xOTE4OSwgMF0sXG4gICAgICAgIFwiODRcIjogWzAsIDAuNywgMC4yOTA4NywgMF0sXG4gICAgICAgIFwiODVcIjogWzAsIDAuNywgMC4yNTgxNSwgMF0sXG4gICAgICAgIFwiODZcIjogWzAsIDAuNywgMC4yNzUyMywgMF0sXG4gICAgICAgIFwiODdcIjogWzAsIDAuNywgMC4yNzUyMywgMF0sXG4gICAgICAgIFwiODhcIjogWzAsIDAuNywgMC4yNjAwNiwgMF0sXG4gICAgICAgIFwiODlcIjogWzAsIDAuNywgMC4yOTM5LCAwXSxcbiAgICAgICAgXCI5MFwiOiBbMCwgMC43LCAwLjI0MDM3LCAwXSxcbiAgICB9LFxuICAgIFwiU2l6ZTEtUmVndWxhclwiOiB7XG4gICAgICAgIFwiNDBcIjogWzAuMzUwMDEsIDAuODUsIDAsIDBdLFxuICAgICAgICBcIjQxXCI6IFswLjM1MDAxLCAwLjg1LCAwLCAwXSxcbiAgICAgICAgXCI0N1wiOiBbMC4zNTAwMSwgMC44NSwgMCwgMF0sXG4gICAgICAgIFwiOTFcIjogWzAuMzUwMDEsIDAuODUsIDAsIDBdLFxuICAgICAgICBcIjkyXCI6IFswLjM1MDAxLCAwLjg1LCAwLCAwXSxcbiAgICAgICAgXCI5M1wiOiBbMC4zNTAwMSwgMC44NSwgMCwgMF0sXG4gICAgICAgIFwiMTIzXCI6IFswLjM1MDAxLCAwLjg1LCAwLCAwXSxcbiAgICAgICAgXCIxMjVcIjogWzAuMzUwMDEsIDAuODUsIDAsIDBdLFxuICAgICAgICBcIjcxMFwiOiBbMCwgMC43MjIyMiwgMCwgMF0sXG4gICAgICAgIFwiNzMyXCI6IFswLCAwLjcyMjIyLCAwLCAwXSxcbiAgICAgICAgXCI3NzBcIjogWzAsIDAuNzIyMjIsIDAsIDBdLFxuICAgICAgICBcIjc3MVwiOiBbMCwgMC43MjIyMiwgMCwgMF0sXG4gICAgICAgIFwiODIxNFwiOiBbLTAuMDAwOTksIDAuNjAxLCAwLCAwXSxcbiAgICAgICAgXCI4NTkzXCI6IFsxZS0wNSwgMC42LCAwLCAwXSxcbiAgICAgICAgXCI4NTk1XCI6IFsxZS0wNSwgMC42LCAwLCAwXSxcbiAgICAgICAgXCI4NjU3XCI6IFsxZS0wNSwgMC42LCAwLCAwXSxcbiAgICAgICAgXCI4NjU5XCI6IFsxZS0wNSwgMC42LCAwLCAwXSxcbiAgICAgICAgXCI4NzE5XCI6IFswLjI1MDAxLCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI4NzIwXCI6IFswLjI1MDAxLCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI4NzIxXCI6IFswLjI1MDAxLCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI4NzMwXCI6IFswLjM1MDAxLCAwLjg1LCAwLCAwXSxcbiAgICAgICAgXCI4NzM5XCI6IFstMC4wMDU5OSwgMC42MDYsIDAsIDBdLFxuICAgICAgICBcIjg3NDFcIjogWy0wLjAwNTk5LCAwLjYwNiwgMCwgMF0sXG4gICAgICAgIFwiODc0N1wiOiBbMC4zMDYxMiwgMC44MDUsIDAuMTk0NDUsIDBdLFxuICAgICAgICBcIjg3NDhcIjogWzAuMzA2LCAwLjgwNSwgMC4xOTQ0NSwgMF0sXG4gICAgICAgIFwiODc0OVwiOiBbMC4zMDYsIDAuODA1LCAwLjE5NDQ1LCAwXSxcbiAgICAgICAgXCI4NzUwXCI6IFswLjMwNjEyLCAwLjgwNSwgMC4xOTQ0NSwgMF0sXG4gICAgICAgIFwiODg5NlwiOiBbMC4yNTAwMSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODg5N1wiOiBbMC4yNTAwMSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODg5OFwiOiBbMC4yNTAwMSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODg5OVwiOiBbMC4yNTAwMSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiODk2OFwiOiBbMC4zNTAwMSwgMC44NSwgMCwgMF0sXG4gICAgICAgIFwiODk2OVwiOiBbMC4zNTAwMSwgMC44NSwgMCwgMF0sXG4gICAgICAgIFwiODk3MFwiOiBbMC4zNTAwMSwgMC44NSwgMCwgMF0sXG4gICAgICAgIFwiODk3MVwiOiBbMC4zNTAwMSwgMC44NSwgMCwgMF0sXG4gICAgICAgIFwiOTE2OFwiOiBbLTAuMDAwOTksIDAuNjAxLCAwLCAwXSxcbiAgICAgICAgXCIxMDIxNlwiOiBbMC4zNTAwMSwgMC44NSwgMCwgMF0sXG4gICAgICAgIFwiMTAyMTdcIjogWzAuMzUwMDEsIDAuODUsIDAsIDBdLFxuICAgICAgICBcIjEwNzUyXCI6IFswLjI1MDAxLCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCIxMDc1M1wiOiBbMC4yNTAwMSwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiMTA3NTRcIjogWzAuMjUwMDEsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjEwNzU2XCI6IFswLjI1MDAxLCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCIxMDc1OFwiOiBbMC4yNTAwMSwgMC43NSwgMCwgMF0sXG4gICAgfSxcbiAgICBcIlNpemUyLVJlZ3VsYXJcIjoge1xuICAgICAgICBcIjQwXCI6IFswLjY1MDAyLCAxLjE1LCAwLCAwXSxcbiAgICAgICAgXCI0MVwiOiBbMC42NTAwMiwgMS4xNSwgMCwgMF0sXG4gICAgICAgIFwiNDdcIjogWzAuNjUwMDIsIDEuMTUsIDAsIDBdLFxuICAgICAgICBcIjkxXCI6IFswLjY1MDAyLCAxLjE1LCAwLCAwXSxcbiAgICAgICAgXCI5MlwiOiBbMC42NTAwMiwgMS4xNSwgMCwgMF0sXG4gICAgICAgIFwiOTNcIjogWzAuNjUwMDIsIDEuMTUsIDAsIDBdLFxuICAgICAgICBcIjEyM1wiOiBbMC42NTAwMiwgMS4xNSwgMCwgMF0sXG4gICAgICAgIFwiMTI1XCI6IFswLjY1MDAyLCAxLjE1LCAwLCAwXSxcbiAgICAgICAgXCI3MTBcIjogWzAsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjczMlwiOiBbMCwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiNzcwXCI6IFswLCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI3NzFcIjogWzAsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjg3MTlcIjogWzAuNTUwMDEsIDEuMDUsIDAsIDBdLFxuICAgICAgICBcIjg3MjBcIjogWzAuNTUwMDEsIDEuMDUsIDAsIDBdLFxuICAgICAgICBcIjg3MjFcIjogWzAuNTUwMDEsIDEuMDUsIDAsIDBdLFxuICAgICAgICBcIjg3MzBcIjogWzAuNjUwMDIsIDEuMTUsIDAsIDBdLFxuICAgICAgICBcIjg3NDdcIjogWzAuODYyMjUsIDEuMzYsIDAuNDQ0NDUsIDBdLFxuICAgICAgICBcIjg3NDhcIjogWzAuODYyLCAxLjM2LCAwLjQ0NDQ1LCAwXSxcbiAgICAgICAgXCI4NzQ5XCI6IFswLjg2MiwgMS4zNiwgMC40NDQ0NSwgMF0sXG4gICAgICAgIFwiODc1MFwiOiBbMC44NjIyNSwgMS4zNiwgMC40NDQ0NSwgMF0sXG4gICAgICAgIFwiODg5NlwiOiBbMC41NTAwMSwgMS4wNSwgMCwgMF0sXG4gICAgICAgIFwiODg5N1wiOiBbMC41NTAwMSwgMS4wNSwgMCwgMF0sXG4gICAgICAgIFwiODg5OFwiOiBbMC41NTAwMSwgMS4wNSwgMCwgMF0sXG4gICAgICAgIFwiODg5OVwiOiBbMC41NTAwMSwgMS4wNSwgMCwgMF0sXG4gICAgICAgIFwiODk2OFwiOiBbMC42NTAwMiwgMS4xNSwgMCwgMF0sXG4gICAgICAgIFwiODk2OVwiOiBbMC42NTAwMiwgMS4xNSwgMCwgMF0sXG4gICAgICAgIFwiODk3MFwiOiBbMC42NTAwMiwgMS4xNSwgMCwgMF0sXG4gICAgICAgIFwiODk3MVwiOiBbMC42NTAwMiwgMS4xNSwgMCwgMF0sXG4gICAgICAgIFwiMTAyMTZcIjogWzAuNjUwMDIsIDEuMTUsIDAsIDBdLFxuICAgICAgICBcIjEwMjE3XCI6IFswLjY1MDAyLCAxLjE1LCAwLCAwXSxcbiAgICAgICAgXCIxMDc1MlwiOiBbMC41NTAwMSwgMS4wNSwgMCwgMF0sXG4gICAgICAgIFwiMTA3NTNcIjogWzAuNTUwMDEsIDEuMDUsIDAsIDBdLFxuICAgICAgICBcIjEwNzU0XCI6IFswLjU1MDAxLCAxLjA1LCAwLCAwXSxcbiAgICAgICAgXCIxMDc1NlwiOiBbMC41NTAwMSwgMS4wNSwgMCwgMF0sXG4gICAgICAgIFwiMTA3NThcIjogWzAuNTUwMDEsIDEuMDUsIDAsIDBdLFxuICAgIH0sXG4gICAgXCJTaXplMy1SZWd1bGFyXCI6IHtcbiAgICAgICAgXCI0MFwiOiBbMC45NTAwMywgMS40NSwgMCwgMF0sXG4gICAgICAgIFwiNDFcIjogWzAuOTUwMDMsIDEuNDUsIDAsIDBdLFxuICAgICAgICBcIjQ3XCI6IFswLjk1MDAzLCAxLjQ1LCAwLCAwXSxcbiAgICAgICAgXCI5MVwiOiBbMC45NTAwMywgMS40NSwgMCwgMF0sXG4gICAgICAgIFwiOTJcIjogWzAuOTUwMDMsIDEuNDUsIDAsIDBdLFxuICAgICAgICBcIjkzXCI6IFswLjk1MDAzLCAxLjQ1LCAwLCAwXSxcbiAgICAgICAgXCIxMjNcIjogWzAuOTUwMDMsIDEuNDUsIDAsIDBdLFxuICAgICAgICBcIjEyNVwiOiBbMC45NTAwMywgMS40NSwgMCwgMF0sXG4gICAgICAgIFwiNzEwXCI6IFswLCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI3MzJcIjogWzAsIDAuNzUsIDAsIDBdLFxuICAgICAgICBcIjc3MFwiOiBbMCwgMC43NSwgMCwgMF0sXG4gICAgICAgIFwiNzcxXCI6IFswLCAwLjc1LCAwLCAwXSxcbiAgICAgICAgXCI4NzMwXCI6IFswLjk1MDAzLCAxLjQ1LCAwLCAwXSxcbiAgICAgICAgXCI4OTY4XCI6IFswLjk1MDAzLCAxLjQ1LCAwLCAwXSxcbiAgICAgICAgXCI4OTY5XCI6IFswLjk1MDAzLCAxLjQ1LCAwLCAwXSxcbiAgICAgICAgXCI4OTcwXCI6IFswLjk1MDAzLCAxLjQ1LCAwLCAwXSxcbiAgICAgICAgXCI4OTcxXCI6IFswLjk1MDAzLCAxLjQ1LCAwLCAwXSxcbiAgICAgICAgXCIxMDIxNlwiOiBbMC45NTAwMywgMS40NSwgMCwgMF0sXG4gICAgICAgIFwiMTAyMTdcIjogWzAuOTUwMDMsIDEuNDUsIDAsIDBdLFxuICAgIH0sXG4gICAgXCJTaXplNC1SZWd1bGFyXCI6IHtcbiAgICAgICAgXCI0MFwiOiBbMS4yNTAwMywgMS43NSwgMCwgMF0sXG4gICAgICAgIFwiNDFcIjogWzEuMjUwMDMsIDEuNzUsIDAsIDBdLFxuICAgICAgICBcIjQ3XCI6IFsxLjI1MDAzLCAxLjc1LCAwLCAwXSxcbiAgICAgICAgXCI5MVwiOiBbMS4yNTAwMywgMS43NSwgMCwgMF0sXG4gICAgICAgIFwiOTJcIjogWzEuMjUwMDMsIDEuNzUsIDAsIDBdLFxuICAgICAgICBcIjkzXCI6IFsxLjI1MDAzLCAxLjc1LCAwLCAwXSxcbiAgICAgICAgXCIxMjNcIjogWzEuMjUwMDMsIDEuNzUsIDAsIDBdLFxuICAgICAgICBcIjEyNVwiOiBbMS4yNTAwMywgMS43NSwgMCwgMF0sXG4gICAgICAgIFwiNzEwXCI6IFswLCAwLjgyNSwgMCwgMF0sXG4gICAgICAgIFwiNzMyXCI6IFswLCAwLjgyNSwgMCwgMF0sXG4gICAgICAgIFwiNzcwXCI6IFswLCAwLjgyNSwgMCwgMF0sXG4gICAgICAgIFwiNzcxXCI6IFswLCAwLjgyNSwgMCwgMF0sXG4gICAgICAgIFwiODczMFwiOiBbMS4yNTAwMywgMS43NSwgMCwgMF0sXG4gICAgICAgIFwiODk2OFwiOiBbMS4yNTAwMywgMS43NSwgMCwgMF0sXG4gICAgICAgIFwiODk2OVwiOiBbMS4yNTAwMywgMS43NSwgMCwgMF0sXG4gICAgICAgIFwiODk3MFwiOiBbMS4yNTAwMywgMS43NSwgMCwgMF0sXG4gICAgICAgIFwiODk3MVwiOiBbMS4yNTAwMywgMS43NSwgMCwgMF0sXG4gICAgICAgIFwiOTExNVwiOiBbMC42NDUwMiwgMS4xNTUsIDAsIDBdLFxuICAgICAgICBcIjkxMTZcIjogWzFlLTA1LCAwLjYsIDAsIDBdLFxuICAgICAgICBcIjkxMTdcIjogWzAuNjQ1MDIsIDEuMTU1LCAwLCAwXSxcbiAgICAgICAgXCI5MTE4XCI6IFswLjY0NTAyLCAxLjE1NSwgMCwgMF0sXG4gICAgICAgIFwiOTExOVwiOiBbMWUtMDUsIDAuNiwgMCwgMF0sXG4gICAgICAgIFwiOTEyMFwiOiBbMC42NDUwMiwgMS4xNTUsIDAsIDBdLFxuICAgICAgICBcIjkxMjFcIjogWzAuNjQ1MDIsIDEuMTU1LCAwLCAwXSxcbiAgICAgICAgXCI5MTIyXCI6IFstMC4wMDA5OSwgMC42MDEsIDAsIDBdLFxuICAgICAgICBcIjkxMjNcIjogWzAuNjQ1MDIsIDEuMTU1LCAwLCAwXSxcbiAgICAgICAgXCI5MTI0XCI6IFswLjY0NTAyLCAxLjE1NSwgMCwgMF0sXG4gICAgICAgIFwiOTEyNVwiOiBbLTAuMDAwOTksIDAuNjAxLCAwLCAwXSxcbiAgICAgICAgXCI5MTI2XCI6IFswLjY0NTAyLCAxLjE1NSwgMCwgMF0sXG4gICAgICAgIFwiOTEyN1wiOiBbMWUtMDUsIDAuOSwgMCwgMF0sXG4gICAgICAgIFwiOTEyOFwiOiBbMC42NTAwMiwgMS4xNSwgMCwgMF0sXG4gICAgICAgIFwiOTEyOVwiOiBbMC45MDAwMSwgMCwgMCwgMF0sXG4gICAgICAgIFwiOTEzMFwiOiBbMCwgMC4zLCAwLCAwXSxcbiAgICAgICAgXCI5MTMxXCI6IFsxZS0wNSwgMC45LCAwLCAwXSxcbiAgICAgICAgXCI5MTMyXCI6IFswLjY1MDAyLCAxLjE1LCAwLCAwXSxcbiAgICAgICAgXCI5MTMzXCI6IFswLjkwMDAxLCAwLCAwLCAwXSxcbiAgICAgICAgXCI5MTQzXCI6IFswLjg4NTAyLCAwLjkxNSwgMCwgMF0sXG4gICAgICAgIFwiMTAyMTZcIjogWzEuMjUwMDMsIDEuNzUsIDAsIDBdLFxuICAgICAgICBcIjEwMjE3XCI6IFsxLjI1MDAzLCAxLjc1LCAwLCAwXSxcbiAgICAgICAgXCI1NzM0NFwiOiBbLTAuMDA0OTksIDAuNjA1LCAwLCAwXSxcbiAgICAgICAgXCI1NzM0NVwiOiBbLTAuMDA0OTksIDAuNjA1LCAwLCAwXSxcbiAgICAgICAgXCI1NzY4MFwiOiBbMCwgMC4xMiwgMCwgMF0sXG4gICAgICAgIFwiNTc2ODFcIjogWzAsIDAuMTIsIDAsIDBdLFxuICAgICAgICBcIjU3NjgyXCI6IFswLCAwLjEyLCAwLCAwXSxcbiAgICAgICAgXCI1NzY4M1wiOiBbMCwgMC4xMiwgMCwgMF0sXG4gICAgfSxcbiAgICBcIlR5cGV3cml0ZXItUmVndWxhclwiOiB7XG4gICAgICAgIFwiMzNcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjM0XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCIzNVwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiMzZcIjogWzAuMDgzMzMsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjM3XCI6IFswLjA4MzMzLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIzOFwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiMzlcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjQwXCI6IFswLjA4MzMzLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI0MVwiOiBbMC4wODMzMywgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiNDJcIjogWzAsIDAuNTIwODMsIDAsIDBdLFxuICAgICAgICBcIjQzXCI6IFstMC4wODA1NiwgMC41MzA1NSwgMCwgMF0sXG4gICAgICAgIFwiNDRcIjogWzAuMTM4ODksIDAuMTI1LCAwLCAwXSxcbiAgICAgICAgXCI0NVwiOiBbLTAuMDgwNTYsIDAuNTMwNTUsIDAsIDBdLFxuICAgICAgICBcIjQ2XCI6IFswLCAwLjEyNSwgMCwgMF0sXG4gICAgICAgIFwiNDdcIjogWzAuMDgzMzMsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjQ4XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI0OVwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiNTBcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjUxXCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI1MlwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiNTNcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjU0XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI1NVwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiNTZcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjU3XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI1OFwiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiNTlcIjogWzAuMTM4ODksIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjYwXCI6IFstMC4wNTU1NiwgMC41NTU1NiwgMCwgMF0sXG4gICAgICAgIFwiNjFcIjogWy0wLjE5NTQ5LCAwLjQxNTYyLCAwLCAwXSxcbiAgICAgICAgXCI2MlwiOiBbLTAuMDU1NTYsIDAuNTU1NTYsIDAsIDBdLFxuICAgICAgICBcIjYzXCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI2NFwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiNjVcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjY2XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI2N1wiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiNjhcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjY5XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI3MFwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiNzFcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjcyXCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI3M1wiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiNzRcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjc1XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI3NlwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiNzdcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjc4XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI3OVwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiODBcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjgxXCI6IFswLjEzODg5LCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI4MlwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiODNcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjg0XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI4NVwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiODZcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjg3XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI4OFwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiODlcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjkwXCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI5MVwiOiBbMC4wODMzMywgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiOTJcIjogWzAuMDgzMzMsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjkzXCI6IFswLjA4MzMzLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCI5NFwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiOTVcIjogWzAuMDk1MTQsIDAsIDAsIDBdLFxuICAgICAgICBcIjk2XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI5N1wiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiOThcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjk5XCI6IFswLCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCIxMDBcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjEwMVwiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiMTAyXCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCIxMDNcIjogWzAuMjIyMjIsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjEwNFwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiMTA1XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCIxMDZcIjogWzAuMjIyMjIsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjEwN1wiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiMTA4XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCIxMDlcIjogWzAsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjExMFwiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiMTExXCI6IFswLCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCIxMTJcIjogWzAuMjIyMjIsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjExM1wiOiBbMC4yMjIyMiwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiMTE0XCI6IFswLCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCIxMTVcIjogWzAsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjExNlwiOiBbMCwgMC41NTM1OCwgMCwgMF0sXG4gICAgICAgIFwiMTE3XCI6IFswLCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCIxMThcIjogWzAsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjExOVwiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiMTIwXCI6IFswLCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCIxMjFcIjogWzAuMjIyMjIsIDAuNDMwNTYsIDAsIDBdLFxuICAgICAgICBcIjEyMlwiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiMTIzXCI6IFswLjA4MzMzLCAwLjY5NDQ0LCAwLCAwXSxcbiAgICAgICAgXCIxMjRcIjogWzAuMDgzMzMsIDAuNjk0NDQsIDAsIDBdLFxuICAgICAgICBcIjEyNVwiOiBbMC4wODMzMywgMC42OTQ0NCwgMCwgMF0sXG4gICAgICAgIFwiMTI2XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCIxMjdcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjMwNVwiOiBbMCwgMC40MzA1NiwgMCwgMF0sXG4gICAgICAgIFwiNTY3XCI6IFswLjIyMjIyLCAwLjQzMDU2LCAwLCAwXSxcbiAgICAgICAgXCI3NjhcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjc2OVwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiNzcwXCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI3NzFcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjc3MlwiOiBbMCwgMC41NjU1NSwgMCwgMF0sXG4gICAgICAgIFwiNzc0XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI3NzZcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjc3OFwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiNzgwXCI6IFswLCAwLjU2NTk3LCAwLCAwXSxcbiAgICAgICAgXCI5MTVcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjkxNlwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiOTIwXCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI5MjNcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjkyNlwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiOTI4XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI5MzFcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjkzM1wiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiOTM0XCI6IFswLCAwLjYxMTExLCAwLCAwXSxcbiAgICAgICAgXCI5MzZcIjogWzAsIDAuNjExMTEsIDAsIDBdLFxuICAgICAgICBcIjkzN1wiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiMjAxOFwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiMjAxOVwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgICAgIFwiODI0MlwiOiBbMCwgMC42MTExMSwgMCwgMF0sXG4gICAgfSxcbn07XG4iLCJ2YXIgdXRpbHMgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbnZhciBQYXJzZUVycm9yID0gcmVxdWlyZShcIi4vUGFyc2VFcnJvclwiKTtcblxuLyogVGhpcyBmaWxlIGNvbnRhaW5zIGEgbGlzdCBvZiBmdW5jdGlvbnMgdGhhdCB3ZSBwYXJzZSwgaWRlbnRpZmllZCBieVxuICogdGhlIGNhbGxzIHRvIGRlZmluZUZ1bmN0aW9uLlxuICpcbiAqIFRoZSBmaXJzdCBhcmd1bWVudCB0byBkZWZpbmVGdW5jdGlvbiBpcyBhIHNpbmdsZSBuYW1lIG9yIGEgbGlzdCBvZiBuYW1lcy5cbiAqIEFsbCBmdW5jdGlvbnMgbmFtZWQgaW4gc3VjaCBhIGxpc3Qgd2lsbCBzaGFyZSBhIHNpbmdsZSBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBFYWNoIGRlY2xhcmVkIGZ1bmN0aW9uIGNhbiBoYXZlIGFzc29jaWF0ZWQgcHJvcGVydGllcywgd2hpY2hcbiAqIGluY2x1ZGUgdGhlIGZvbGxvd2luZzpcbiAqXG4gKiAgLSBudW1BcmdzOiBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0aGUgZnVuY3Rpb24gdGFrZXMuXG4gKiAgICAgICAgICAgICBJZiB0aGlzIGlzIHRoZSBvbmx5IHByb3BlcnR5LCBpdCBjYW4gYmUgcGFzc2VkIGFzIGEgbnVtYmVyXG4gKiAgICAgICAgICAgICBpbnN0ZWFkIG9mIGFuIGVsZW1lbnQgb2YgYSBwcm9wZXJ0aWVzIG9iamVjdC5cbiAqICAtIGFyZ1R5cGVzOiAob3B0aW9uYWwpIEFuIGFycmF5IGNvcnJlc3BvbmRpbmcgdG8gZWFjaCBhcmd1bWVudCBvZiB0aGVcbiAqICAgICAgICAgICAgICBmdW5jdGlvbiwgZ2l2aW5nIHRoZSB0eXBlIG9mIGFyZ3VtZW50IHRoYXQgc2hvdWxkIGJlIHBhcnNlZC4gSXRzXG4gKiAgICAgICAgICAgICAgbGVuZ3RoIHNob3VsZCBiZSBlcXVhbCB0byBgbnVtQXJncyArIG51bU9wdGlvbmFsQXJnc2AuIFZhbGlkXG4gKiAgICAgICAgICAgICAgdHlwZXM6XG4gKiAgICAgICAgICAgICAgIC0gXCJzaXplXCI6IEEgc2l6ZS1saWtlIHRoaW5nLCBzdWNoIGFzIFwiMWVtXCIgb3IgXCI1ZXhcIlxuICogICAgICAgICAgICAgICAtIFwiY29sb3JcIjogQW4gaHRtbCBjb2xvciwgbGlrZSBcIiNhYmNcIiBvciBcImJsdWVcIlxuICogICAgICAgICAgICAgICAtIFwib3JpZ2luYWxcIjogVGhlIHNhbWUgdHlwZSBhcyB0aGUgZW52aXJvbm1lbnQgdGhhdCB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBiZWluZyBwYXJzZWQgaXMgaW4gKGUuZy4gdXNlZCBmb3IgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9kaWVzIG9mIGZ1bmN0aW9ucyBsaWtlIFxcY29sb3Igd2hlcmUgdGhlIGZpcnN0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJndW1lbnQgaXMgc3BlY2lhbCBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCBpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZCBub3JtYWxseSlcbiAqICAgICAgICAgICAgICBPdGhlciBwb3NzaWJsZSB0eXBlcyAocHJvYmFibHkgc2hvdWxkbid0IGJlIHVzZWQpXG4gKiAgICAgICAgICAgICAgIC0gXCJ0ZXh0XCI6IFRleHQtbGlrZSAoZS5nLiBcXHRleHQpXG4gKiAgICAgICAgICAgICAgIC0gXCJtYXRoXCI6IE5vcm1hbCBtYXRoXG4gKiAgICAgICAgICAgICAgSWYgdW5kZWZpbmVkLCB0aGlzIHdpbGwgYmUgdHJlYXRlZCBhcyBhbiBhcHByb3ByaWF0ZSBsZW5ndGhcbiAqICAgICAgICAgICAgICBhcnJheSBvZiBcIm9yaWdpbmFsXCIgc3RyaW5nc1xuICogIC0gZ3JlZWRpbmVzczogKG9wdGlvbmFsKSBUaGUgZ3JlZWRpbmVzcyBvZiB0aGUgZnVuY3Rpb24gdG8gdXNlIHVuZ3JvdXBlZFxuICogICAgICAgICAgICAgICAgYXJndW1lbnRzLlxuICpcbiAqICAgICAgICAgICAgICAgIEUuZy4gaWYgeW91IGhhdmUgYW4gZXhwcmVzc2lvblxuICogICAgICAgICAgICAgICAgICBcXHNxcnQgXFxmcmFjIDEgMlxuICogICAgICAgICAgICAgICAgc2luY2UgXFxmcmFjIGhhcyBncmVlZGluZXNzPTIgdnMgXFxzcXJ0J3MgZ3JlZWRpbmVzcz0xLCBcXGZyYWNcbiAqICAgICAgICAgICAgICAgIHdpbGwgdXNlIHRoZSB0d28gYXJndW1lbnRzICcxJyBhbmQgJzInIGFzIGl0cyB0d28gYXJndW1lbnRzLFxuICogICAgICAgICAgICAgICAgdGhlbiB0aGF0IHdob2xlIGZ1bmN0aW9uIHdpbGwgYmUgdXNlZCBhcyB0aGUgYXJndW1lbnQgdG9cbiAqICAgICAgICAgICAgICAgIFxcc3FydC4gT24gdGhlIG90aGVyIGhhbmQsIHRoZSBleHByZXNzaW9uc1xuICogICAgICAgICAgICAgICAgICBcXGZyYWMgXFxmcmFjIDEgMiAzXG4gKiAgICAgICAgICAgICAgICBhbmRcbiAqICAgICAgICAgICAgICAgICAgXFxmcmFjIFxcc3FydCAxIDJcbiAqICAgICAgICAgICAgICAgIHdpbGwgZmFpbCBiZWNhdXNlIFxcZnJhYyBhbmQgXFxmcmFjIGhhdmUgZXF1YWwgZ3JlZWRpbmVzc1xuICogICAgICAgICAgICAgICAgYW5kIFxcc3FydCBoYXMgYSBsb3dlciBncmVlZGluZXNzIHRoYW4gXFxmcmFjIHJlc3BlY3RpdmVseS4gVG9cbiAqICAgICAgICAgICAgICAgIG1ha2UgdGhlc2UgcGFyc2UsIHdlIHdvdWxkIGhhdmUgdG8gY2hhbmdlIHRoZW0gdG86XG4gKiAgICAgICAgICAgICAgICAgIFxcZnJhYyB7XFxmcmFjIDEgMn0gM1xuICogICAgICAgICAgICAgICAgYW5kXG4gKiAgICAgICAgICAgICAgICAgIFxcZnJhYyB7XFxzcXJ0IDF9IDJcbiAqXG4gKiAgICAgICAgICAgICAgICBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBgMWBcbiAqICAtIGFsbG93ZWRJblRleHQ6IChvcHRpb25hbCkgV2hldGhlciBvciBub3QgdGhlIGZ1bmN0aW9uIGlzIGFsbG93ZWQgaW5zaWRlXG4gKiAgICAgICAgICAgICAgICAgICB0ZXh0IG1vZGUgKGRlZmF1bHQgZmFsc2UpXG4gKiAgLSBudW1PcHRpb25hbEFyZ3M6IChvcHRpb25hbCkgVGhlIG51bWJlciBvZiBvcHRpb25hbCBhcmd1bWVudHMgdGhlIGZ1bmN0aW9uXG4gKiAgICAgICAgICAgICAgICAgICAgIHNob3VsZCBwYXJzZS4gSWYgdGhlIG9wdGlvbmFsIGFyZ3VtZW50cyBhcmVuJ3QgZm91bmQsXG4gKiAgICAgICAgICAgICAgICAgICAgIGBudWxsYCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgaGFuZGxlciBpbiB0aGVpciBwbGFjZS5cbiAqICAgICAgICAgICAgICAgICAgICAgKGRlZmF1bHQgMClcbiAqXG4gKiBUaGUgbGFzdCBhcmd1bWVudCBpcyB0aGF0IGltcGxlbWVudGF0aW9uLCB0aGUgaGFuZGxlciBmb3IgdGhlIGZ1bmN0aW9uKHMpLlxuICogSXQgaXMgY2FsbGVkIHRvIGhhbmRsZSB0aGVzZSBmdW5jdGlvbnMgYW5kIHRoZWlyIGFyZ3VtZW50cy5cbiAqIEl0IHJlY2VpdmVzIHR3byBhcmd1bWVudHM6XG4gKiAgLSBjb250ZXh0IGNvbnRhaW5zIGluZm9ybWF0aW9uIGFuZCByZWZlcmVuY2VzIHByb3ZpZGVkIGJ5IHRoZSBwYXJzZXJcbiAqICAtIGFyZ3MgaXMgYW4gYXJyYXkgb2YgYXJndW1lbnRzIG9idGFpbmVkIGZyb20gVGVYIGlucHV0XG4gKiBUaGUgY29udGV4dCBjb250YWlucyB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiAgLSBmdW5jTmFtZTogdGhlIHRleHQgKGkuZS4gbmFtZSkgb2YgdGhlIGZ1bmN0aW9uLCBpbmNsdWRpbmcgXFxcbiAqICAtIHBhcnNlcjogdGhlIHBhcnNlciBvYmplY3RcbiAqICAtIGxleGVyOiB0aGUgbGV4ZXIgb2JqZWN0XG4gKiAgLSBwb3NpdGlvbnM6IHRoZSBwb3NpdGlvbnMgaW4gdGhlIG92ZXJhbGwgc3RyaW5nIG9mIHRoZSBmdW5jdGlvblxuICogICAgICAgICAgICAgICBhbmQgdGhlIGFyZ3VtZW50cy5cbiAqIFRoZSBsYXR0ZXIgdGhyZWUgc2hvdWxkIG9ubHkgYmUgdXNlZCB0byBwcm9kdWNlIGVycm9yIG1lc3NhZ2VzLlxuICpcbiAqIFRoZSBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcga2V5czpcbiAqICAtIHR5cGU6IFRoZSB0eXBlIG9mIGVsZW1lbnQgdGhhdCB0aGlzIGlzLiBUaGlzIGlzIHRoZW4gdXNlZCBpblxuICogICAgICAgICAgYnVpbGRIVE1ML2J1aWxkTWF0aE1MIHRvIGRldGVybWluZSB3aGljaCBmdW5jdGlvblxuICogICAgICAgICAgc2hvdWxkIGJlIGNhbGxlZCB0byBidWlsZCB0aGlzIG5vZGUgaW50byBhIERPTSBub2RlXG4gKiBBbnkgb3RoZXIgZGF0YSBjYW4gYmUgYWRkZWQgdG8gdGhlIG9iamVjdCwgd2hpY2ggd2lsbCBiZSBwYXNzZWRcbiAqIGluIHRvIHRoZSBmdW5jdGlvbiBpbiBidWlsZEhUTUwvYnVpbGRNYXRoTUwgYXMgYGdyb3VwLnZhbHVlYC5cbiAqL1xuXG5mdW5jdGlvbiBkZWZpbmVGdW5jdGlvbihuYW1lcywgcHJvcHMsIGhhbmRsZXIpIHtcbiAgICBpZiAodHlwZW9mIG5hbWVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIG5hbWVzID0gW25hbWVzXTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwcm9wcyA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICBwcm9wcyA9IHsgbnVtQXJnczogcHJvcHMgfTtcbiAgICB9XG4gICAgLy8gU2V0IGRlZmF1bHQgdmFsdWVzIG9mIGZ1bmN0aW9uc1xuICAgIHZhciBkYXRhID0ge1xuICAgICAgICBudW1BcmdzOiBwcm9wcy5udW1BcmdzLFxuICAgICAgICBhcmdUeXBlczogcHJvcHMuYXJnVHlwZXMsXG4gICAgICAgIGdyZWVkaW5lc3M6IChwcm9wcy5ncmVlZGluZXNzID09PSB1bmRlZmluZWQpID8gMSA6IHByb3BzLmdyZWVkaW5lc3MsXG4gICAgICAgIGFsbG93ZWRJblRleHQ6ICEhcHJvcHMuYWxsb3dlZEluVGV4dCxcbiAgICAgICAgbnVtT3B0aW9uYWxBcmdzOiBwcm9wcy5udW1PcHRpb25hbEFyZ3MgfHwgMCxcbiAgICAgICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICB9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHNbbmFtZXNbaV1dID0gZGF0YTtcbiAgICB9XG59XG5cbi8vIEEgbm9ybWFsIHNxdWFyZSByb290XG5kZWZpbmVGdW5jdGlvbihcIlxcXFxzcXJ0XCIsIHtcbiAgICBudW1BcmdzOiAxLFxuICAgIG51bU9wdGlvbmFsQXJnczogMSxcbn0sIGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgaW5kZXggPSBhcmdzWzBdO1xuICAgIHZhciBib2R5ID0gYXJnc1sxXTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcInNxcnRcIixcbiAgICAgICAgYm9keTogYm9keSxcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgIH07XG59KTtcblxuLy8gU29tZSBub24tbWF0aHkgdGV4dFxuZGVmaW5lRnVuY3Rpb24oXCJcXFxcdGV4dFwiLCB7XG4gICAgbnVtQXJnczogMSxcbiAgICBhcmdUeXBlczogW1widGV4dFwiXSxcbiAgICBncmVlZGluZXNzOiAyLFxufSwgZnVuY3Rpb24oY29udGV4dCwgYXJncykge1xuICAgIHZhciBib2R5ID0gYXJnc1swXTtcbiAgICAvLyBTaW5jZSB0aGUgY29ycmVzcG9uZGluZyBidWlsZEhUTUwvYnVpbGRNYXRoTUwgZnVuY3Rpb24gZXhwZWN0cyBhXG4gICAgLy8gbGlzdCBvZiBlbGVtZW50cywgd2Ugbm9ybWFsaXplIGZvciBkaWZmZXJlbnQga2luZHMgb2YgYXJndW1lbnRzXG4gICAgLy8gVE9ETyhlbWlseSk6IG1heWJlIHRoaXMgc2hvdWxkIGJlIGRvbmUgc29tZXdoZXJlIGVsc2VcbiAgICB2YXIgaW5uZXI7XG4gICAgaWYgKGJvZHkudHlwZSA9PT0gXCJvcmRncm91cFwiKSB7XG4gICAgICAgIGlubmVyID0gYm9keS52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpbm5lciA9IFtib2R5XTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgYm9keTogaW5uZXIsXG4gICAgfTtcbn0pO1xuXG4vLyBBIHR3by1hcmd1bWVudCBjdXN0b20gY29sb3JcbmRlZmluZUZ1bmN0aW9uKFwiXFxcXGNvbG9yXCIsIHtcbiAgICBudW1BcmdzOiAyLFxuICAgIGFsbG93ZWRJblRleHQ6IHRydWUsXG4gICAgZ3JlZWRpbmVzczogMyxcbiAgICBhcmdUeXBlczogW1wiY29sb3JcIiwgXCJvcmlnaW5hbFwiXSxcbn0sIGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgY29sb3IgPSBhcmdzWzBdO1xuICAgIHZhciBib2R5ID0gYXJnc1sxXTtcbiAgICAvLyBOb3JtYWxpemUgdGhlIGRpZmZlcmVudCBraW5kcyBvZiBib2RpZXMgKHNlZSBcXHRleHQgYWJvdmUpXG4gICAgdmFyIGlubmVyO1xuICAgIGlmIChib2R5LnR5cGUgPT09IFwib3JkZ3JvdXBcIikge1xuICAgICAgICBpbm5lciA9IGJvZHkudmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaW5uZXIgPSBbYm9keV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJjb2xvclwiLFxuICAgICAgICBjb2xvcjogY29sb3IudmFsdWUsXG4gICAgICAgIHZhbHVlOiBpbm5lcixcbiAgICB9O1xufSk7XG5cbi8vIEFuIG92ZXJsaW5lXG5kZWZpbmVGdW5jdGlvbihcIlxcXFxvdmVybGluZVwiLCB7XG4gICAgbnVtQXJnczogMSxcbn0sIGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgYm9keSA9IGFyZ3NbMF07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJvdmVybGluZVwiLFxuICAgICAgICBib2R5OiBib2R5LFxuICAgIH07XG59KTtcblxuLy8gQW4gdW5kZXJsaW5lXG5kZWZpbmVGdW5jdGlvbihcIlxcXFx1bmRlcmxpbmVcIiwge1xuICAgIG51bUFyZ3M6IDEsXG59LCBmdW5jdGlvbihjb250ZXh0LCBhcmdzKSB7XG4gICAgdmFyIGJvZHkgPSBhcmdzWzBdO1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwidW5kZXJsaW5lXCIsXG4gICAgICAgIGJvZHk6IGJvZHksXG4gICAgfTtcbn0pO1xuXG4vLyBBIGJveCBvZiB0aGUgd2lkdGggYW5kIGhlaWdodFxuZGVmaW5lRnVuY3Rpb24oXCJcXFxccnVsZVwiLCB7XG4gICAgbnVtQXJnczogMixcbiAgICBudW1PcHRpb25hbEFyZ3M6IDEsXG4gICAgYXJnVHlwZXM6IFtcInNpemVcIiwgXCJzaXplXCIsIFwic2l6ZVwiXSxcbn0sIGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgc2hpZnQgPSBhcmdzWzBdO1xuICAgIHZhciB3aWR0aCA9IGFyZ3NbMV07XG4gICAgdmFyIGhlaWdodCA9IGFyZ3NbMl07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJydWxlXCIsXG4gICAgICAgIHNoaWZ0OiBzaGlmdCAmJiBzaGlmdC52YWx1ZSxcbiAgICAgICAgd2lkdGg6IHdpZHRoLnZhbHVlLFxuICAgICAgICBoZWlnaHQ6IGhlaWdodC52YWx1ZSxcbiAgICB9O1xufSk7XG5cbi8vIEEgS2FUZVggbG9nb1xuZGVmaW5lRnVuY3Rpb24oXCJcXFxcS2FUZVhcIiwge1xuICAgIG51bUFyZ3M6IDAsXG59LCBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJrYXRleFwiLFxuICAgIH07XG59KTtcblxuZGVmaW5lRnVuY3Rpb24oXCJcXFxccGhhbnRvbVwiLCB7XG4gICAgbnVtQXJnczogMSxcbn0sIGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgYm9keSA9IGFyZ3NbMF07XG4gICAgdmFyIGlubmVyO1xuICAgIGlmIChib2R5LnR5cGUgPT09IFwib3JkZ3JvdXBcIikge1xuICAgICAgICBpbm5lciA9IGJvZHkudmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaW5uZXIgPSBbYm9keV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJwaGFudG9tXCIsXG4gICAgICAgIHZhbHVlOiBpbm5lcixcbiAgICB9O1xufSk7XG5cbi8vIEV4dHJhIGRhdGEgbmVlZGVkIGZvciB0aGUgZGVsaW1pdGVyIGhhbmRsZXIgZG93biBiZWxvd1xudmFyIGRlbGltaXRlclNpemVzID0ge1xuICAgIFwiXFxcXGJpZ2xcIiA6IHt0eXBlOiBcIm9wZW5cIiwgICAgc2l6ZTogMX0sXG4gICAgXCJcXFxcQmlnbFwiIDoge3R5cGU6IFwib3BlblwiLCAgICBzaXplOiAyfSxcbiAgICBcIlxcXFxiaWdnbFwiOiB7dHlwZTogXCJvcGVuXCIsICAgIHNpemU6IDN9LFxuICAgIFwiXFxcXEJpZ2dsXCI6IHt0eXBlOiBcIm9wZW5cIiwgICAgc2l6ZTogNH0sXG4gICAgXCJcXFxcYmlnclwiIDoge3R5cGU6IFwiY2xvc2VcIiwgICBzaXplOiAxfSxcbiAgICBcIlxcXFxCaWdyXCIgOiB7dHlwZTogXCJjbG9zZVwiLCAgIHNpemU6IDJ9LFxuICAgIFwiXFxcXGJpZ2dyXCI6IHt0eXBlOiBcImNsb3NlXCIsICAgc2l6ZTogM30sXG4gICAgXCJcXFxcQmlnZ3JcIjoge3R5cGU6IFwiY2xvc2VcIiwgICBzaXplOiA0fSxcbiAgICBcIlxcXFxiaWdtXCIgOiB7dHlwZTogXCJyZWxcIiwgICAgIHNpemU6IDF9LFxuICAgIFwiXFxcXEJpZ21cIiA6IHt0eXBlOiBcInJlbFwiLCAgICAgc2l6ZTogMn0sXG4gICAgXCJcXFxcYmlnZ21cIjoge3R5cGU6IFwicmVsXCIsICAgICBzaXplOiAzfSxcbiAgICBcIlxcXFxCaWdnbVwiOiB7dHlwZTogXCJyZWxcIiwgICAgIHNpemU6IDR9LFxuICAgIFwiXFxcXGJpZ1wiICA6IHt0eXBlOiBcInRleHRvcmRcIiwgc2l6ZTogMX0sXG4gICAgXCJcXFxcQmlnXCIgIDoge3R5cGU6IFwidGV4dG9yZFwiLCBzaXplOiAyfSxcbiAgICBcIlxcXFxiaWdnXCIgOiB7dHlwZTogXCJ0ZXh0b3JkXCIsIHNpemU6IDN9LFxuICAgIFwiXFxcXEJpZ2dcIiA6IHt0eXBlOiBcInRleHRvcmRcIiwgc2l6ZTogNH0sXG59O1xuXG52YXIgZGVsaW1pdGVycyA9IFtcbiAgICBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIlxcXFxsYnJhY2tcIiwgXCJdXCIsIFwiXFxcXHJicmFja1wiLFxuICAgIFwiXFxcXHtcIiwgXCJcXFxcbGJyYWNlXCIsIFwiXFxcXH1cIiwgXCJcXFxccmJyYWNlXCIsXG4gICAgXCJcXFxcbGZsb29yXCIsIFwiXFxcXHJmbG9vclwiLCBcIlxcXFxsY2VpbFwiLCBcIlxcXFxyY2VpbFwiLFxuICAgIFwiPFwiLCBcIj5cIiwgXCJcXFxcbGFuZ2xlXCIsIFwiXFxcXHJhbmdsZVwiLCBcIlxcXFxsdFwiLCBcIlxcXFxndFwiLFxuICAgIFwiXFxcXGx2ZXJ0XCIsIFwiXFxcXHJ2ZXJ0XCIsIFwiXFxcXGxWZXJ0XCIsIFwiXFxcXHJWZXJ0XCIsXG4gICAgXCJcXFxcbGdyb3VwXCIsIFwiXFxcXHJncm91cFwiLCBcIlxcXFxsbW91c3RhY2hlXCIsIFwiXFxcXHJtb3VzdGFjaGVcIixcbiAgICBcIi9cIiwgXCJcXFxcYmFja3NsYXNoXCIsXG4gICAgXCJ8XCIsIFwiXFxcXHZlcnRcIiwgXCJcXFxcfFwiLCBcIlxcXFxWZXJ0XCIsXG4gICAgXCJcXFxcdXBhcnJvd1wiLCBcIlxcXFxVcGFycm93XCIsXG4gICAgXCJcXFxcZG93bmFycm93XCIsIFwiXFxcXERvd25hcnJvd1wiLFxuICAgIFwiXFxcXHVwZG93bmFycm93XCIsIFwiXFxcXFVwZG93bmFycm93XCIsXG4gICAgXCIuXCIsXG5dO1xuXG52YXIgZm9udEFsaWFzZXMgPSB7XG4gICAgXCJcXFxcQmJiXCI6IFwiXFxcXG1hdGhiYlwiLFxuICAgIFwiXFxcXGJvbGRcIjogXCJcXFxcbWF0aGJmXCIsXG4gICAgXCJcXFxcZnJha1wiOiBcIlxcXFxtYXRoZnJha1wiLFxufTtcblxuLy8gU2luZ2xlLWFyZ3VtZW50IGNvbG9yIGZ1bmN0aW9uc1xuZGVmaW5lRnVuY3Rpb24oW1xuICAgIFwiXFxcXGJsdWVcIiwgXCJcXFxcb3JhbmdlXCIsIFwiXFxcXHBpbmtcIiwgXCJcXFxccmVkXCIsXG4gICAgXCJcXFxcZ3JlZW5cIiwgXCJcXFxcZ3JheVwiLCBcIlxcXFxwdXJwbGVcIixcbiAgICBcIlxcXFxibHVlQVwiLCBcIlxcXFxibHVlQlwiLCBcIlxcXFxibHVlQ1wiLCBcIlxcXFxibHVlRFwiLCBcIlxcXFxibHVlRVwiLFxuICAgIFwiXFxcXHRlYWxBXCIsIFwiXFxcXHRlYWxCXCIsIFwiXFxcXHRlYWxDXCIsIFwiXFxcXHRlYWxEXCIsIFwiXFxcXHRlYWxFXCIsXG4gICAgXCJcXFxcZ3JlZW5BXCIsIFwiXFxcXGdyZWVuQlwiLCBcIlxcXFxncmVlbkNcIiwgXCJcXFxcZ3JlZW5EXCIsIFwiXFxcXGdyZWVuRVwiLFxuICAgIFwiXFxcXGdvbGRBXCIsIFwiXFxcXGdvbGRCXCIsIFwiXFxcXGdvbGRDXCIsIFwiXFxcXGdvbGREXCIsIFwiXFxcXGdvbGRFXCIsXG4gICAgXCJcXFxccmVkQVwiLCBcIlxcXFxyZWRCXCIsIFwiXFxcXHJlZENcIiwgXCJcXFxccmVkRFwiLCBcIlxcXFxyZWRFXCIsXG4gICAgXCJcXFxcbWFyb29uQVwiLCBcIlxcXFxtYXJvb25CXCIsIFwiXFxcXG1hcm9vbkNcIiwgXCJcXFxcbWFyb29uRFwiLCBcIlxcXFxtYXJvb25FXCIsXG4gICAgXCJcXFxccHVycGxlQVwiLCBcIlxcXFxwdXJwbGVCXCIsIFwiXFxcXHB1cnBsZUNcIiwgXCJcXFxccHVycGxlRFwiLCBcIlxcXFxwdXJwbGVFXCIsXG4gICAgXCJcXFxcbWludEFcIiwgXCJcXFxcbWludEJcIiwgXCJcXFxcbWludENcIixcbiAgICBcIlxcXFxncmF5QVwiLCBcIlxcXFxncmF5QlwiLCBcIlxcXFxncmF5Q1wiLCBcIlxcXFxncmF5RFwiLCBcIlxcXFxncmF5RVwiLFxuICAgIFwiXFxcXGdyYXlGXCIsIFwiXFxcXGdyYXlHXCIsIFwiXFxcXGdyYXlIXCIsIFwiXFxcXGdyYXlJXCIsXG4gICAgXCJcXFxca2FCbHVlXCIsIFwiXFxcXGthR3JlZW5cIixcbl0sIHtcbiAgICBudW1BcmdzOiAxLFxuICAgIGFsbG93ZWRJblRleHQ6IHRydWUsXG4gICAgZ3JlZWRpbmVzczogMyxcbn0sIGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgYm9keSA9IGFyZ3NbMF07XG4gICAgdmFyIGF0b21zO1xuICAgIGlmIChib2R5LnR5cGUgPT09IFwib3JkZ3JvdXBcIikge1xuICAgICAgICBhdG9tcyA9IGJvZHkudmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXRvbXMgPSBbYm9keV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJjb2xvclwiLFxuICAgICAgICBjb2xvcjogXCJrYXRleC1cIiArIGNvbnRleHQuZnVuY05hbWUuc2xpY2UoMSksXG4gICAgICAgIHZhbHVlOiBhdG9tcyxcbiAgICB9O1xufSk7XG5cbi8vIFRoZXJlIGFyZSAyIGZsYWdzIGZvciBvcGVyYXRvcnM7IHdoZXRoZXIgdGhleSBwcm9kdWNlIGxpbWl0cyBpblxuLy8gZGlzcGxheXN0eWxlLCBhbmQgd2hldGhlciB0aGV5IGFyZSBzeW1ib2xzIGFuZCBzaG91bGQgZ3JvdyBpblxuLy8gZGlzcGxheXN0eWxlLiBUaGVzZSBmb3VyIGdyb3VwcyBjb3ZlciB0aGUgZm91ciBwb3NzaWJsZSBjaG9pY2VzLlxuXG4vLyBObyBsaW1pdHMsIG5vdCBzeW1ib2xzXG5kZWZpbmVGdW5jdGlvbihbXG4gICAgXCJcXFxcYXJjc2luXCIsIFwiXFxcXGFyY2Nvc1wiLCBcIlxcXFxhcmN0YW5cIiwgXCJcXFxcYXJnXCIsIFwiXFxcXGNvc1wiLCBcIlxcXFxjb3NoXCIsXG4gICAgXCJcXFxcY290XCIsIFwiXFxcXGNvdGhcIiwgXCJcXFxcY3NjXCIsIFwiXFxcXGRlZ1wiLCBcIlxcXFxkaW1cIiwgXCJcXFxcZXhwXCIsIFwiXFxcXGhvbVwiLFxuICAgIFwiXFxcXGtlclwiLCBcIlxcXFxsZ1wiLCBcIlxcXFxsblwiLCBcIlxcXFxsb2dcIiwgXCJcXFxcc2VjXCIsIFwiXFxcXHNpblwiLCBcIlxcXFxzaW5oXCIsXG4gICAgXCJcXFxcdGFuXCIsIFwiXFxcXHRhbmhcIixcbl0sIHtcbiAgICBudW1BcmdzOiAwLFxufSwgZnVuY3Rpb24oY29udGV4dCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwib3BcIixcbiAgICAgICAgbGltaXRzOiBmYWxzZSxcbiAgICAgICAgc3ltYm9sOiBmYWxzZSxcbiAgICAgICAgYm9keTogY29udGV4dC5mdW5jTmFtZSxcbiAgICB9O1xufSk7XG5cbi8vIExpbWl0cywgbm90IHN5bWJvbHNcbmRlZmluZUZ1bmN0aW9uKFtcbiAgICBcIlxcXFxkZXRcIiwgXCJcXFxcZ2NkXCIsIFwiXFxcXGluZlwiLCBcIlxcXFxsaW1cIiwgXCJcXFxcbGltaW5mXCIsIFwiXFxcXGxpbXN1cFwiLCBcIlxcXFxtYXhcIixcbiAgICBcIlxcXFxtaW5cIiwgXCJcXFxcUHJcIiwgXCJcXFxcc3VwXCIsXG5dLCB7XG4gICAgbnVtQXJnczogMCxcbn0sIGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIm9wXCIsXG4gICAgICAgIGxpbWl0czogdHJ1ZSxcbiAgICAgICAgc3ltYm9sOiBmYWxzZSxcbiAgICAgICAgYm9keTogY29udGV4dC5mdW5jTmFtZSxcbiAgICB9O1xufSk7XG5cbi8vIE5vIGxpbWl0cywgc3ltYm9sc1xuZGVmaW5lRnVuY3Rpb24oW1xuICAgIFwiXFxcXGludFwiLCBcIlxcXFxpaW50XCIsIFwiXFxcXGlpaW50XCIsIFwiXFxcXG9pbnRcIixcbl0sIHtcbiAgICBudW1BcmdzOiAwLFxufSwgZnVuY3Rpb24oY29udGV4dCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwib3BcIixcbiAgICAgICAgbGltaXRzOiBmYWxzZSxcbiAgICAgICAgc3ltYm9sOiB0cnVlLFxuICAgICAgICBib2R5OiBjb250ZXh0LmZ1bmNOYW1lLFxuICAgIH07XG59KTtcblxuLy8gTGltaXRzLCBzeW1ib2xzXG5kZWZpbmVGdW5jdGlvbihbXG4gICAgXCJcXFxcY29wcm9kXCIsIFwiXFxcXGJpZ3ZlZVwiLCBcIlxcXFxiaWd3ZWRnZVwiLCBcIlxcXFxiaWd1cGx1c1wiLCBcIlxcXFxiaWdjYXBcIixcbiAgICBcIlxcXFxiaWdjdXBcIiwgXCJcXFxcaW50b3BcIiwgXCJcXFxccHJvZFwiLCBcIlxcXFxzdW1cIiwgXCJcXFxcYmlnb3RpbWVzXCIsXG4gICAgXCJcXFxcYmlnb3BsdXNcIiwgXCJcXFxcYmlnb2RvdFwiLCBcIlxcXFxiaWdzcWN1cFwiLCBcIlxcXFxzbWFsbGludFwiLFxuXSwge1xuICAgIG51bUFyZ3M6IDAsXG59LCBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJvcFwiLFxuICAgICAgICBsaW1pdHM6IHRydWUsXG4gICAgICAgIHN5bWJvbDogdHJ1ZSxcbiAgICAgICAgYm9keTogY29udGV4dC5mdW5jTmFtZSxcbiAgICB9O1xufSk7XG5cbi8vIEZyYWN0aW9uc1xuZGVmaW5lRnVuY3Rpb24oW1xuICAgIFwiXFxcXGRmcmFjXCIsIFwiXFxcXGZyYWNcIiwgXCJcXFxcdGZyYWNcIixcbiAgICBcIlxcXFxkYmlub21cIiwgXCJcXFxcYmlub21cIiwgXCJcXFxcdGJpbm9tXCIsXG5dLCB7XG4gICAgbnVtQXJnczogMixcbiAgICBncmVlZGluZXNzOiAyLFxufSwgZnVuY3Rpb24oY29udGV4dCwgYXJncykge1xuICAgIHZhciBudW1lciA9IGFyZ3NbMF07XG4gICAgdmFyIGRlbm9tID0gYXJnc1sxXTtcbiAgICB2YXIgaGFzQmFyTGluZTtcbiAgICB2YXIgbGVmdERlbGltID0gbnVsbDtcbiAgICB2YXIgcmlnaHREZWxpbSA9IG51bGw7XG4gICAgdmFyIHNpemUgPSBcImF1dG9cIjtcblxuICAgIHN3aXRjaCAoY29udGV4dC5mdW5jTmFtZSkge1xuICAgICAgICBjYXNlIFwiXFxcXGRmcmFjXCI6XG4gICAgICAgIGNhc2UgXCJcXFxcZnJhY1wiOlxuICAgICAgICBjYXNlIFwiXFxcXHRmcmFjXCI6XG4gICAgICAgICAgICBoYXNCYXJMaW5lID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiXFxcXGRiaW5vbVwiOlxuICAgICAgICBjYXNlIFwiXFxcXGJpbm9tXCI6XG4gICAgICAgIGNhc2UgXCJcXFxcdGJpbm9tXCI6XG4gICAgICAgICAgICBoYXNCYXJMaW5lID0gZmFsc2U7XG4gICAgICAgICAgICBsZWZ0RGVsaW0gPSBcIihcIjtcbiAgICAgICAgICAgIHJpZ2h0RGVsaW0gPSBcIilcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGdlbmZyYWMgY29tbWFuZFwiKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNvbnRleHQuZnVuY05hbWUpIHtcbiAgICAgICAgY2FzZSBcIlxcXFxkZnJhY1wiOlxuICAgICAgICBjYXNlIFwiXFxcXGRiaW5vbVwiOlxuICAgICAgICAgICAgc2l6ZSA9IFwiZGlzcGxheVwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJcXFxcdGZyYWNcIjpcbiAgICAgICAgY2FzZSBcIlxcXFx0Ymlub21cIjpcbiAgICAgICAgICAgIHNpemUgPSBcInRleHRcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwiZ2VuZnJhY1wiLFxuICAgICAgICBudW1lcjogbnVtZXIsXG4gICAgICAgIGRlbm9tOiBkZW5vbSxcbiAgICAgICAgaGFzQmFyTGluZTogaGFzQmFyTGluZSxcbiAgICAgICAgbGVmdERlbGltOiBsZWZ0RGVsaW0sXG4gICAgICAgIHJpZ2h0RGVsaW06IHJpZ2h0RGVsaW0sXG4gICAgICAgIHNpemU6IHNpemUsXG4gICAgfTtcbn0pO1xuXG4vLyBMZWZ0IGFuZCByaWdodCBvdmVybGFwIGZ1bmN0aW9uc1xuZGVmaW5lRnVuY3Rpb24oW1wiXFxcXGxsYXBcIiwgXCJcXFxccmxhcFwiXSwge1xuICAgIG51bUFyZ3M6IDEsXG4gICAgYWxsb3dlZEluVGV4dDogdHJ1ZSxcbn0sIGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgYm9keSA9IGFyZ3NbMF07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogY29udGV4dC5mdW5jTmFtZS5zbGljZSgxKSxcbiAgICAgICAgYm9keTogYm9keSxcbiAgICB9O1xufSk7XG5cbi8vIERlbGltaXRlciBmdW5jdGlvbnNcbmRlZmluZUZ1bmN0aW9uKFtcbiAgICBcIlxcXFxiaWdsXCIsIFwiXFxcXEJpZ2xcIiwgXCJcXFxcYmlnZ2xcIiwgXCJcXFxcQmlnZ2xcIixcbiAgICBcIlxcXFxiaWdyXCIsIFwiXFxcXEJpZ3JcIiwgXCJcXFxcYmlnZ3JcIiwgXCJcXFxcQmlnZ3JcIixcbiAgICBcIlxcXFxiaWdtXCIsIFwiXFxcXEJpZ21cIiwgXCJcXFxcYmlnZ21cIiwgXCJcXFxcQmlnZ21cIixcbiAgICBcIlxcXFxiaWdcIiwgIFwiXFxcXEJpZ1wiLCAgXCJcXFxcYmlnZ1wiLCAgXCJcXFxcQmlnZ1wiLFxuICAgIFwiXFxcXGxlZnRcIiwgXCJcXFxccmlnaHRcIixcbl0sIHtcbiAgICBudW1BcmdzOiAxLFxufSwgZnVuY3Rpb24oY29udGV4dCwgYXJncykge1xuICAgIHZhciBkZWxpbSA9IGFyZ3NbMF07XG4gICAgaWYgKCF1dGlscy5jb250YWlucyhkZWxpbWl0ZXJzLCBkZWxpbS52YWx1ZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoXG4gICAgICAgICAgICBcIkludmFsaWQgZGVsaW1pdGVyOiAnXCIgKyBkZWxpbS52YWx1ZSArIFwiJyBhZnRlciAnXCIgK1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZnVuY05hbWUgKyBcIidcIixcbiAgICAgICAgICAgIGNvbnRleHQubGV4ZXIsIGNvbnRleHQucG9zaXRpb25zWzFdKTtcbiAgICB9XG5cbiAgICAvLyBcXGxlZnQgYW5kIFxccmlnaHQgYXJlIGNhdWdodCBzb21ld2hlcmUgaW4gUGFyc2VyLmpzLCB3aGljaCBpc1xuICAgIC8vIHdoeSB0aGlzIGRhdGEgZG9lc24ndCBtYXRjaCB3aGF0IGlzIGluIGJ1aWxkSFRNTC5cbiAgICBpZiAoY29udGV4dC5mdW5jTmFtZSA9PT0gXCJcXFxcbGVmdFwiIHx8IGNvbnRleHQuZnVuY05hbWUgPT09IFwiXFxcXHJpZ2h0XCIpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwibGVmdHJpZ2h0XCIsXG4gICAgICAgICAgICB2YWx1ZTogZGVsaW0udmFsdWUsXG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwiZGVsaW1zaXppbmdcIixcbiAgICAgICAgICAgIHNpemU6IGRlbGltaXRlclNpemVzW2NvbnRleHQuZnVuY05hbWVdLnNpemUsXG4gICAgICAgICAgICBkZWxpbVR5cGU6IGRlbGltaXRlclNpemVzW2NvbnRleHQuZnVuY05hbWVdLnR5cGUsXG4gICAgICAgICAgICB2YWx1ZTogZGVsaW0udmFsdWUsXG4gICAgICAgIH07XG4gICAgfVxufSk7XG5cbi8vIFNpemluZyBmdW5jdGlvbnMgKGhhbmRsZWQgaW4gUGFyc2VyLmpzIGV4cGxpY2l0bHksIGhlbmNlIG5vIGhhbmRsZXIpXG5kZWZpbmVGdW5jdGlvbihbXG4gICAgXCJcXFxcdGlueVwiLCBcIlxcXFxzY3JpcHRzaXplXCIsIFwiXFxcXGZvb3Rub3Rlc2l6ZVwiLCBcIlxcXFxzbWFsbFwiLFxuICAgIFwiXFxcXG5vcm1hbHNpemVcIiwgXCJcXFxcbGFyZ2VcIiwgXCJcXFxcTGFyZ2VcIiwgXCJcXFxcTEFSR0VcIiwgXCJcXFxcaHVnZVwiLCBcIlxcXFxIdWdlXCIsXG5dLCAwLCBudWxsKTtcblxuLy8gU3R5bGUgY2hhbmdpbmcgZnVuY3Rpb25zIChoYW5kbGVkIGluIFBhcnNlci5qcyBleHBsaWNpdGx5LCBoZW5jZSBub1xuLy8gaGFuZGxlcilcbmRlZmluZUZ1bmN0aW9uKFtcbiAgICBcIlxcXFxkaXNwbGF5c3R5bGVcIiwgXCJcXFxcdGV4dHN0eWxlXCIsIFwiXFxcXHNjcmlwdHN0eWxlXCIsXG4gICAgXCJcXFxcc2NyaXB0c2NyaXB0c3R5bGVcIixcbl0sIDAsIG51bGwpO1xuXG5kZWZpbmVGdW5jdGlvbihbXG4gICAgLy8gc3R5bGVzXG4gICAgXCJcXFxcbWF0aHJtXCIsIFwiXFxcXG1hdGhpdFwiLCBcIlxcXFxtYXRoYmZcIixcblxuICAgIC8vIGZhbWlsaWVzXG4gICAgXCJcXFxcbWF0aGJiXCIsIFwiXFxcXG1hdGhjYWxcIiwgXCJcXFxcbWF0aGZyYWtcIiwgXCJcXFxcbWF0aHNjclwiLCBcIlxcXFxtYXRoc2ZcIixcbiAgICBcIlxcXFxtYXRodHRcIixcblxuICAgIC8vIGFsaWFzZXNcbiAgICBcIlxcXFxCYmJcIiwgXCJcXFxcYm9sZFwiLCBcIlxcXFxmcmFrXCIsXG5dLCB7XG4gICAgbnVtQXJnczogMSxcbiAgICBncmVlZGluZXNzOiAyLFxufSwgZnVuY3Rpb24oY29udGV4dCwgYXJncykge1xuICAgIHZhciBib2R5ID0gYXJnc1swXTtcbiAgICB2YXIgZnVuYyA9IGNvbnRleHQuZnVuY05hbWU7XG4gICAgaWYgKGZ1bmMgaW4gZm9udEFsaWFzZXMpIHtcbiAgICAgICAgZnVuYyA9IGZvbnRBbGlhc2VzW2Z1bmNdO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcImZvbnRcIixcbiAgICAgICAgZm9udDogZnVuYy5zbGljZSgxKSxcbiAgICAgICAgYm9keTogYm9keSxcbiAgICB9O1xufSk7XG5cbi8vIEFjY2VudHNcbmRlZmluZUZ1bmN0aW9uKFtcbiAgICBcIlxcXFxhY3V0ZVwiLCBcIlxcXFxncmF2ZVwiLCBcIlxcXFxkZG90XCIsIFwiXFxcXHRpbGRlXCIsIFwiXFxcXGJhclwiLCBcIlxcXFxicmV2ZVwiLFxuICAgIFwiXFxcXGNoZWNrXCIsIFwiXFxcXGhhdFwiLCBcIlxcXFx2ZWNcIiwgXCJcXFxcZG90XCIsXG4gICAgLy8gV2UgZG9uJ3Qgc3VwcG9ydCBleHBhbmRpbmcgYWNjZW50cyB5ZXRcbiAgICAvLyBcIlxcXFx3aWRldGlsZGVcIiwgXCJcXFxcd2lkZWhhdFwiXG5dLCB7XG4gICAgbnVtQXJnczogMSxcbn0sIGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgYmFzZSA9IGFyZ3NbMF07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJhY2NlbnRcIixcbiAgICAgICAgYWNjZW50OiBjb250ZXh0LmZ1bmNOYW1lLFxuICAgICAgICBiYXNlOiBiYXNlLFxuICAgIH07XG59KTtcblxuLy8gSW5maXggZ2VuZXJhbGl6ZWQgZnJhY3Rpb25zXG5kZWZpbmVGdW5jdGlvbihbXCJcXFxcb3ZlclwiLCBcIlxcXFxjaG9vc2VcIl0sIHtcbiAgICBudW1BcmdzOiAwLFxufSwgZnVuY3Rpb24oY29udGV4dCkge1xuICAgIHZhciByZXBsYWNlV2l0aDtcbiAgICBzd2l0Y2ggKGNvbnRleHQuZnVuY05hbWUpIHtcbiAgICAgICAgY2FzZSBcIlxcXFxvdmVyXCI6XG4gICAgICAgICAgICByZXBsYWNlV2l0aCA9IFwiXFxcXGZyYWNcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiXFxcXGNob29zZVwiOlxuICAgICAgICAgICAgcmVwbGFjZVdpdGggPSBcIlxcXFxiaW5vbVwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgaW5maXggZ2VuZnJhYyBjb21tYW5kXCIpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcImluZml4XCIsXG4gICAgICAgIHJlcGxhY2VXaXRoOiByZXBsYWNlV2l0aCxcbiAgICB9O1xufSk7XG5cbi8vIFJvdyBicmVha3MgZm9yIGFsaWduZWQgZGF0YVxuZGVmaW5lRnVuY3Rpb24oW1wiXFxcXFxcXFxcIiwgXCJcXFxcY3JcIl0sIHtcbiAgICBudW1BcmdzOiAwLFxuICAgIG51bU9wdGlvbmFsQXJnczogMSxcbiAgICBhcmdUeXBlczogW1wic2l6ZVwiXSxcbn0sIGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgc2l6ZSA9IGFyZ3NbMF07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJjclwiLFxuICAgICAgICBzaXplOiBzaXplLFxuICAgIH07XG59KTtcblxuLy8gRW52aXJvbm1lbnQgZGVsaW1pdGVyc1xuZGVmaW5lRnVuY3Rpb24oW1wiXFxcXGJlZ2luXCIsIFwiXFxcXGVuZFwiXSwge1xuICAgIG51bUFyZ3M6IDEsXG4gICAgYXJnVHlwZXM6IFtcInRleHRcIl0sXG59LCBmdW5jdGlvbihjb250ZXh0LCBhcmdzKSB7XG4gICAgdmFyIG5hbWVHcm91cCA9IGFyZ3NbMF07XG4gICAgaWYgKG5hbWVHcm91cC50eXBlICE9PSBcIm9yZGdyb3VwXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoXG4gICAgICAgICAgICBcIkludmFsaWQgZW52aXJvbm1lbnQgbmFtZVwiLFxuICAgICAgICAgICAgY29udGV4dC5sZXhlciwgY29udGV4dC5wb3NpdGlvbnNbMV0pO1xuICAgIH1cbiAgICB2YXIgbmFtZSA9IFwiXCI7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lR3JvdXAudmFsdWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbmFtZSArPSBuYW1lR3JvdXAudmFsdWVbaV0udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwiZW52aXJvbm1lbnRcIixcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgbmFtZXBvczogY29udGV4dC5wb3NpdGlvbnNbMV0sXG4gICAgfTtcbn0pO1xuIiwiLyogZXNsaW50IG5vLWNvbnN0YW50LWNvbmRpdGlvbjowICovXG52YXIgZm9udE1ldHJpY3MgPSByZXF1aXJlKFwiLi9mb250TWV0cmljc1wiKTtcbnZhciBwYXJzZURhdGEgPSByZXF1aXJlKFwiLi9wYXJzZURhdGFcIik7XG52YXIgUGFyc2VFcnJvciA9IHJlcXVpcmUoXCIuL1BhcnNlRXJyb3JcIik7XG5cbnZhciBQYXJzZU5vZGUgPSBwYXJzZURhdGEuUGFyc2VOb2RlO1xuXG4vKipcbiAqIFBhcnNlIHRoZSBib2R5IG9mIHRoZSBlbnZpcm9ubWVudCwgd2l0aCByb3dzIGRlbGltaXRlZCBieSBcXFxcIGFuZFxuICogY29sdW1ucyBkZWxpbWl0ZWQgYnkgJiwgYW5kIGNyZWF0ZSBhIG5lc3RlZCBsaXN0IGluIHJvdy1tYWpvciBvcmRlclxuICogd2l0aCBvbmUgZ3JvdXAgcGVyIGNlbGwuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQXJyYXkocGFyc2VyLCByZXN1bHQpIHtcbiAgICB2YXIgcm93ID0gW107XG4gICAgdmFyIGJvZHkgPSBbcm93XTtcbiAgICB2YXIgcm93R2FwcyA9IFtdO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBjZWxsID0gcGFyc2VyLnBhcnNlRXhwcmVzc2lvbihmYWxzZSwgbnVsbCk7XG4gICAgICAgIHJvdy5wdXNoKG5ldyBQYXJzZU5vZGUoXCJvcmRncm91cFwiLCBjZWxsLCBwYXJzZXIubW9kZSkpO1xuICAgICAgICB2YXIgbmV4dCA9IHBhcnNlci5uZXh0VG9rZW4udGV4dDtcbiAgICAgICAgaWYgKG5leHQgPT09IFwiJlwiKSB7XG4gICAgICAgICAgICBwYXJzZXIuY29uc3VtZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKG5leHQgPT09IFwiXFxcXGVuZFwiKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0ID09PSBcIlxcXFxcXFxcXCIgfHwgbmV4dCA9PT0gXCJcXFxcY3JcIikge1xuICAgICAgICAgICAgdmFyIGNyID0gcGFyc2VyLnBhcnNlRnVuY3Rpb24oKTtcbiAgICAgICAgICAgIHJvd0dhcHMucHVzaChjci52YWx1ZS5zaXplKTtcbiAgICAgICAgICAgIHJvdyA9IFtdO1xuICAgICAgICAgICAgYm9keS5wdXNoKHJvdyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBDbGVhbiB1cCB0aGUgZm9sbG93aW5nIGhhY2sgb25jZSAjMzg1IGdvdCBtZXJnZWRcbiAgICAgICAgICAgIHZhciBwb3MgPSBNYXRoLm1pbihwYXJzZXIucG9zICsgMSwgcGFyc2VyLmxleGVyLl9pbnB1dC5sZW5ndGgpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoXCJFeHBlY3RlZCAmIG9yIFxcXFxcXFxcIG9yIFxcXFxlbmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5sZXhlciwgcG9zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQuYm9keSA9IGJvZHk7XG4gICAgcmVzdWx0LnJvd0dhcHMgPSByb3dHYXBzO1xuICAgIHJldHVybiBuZXcgUGFyc2VOb2RlKHJlc3VsdC50eXBlLCByZXN1bHQsIHBhcnNlci5tb2RlKTtcbn1cblxuLypcbiAqIEFuIGVudmlyb25tZW50IGRlZmluaXRpb24gaXMgdmVyeSBzaW1pbGFyIHRvIGEgZnVuY3Rpb24gZGVmaW5pdGlvbjpcbiAqIGl0IGlzIGRlY2xhcmVkIHdpdGggYSBuYW1lIG9yIGEgbGlzdCBvZiBuYW1lcywgYSBzZXQgb2YgcHJvcGVydGllc1xuICogYW5kIGEgaGFuZGxlciBjb250YWluaW5nIHRoZSBhY3R1YWwgaW1wbGVtZW50YXRpb24uXG4gKlxuICogVGhlIHByb3BlcnRpZXMgaW5jbHVkZTpcbiAqICAtIG51bUFyZ3M6IFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIGFmdGVyIHRoZSBcXGJlZ2lue25hbWV9IGZ1bmN0aW9uLlxuICogIC0gYXJnVHlwZXM6IChvcHRpb25hbCkgSnVzdCBsaWtlIGZvciBhIGZ1bmN0aW9uXG4gKiAgLSBhbGxvd2VkSW5UZXh0OiAob3B0aW9uYWwpIFdoZXRoZXIgb3Igbm90IHRoZSBlbnZpcm9ubWVudCBpcyBhbGxvd2VkIGluc2lkZVxuICogICAgICAgICAgICAgICAgICAgdGV4dCBtb2RlIChkZWZhdWx0IGZhbHNlKSAobm90IGVuZm9yY2VkIHlldClcbiAqICAtIG51bU9wdGlvbmFsQXJnczogKG9wdGlvbmFsKSBKdXN0IGxpa2UgZm9yIGEgZnVuY3Rpb25cbiAqIEEgYmFyZSBudW1iZXIgaW5zdGVhZCBvZiB0aGF0IG9iamVjdCBpbmRpY2F0ZXMgdGhlIG51bUFyZ3MgdmFsdWUuXG4gKlxuICogVGhlIGhhbmRsZXIgZnVuY3Rpb24gd2lsbCByZWNlaXZlIHR3byBhcmd1bWVudHNcbiAqICAtIGNvbnRleHQ6IGluZm9ybWF0aW9uIGFuZCByZWZlcmVuY2VzIHByb3ZpZGVkIGJ5IHRoZSBwYXJzZXJcbiAqICAtIGFyZ3M6IGFuIGFycmF5IG9mIGFyZ3VtZW50cyBwYXNzZWQgdG8gXFxiZWdpbntuYW1lfVxuICogVGhlIGNvbnRleHQgY29udGFpbnMgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICogIC0gZW52TmFtZTogdGhlIG5hbWUgb2YgdGhlIGVudmlyb25tZW50LCBvbmUgb2YgdGhlIGxpc3RlZCBuYW1lcy5cbiAqICAtIHBhcnNlcjogdGhlIHBhcnNlciBvYmplY3RcbiAqICAtIGxleGVyOiB0aGUgbGV4ZXIgb2JqZWN0XG4gKiAgLSBwb3NpdGlvbnM6IHRoZSBwb3NpdGlvbnMgYXNzb2NpYXRlZCB3aXRoIHRoZXNlIGFyZ3VtZW50cyBmcm9tIGFyZ3MuXG4gKiBUaGUgaGFuZGxlciBtdXN0IHJldHVybiBhIFBhcnNlUmVzdWx0LlxuICovXG5cbmZ1bmN0aW9uIGRlZmluZUVudmlyb25tZW50KG5hbWVzLCBwcm9wcywgaGFuZGxlcikge1xuICAgIGlmICh0eXBlb2YgbmFtZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgbmFtZXMgPSBbbmFtZXNdO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHByb3BzID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIHByb3BzID0geyBudW1BcmdzOiBwcm9wcyB9O1xuICAgIH1cbiAgICAvLyBTZXQgZGVmYXVsdCB2YWx1ZXMgb2YgZW52aXJvbm1lbnRzXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIG51bUFyZ3M6IHByb3BzLm51bUFyZ3MgfHwgMCxcbiAgICAgICAgYXJnVHlwZXM6IHByb3BzLmFyZ1R5cGVzLFxuICAgICAgICBncmVlZGluZXNzOiAxLFxuICAgICAgICBhbGxvd2VkSW5UZXh0OiAhIXByb3BzLmFsbG93ZWRJblRleHQsXG4gICAgICAgIG51bU9wdGlvbmFsQXJnczogcHJvcHMubnVtT3B0aW9uYWxBcmdzIHx8IDAsXG4gICAgICAgIGhhbmRsZXI6IGhhbmRsZXIsXG4gICAgfTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzW25hbWVzW2ldXSA9IGRhdGE7XG4gICAgfVxufVxuXG4vLyBBcnJheXMgYXJlIHBhcnQgb2YgTGFUZVgsIGRlZmluZWQgaW4gbHR0YWIuZHR4IHNvIGl0cyBkb2N1bWVudGF0aW9uXG4vLyBpcyBwYXJ0IG9mIHRoZSBzb3VyY2UyZS5wZGYgZmlsZSBvZiBMYVRlWDJlIHNvdXJjZSBkb2N1bWVudGF0aW9uLlxuZGVmaW5lRW52aXJvbm1lbnQoXCJhcnJheVwiLCB7XG4gICAgbnVtQXJnczogMSxcbn0sIGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgY29sYWxpZ24gPSBhcmdzWzBdO1xuICAgIGNvbGFsaWduID0gY29sYWxpZ24udmFsdWUubWFwID8gY29sYWxpZ24udmFsdWUgOiBbY29sYWxpZ25dO1xuICAgIHZhciBjb2xzID0gY29sYWxpZ24ubWFwKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgdmFyIGNhID0gbm9kZS52YWx1ZTtcbiAgICAgICAgaWYgKFwibGNyXCIuaW5kZXhPZihjYSkgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYWxpZ25cIixcbiAgICAgICAgICAgICAgICBhbGlnbjogY2EsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGNhID09PSBcInxcIikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInNlcGFyYXRvclwiLFxuICAgICAgICAgICAgICAgIHNlcGFyYXRvcjogXCJ8XCIsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBQYXJzZUVycm9yKFxuICAgICAgICAgICAgXCJVbmtub3duIGNvbHVtbiBhbGlnbm1lbnQ6IFwiICsgbm9kZS52YWx1ZSxcbiAgICAgICAgICAgIGNvbnRleHQubGV4ZXIsIGNvbnRleHQucG9zaXRpb25zWzFdKTtcbiAgICB9KTtcbiAgICB2YXIgcmVzID0ge1xuICAgICAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgICAgIGNvbHM6IGNvbHMsXG4gICAgICAgIGhza2lwQmVmb3JlQW5kQWZ0ZXI6IHRydWUsIC8vIFxcQHByZWFtYmxlIGluIGx0dGFiLmR0eFxuICAgIH07XG4gICAgcmVzID0gcGFyc2VBcnJheShjb250ZXh0LnBhcnNlciwgcmVzKTtcbiAgICByZXR1cm4gcmVzO1xufSk7XG5cbi8vIFRoZSBtYXRyaXggZW52aXJvbm1lbnRzIG9mIGFtc21hdGggYnVpbGRzIG9uIHRoZSBhcnJheSBlbnZpcm9ubWVudFxuLy8gb2YgTGFUZVgsIHdoaWNoIGlzIGRpc2N1c3NlZCBhYm92ZS5cbmRlZmluZUVudmlyb25tZW50KFtcbiAgICBcIm1hdHJpeFwiLFxuICAgIFwicG1hdHJpeFwiLFxuICAgIFwiYm1hdHJpeFwiLFxuICAgIFwiQm1hdHJpeFwiLFxuICAgIFwidm1hdHJpeFwiLFxuICAgIFwiVm1hdHJpeFwiLFxuXSwge1xufSwgZnVuY3Rpb24oY29udGV4dCkge1xuICAgIHZhciBkZWxpbWl0ZXJzID0ge1xuICAgICAgICBcIm1hdHJpeFwiOiBudWxsLFxuICAgICAgICBcInBtYXRyaXhcIjogW1wiKFwiLCBcIilcIl0sXG4gICAgICAgIFwiYm1hdHJpeFwiOiBbXCJbXCIsIFwiXVwiXSxcbiAgICAgICAgXCJCbWF0cml4XCI6IFtcIlxcXFx7XCIsIFwiXFxcXH1cIl0sXG4gICAgICAgIFwidm1hdHJpeFwiOiBbXCJ8XCIsIFwifFwiXSxcbiAgICAgICAgXCJWbWF0cml4XCI6IFtcIlxcXFxWZXJ0XCIsIFwiXFxcXFZlcnRcIl0sXG4gICAgfVtjb250ZXh0LmVudk5hbWVdO1xuICAgIHZhciByZXMgPSB7XG4gICAgICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICAgICAgaHNraXBCZWZvcmVBbmRBZnRlcjogZmFsc2UsIC8vIFxcaHNraXAgLVxcYXJyYXljb2xzZXAgaW4gYW1zbWF0aFxuICAgIH07XG4gICAgcmVzID0gcGFyc2VBcnJheShjb250ZXh0LnBhcnNlciwgcmVzKTtcbiAgICBpZiAoZGVsaW1pdGVycykge1xuICAgICAgICByZXMgPSBuZXcgUGFyc2VOb2RlKFwibGVmdHJpZ2h0XCIsIHtcbiAgICAgICAgICAgIGJvZHk6IFtyZXNdLFxuICAgICAgICAgICAgbGVmdDogZGVsaW1pdGVyc1swXSxcbiAgICAgICAgICAgIHJpZ2h0OiBkZWxpbWl0ZXJzWzFdLFxuICAgICAgICB9LCBjb250ZXh0Lm1vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufSk7XG5cbi8vIEEgY2FzZXMgZW52aXJvbm1lbnQgKGluIGFtc21hdGguc3R5KSBpcyBhbG1vc3QgZXF1aXZhbGVudCB0b1xuLy8gXFxkZWZcXGFycmF5c3RyZXRjaHsxLjJ9JVxuLy8gXFxsZWZ0XFx7XFxiZWdpbnthcnJheX17QHt9bEB7XFxxdWFkfWxAe319IOKApiBcXGVuZHthcnJheX1cXHJpZ2h0LlxuZGVmaW5lRW52aXJvbm1lbnQoXCJjYXNlc1wiLCB7XG59LCBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgdmFyIHJlcyA9IHtcbiAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICBhcnJheXN0cmV0Y2g6IDEuMixcbiAgICAgICAgY29sczogW3tcbiAgICAgICAgICAgIHR5cGU6IFwiYWxpZ25cIixcbiAgICAgICAgICAgIGFsaWduOiBcImxcIixcbiAgICAgICAgICAgIHByZWdhcDogMCxcbiAgICAgICAgICAgIHBvc3RnYXA6IGZvbnRNZXRyaWNzLm1ldHJpY3MucXVhZCxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdHlwZTogXCJhbGlnblwiLFxuICAgICAgICAgICAgYWxpZ246IFwibFwiLFxuICAgICAgICAgICAgcHJlZ2FwOiAwLFxuICAgICAgICAgICAgcG9zdGdhcDogMCxcbiAgICAgICAgfV0sXG4gICAgfTtcbiAgICByZXMgPSBwYXJzZUFycmF5KGNvbnRleHQucGFyc2VyLCByZXMpO1xuICAgIHJlcyA9IG5ldyBQYXJzZU5vZGUoXCJsZWZ0cmlnaHRcIiwge1xuICAgICAgICBib2R5OiBbcmVzXSxcbiAgICAgICAgbGVmdDogXCJcXFxce1wiLFxuICAgICAgICByaWdodDogXCIuXCIsXG4gICAgfSwgY29udGV4dC5tb2RlKTtcbiAgICByZXR1cm4gcmVzO1xufSk7XG5cbi8vIEFuIGFsaWduZWQgZW52aXJvbm1lbnQgaXMgbGlrZSB0aGUgYWxpZ24qIGVudmlyb25tZW50XG4vLyBleGNlcHQgaXQgb3BlcmF0ZXMgd2l0aGluIG1hdGggbW9kZS5cbi8vIE5vdGUgdGhhdCB3ZSBhc3N1bWUgXFxub21hbGxpbmVza2lwbGltaXQgdG8gYmUgemVybyxcbi8vIHNvIHRoYXQgXFxzdHJ1dEAgaXMgdGhlIHNhbWUgYXMgXFxzdHJ1dC5cbmRlZmluZUVudmlyb25tZW50KFwiYWxpZ25lZFwiLCB7XG59LCBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgdmFyIHJlcyA9IHtcbiAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICBjb2xzOiBbXSxcbiAgICB9O1xuICAgIHJlcyA9IHBhcnNlQXJyYXkoY29udGV4dC5wYXJzZXIsIHJlcyk7XG4gICAgdmFyIGVtcHR5R3JvdXAgPSBuZXcgUGFyc2VOb2RlKFwib3JkZ3JvdXBcIiwgW10sIGNvbnRleHQubW9kZSk7XG4gICAgdmFyIG51bUNvbHMgPSAwO1xuICAgIHJlcy52YWx1ZS5ib2R5LmZvckVhY2goZnVuY3Rpb24ocm93KSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgcm93Lmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICByb3dbaV0udmFsdWUudW5zaGlmdChlbXB0eUdyb3VwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobnVtQ29scyA8IHJvdy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG51bUNvbHMgPSByb3cubGVuZ3RoO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1Db2xzOyArK2kpIHtcbiAgICAgICAgdmFyIGFsaWduID0gXCJyXCI7XG4gICAgICAgIHZhciBwcmVnYXAgPSAwO1xuICAgICAgICBpZiAoaSAlIDIgPT09IDEpIHtcbiAgICAgICAgICAgIGFsaWduID0gXCJsXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgIHByZWdhcCA9IDI7IC8vIG9uZSBcXHFxdWFkIGJldHdlZW4gY29sdW1uc1xuICAgICAgICB9XG4gICAgICAgIHJlcy52YWx1ZS5jb2xzW2ldID0ge1xuICAgICAgICAgICAgdHlwZTogXCJhbGlnblwiLFxuICAgICAgICAgICAgYWxpZ246IGFsaWduLFxuICAgICAgICAgICAgcHJlZ2FwOiBwcmVnYXAsXG4gICAgICAgICAgICBwb3N0Z2FwOiAwLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufSk7XG4iLCIvKipcbiAqIFRoaXMgZmlsZSBjb250YWlucyBhIGxpc3Qgb2YgdXRpbGl0eSBmdW5jdGlvbnMgd2hpY2ggYXJlIHVzZWZ1bCBpbiBvdGhlclxuICogZmlsZXMuXG4gKi9cblxuLyoqXG4gKiBQcm92aWRlIGFuIGBpbmRleE9mYCBmdW5jdGlvbiB3aGljaCB3b3JrcyBpbiBJRTgsIGJ1dCBkZWZlcnMgdG8gbmF0aXZlIGlmXG4gKiBwb3NzaWJsZS5cbiAqL1xudmFyIG5hdGl2ZUluZGV4T2YgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZjtcbnZhciBpbmRleE9mID0gZnVuY3Rpb24obGlzdCwgZWxlbSkge1xuICAgIGlmIChsaXN0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBpZiAobmF0aXZlSW5kZXhPZiAmJiBsaXN0LmluZGV4T2YgPT09IG5hdGl2ZUluZGV4T2YpIHtcbiAgICAgICAgcmV0dXJuIGxpc3QuaW5kZXhPZihlbGVtKTtcbiAgICB9XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsID0gbGlzdC5sZW5ndGg7XG4gICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGxpc3RbaV0gPT09IGVsZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHdoZXRoZXIgYW4gZWxlbWVudCBpcyBjb250YWluZWQgaW4gYSBsaXN0XG4gKi9cbnZhciBjb250YWlucyA9IGZ1bmN0aW9uKGxpc3QsIGVsZW0pIHtcbiAgICByZXR1cm4gaW5kZXhPZihsaXN0LCBlbGVtKSAhPT0gLTE7XG59O1xuXG4vKipcbiAqIFByb3ZpZGUgYSBkZWZhdWx0IHZhbHVlIGlmIGEgc2V0dGluZyBpcyB1bmRlZmluZWRcbiAqL1xudmFyIGRlZmx0ID0gZnVuY3Rpb24oc2V0dGluZywgZGVmYXVsdElmVW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHNldHRpbmcgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRJZlVuZGVmaW5lZCA6IHNldHRpbmc7XG59O1xuXG4vLyBoeXBoZW5hdGUgYW5kIGVzY2FwZSBhZGFwdGVkIGZyb20gRmFjZWJvb2sncyBSZWFjdCB1bmRlciBBcGFjaGUgMiBsaWNlbnNlXG5cbnZhciB1cHBlcmNhc2UgPSAvKFtBLVpdKS9nO1xudmFyIGh5cGhlbmF0ZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSh1cHBlcmNhc2UsIFwiLSQxXCIpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgRVNDQVBFX0xPT0tVUCA9IHtcbiAgICBcIiZcIjogXCImYW1wO1wiLFxuICAgIFwiPlwiOiBcIiZndDtcIixcbiAgICBcIjxcIjogXCImbHQ7XCIsXG4gICAgXCJcXFwiXCI6IFwiJnF1b3Q7XCIsXG4gICAgXCInXCI6IFwiJiN4Mjc7XCIsXG59O1xuXG52YXIgRVNDQVBFX1JFR0VYID0gL1smPjxcIiddL2c7XG5cbmZ1bmN0aW9uIGVzY2FwZXIobWF0Y2gpIHtcbiAgICByZXR1cm4gRVNDQVBFX0xPT0tVUFttYXRjaF07XG59XG5cbi8qKlxuICogRXNjYXBlcyB0ZXh0IHRvIHByZXZlbnQgc2NyaXB0aW5nIGF0dGFja3MuXG4gKlxuICogQHBhcmFtIHsqfSB0ZXh0IFRleHQgdmFsdWUgdG8gZXNjYXBlLlxuICogQHJldHVybiB7c3RyaW5nfSBBbiBlc2NhcGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZXNjYXBlKHRleHQpIHtcbiAgICByZXR1cm4gKFwiXCIgKyB0ZXh0KS5yZXBsYWNlKEVTQ0FQRV9SRUdFWCwgZXNjYXBlcik7XG59XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0byBzZXQgdGhlIHRleHQgY29udGVudCBvZiBhIERPTSBlbGVtZW50IGluIGFsbCBzdXBwb3J0ZWRcbiAqIGJyb3dzZXJzLiBOb3RlIHRoYXQgd2UgZG9uJ3QgZGVmaW5lIHRoaXMgaWYgdGhlcmUgaXMgbm8gZG9jdW1lbnQuXG4gKi9cbnZhciBzZXRUZXh0Q29udGVudDtcbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgdGVzdE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBpZiAoXCJ0ZXh0Q29udGVudFwiIGluIHRlc3ROb2RlKSB7XG4gICAgICAgIHNldFRleHRDb250ZW50ID0gZnVuY3Rpb24obm9kZSwgdGV4dCkge1xuICAgICAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGV4dENvbnRlbnQgPSBmdW5jdGlvbihub2RlLCB0ZXh0KSB7XG4gICAgICAgICAgICBub2RlLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgICAgIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEEgZnVuY3Rpb24gdG8gY2xlYXIgYSBub2RlLlxuICovXG5mdW5jdGlvbiBjbGVhck5vZGUobm9kZSkge1xuICAgIHNldFRleHRDb250ZW50KG5vZGUsIFwiXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb250YWluczogY29udGFpbnMsXG4gICAgZGVmbHQ6IGRlZmx0LFxuICAgIGVzY2FwZTogZXNjYXBlLFxuICAgIGh5cGhlbmF0ZTogaHlwaGVuYXRlLFxuICAgIGluZGV4T2Y6IGluZGV4T2YsXG4gICAgc2V0VGV4dENvbnRlbnQ6IHNldFRleHRDb250ZW50LFxuICAgIGNsZWFyTm9kZTogY2xlYXJOb2RlLFxufTtcbiIsIi8qIGVzbGludCBuby1jb25zb2xlOjAgKi9cbi8qKlxuICogVGhpcyBtb2R1bGUgY29udGFpbnMgZ2VuZXJhbCBmdW5jdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCBmb3IgYnVpbGRpbmdcbiAqIGRpZmZlcmVudCBraW5kcyBvZiBkb21UcmVlIG5vZGVzIGluIGEgY29uc2lzdGVudCBtYW5uZXIuXG4gKi9cblxudmFyIGRvbVRyZWUgPSByZXF1aXJlKFwiLi9kb21UcmVlXCIpO1xudmFyIGZvbnRNZXRyaWNzID0gcmVxdWlyZShcIi4vZm9udE1ldHJpY3NcIik7XG52YXIgc3ltYm9scyA9IHJlcXVpcmUoXCIuL3N5bWJvbHNcIik7XG52YXIgdXRpbHMgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcblxudmFyIGdyZWVrQ2FwaXRhbHMgPSBbXG4gICAgXCJcXFxcR2FtbWFcIixcbiAgICBcIlxcXFxEZWx0YVwiLFxuICAgIFwiXFxcXFRoZXRhXCIsXG4gICAgXCJcXFxcTGFtYmRhXCIsXG4gICAgXCJcXFxcWGlcIixcbiAgICBcIlxcXFxQaVwiLFxuICAgIFwiXFxcXFNpZ21hXCIsXG4gICAgXCJcXFxcVXBzaWxvblwiLFxuICAgIFwiXFxcXFBoaVwiLFxuICAgIFwiXFxcXFBzaVwiLFxuICAgIFwiXFxcXE9tZWdhXCIsXG5dO1xuXG52YXIgZG90bGVzc0xldHRlcnMgPSBbXG4gICAgXCJcXHUwMTMxXCIsICAgLy8gZG90bGVzcyBpLCBcXGltYXRoXG4gICAgXCJcXHUwMjM3XCIsICAgLy8gZG90bGVzcyBqLCBcXGptYXRoXG5dO1xuXG4vKipcbiAqIE1ha2VzIGEgc3ltYm9sTm9kZSBhZnRlciB0cmFuc2xhdGlvbiB2aWEgdGhlIGxpc3Qgb2Ygc3ltYm9scyBpbiBzeW1ib2xzLmpzLlxuICogQ29ycmVjdGx5IHB1bGxzIG91dCBtZXRyaWNzIGZvciB0aGUgY2hhcmFjdGVyLCBhbmQgb3B0aW9uYWxseSB0YWtlcyBhIGxpc3Qgb2ZcbiAqIGNsYXNzZXMgdG8gYmUgYXR0YWNoZWQgdG8gdGhlIG5vZGUuXG4gKi9cbnZhciBtYWtlU3ltYm9sID0gZnVuY3Rpb24odmFsdWUsIHN0eWxlLCBtb2RlLCBjb2xvciwgY2xhc3Nlcykge1xuICAgIC8vIFJlcGxhY2UgdGhlIHZhbHVlIHdpdGggaXRzIHJlcGxhY2VkIHZhbHVlIGZyb20gc3ltYm9sLmpzXG4gICAgaWYgKHN5bWJvbHNbbW9kZV1bdmFsdWVdICYmIHN5bWJvbHNbbW9kZV1bdmFsdWVdLnJlcGxhY2UpIHtcbiAgICAgICAgdmFsdWUgPSBzeW1ib2xzW21vZGVdW3ZhbHVlXS5yZXBsYWNlO1xuICAgIH1cblxuICAgIHZhciBtZXRyaWNzID0gZm9udE1ldHJpY3MuZ2V0Q2hhcmFjdGVyTWV0cmljcyh2YWx1ZSwgc3R5bGUpO1xuXG4gICAgdmFyIHN5bWJvbE5vZGU7XG4gICAgaWYgKG1ldHJpY3MpIHtcbiAgICAgICAgc3ltYm9sTm9kZSA9IG5ldyBkb21UcmVlLnN5bWJvbE5vZGUoXG4gICAgICAgICAgICB2YWx1ZSwgbWV0cmljcy5oZWlnaHQsIG1ldHJpY3MuZGVwdGgsIG1ldHJpY3MuaXRhbGljLCBtZXRyaWNzLnNrZXcsXG4gICAgICAgICAgICBjbGFzc2VzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPKGVtaWx5KTogRmlndXJlIG91dCBhIGdvb2Qgd2F5IHRvIG9ubHkgcHJpbnQgdGhpcyBpbiBkZXZlbG9wbWVudFxuICAgICAgICB0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBcIk5vIGNoYXJhY3RlciBtZXRyaWNzIGZvciAnXCIgKyB2YWx1ZSArIFwiJyBpbiBzdHlsZSAnXCIgK1xuICAgICAgICAgICAgICAgIHN0eWxlICsgXCInXCIpO1xuICAgICAgICBzeW1ib2xOb2RlID0gbmV3IGRvbVRyZWUuc3ltYm9sTm9kZSh2YWx1ZSwgMCwgMCwgMCwgMCwgY2xhc3Nlcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIHN5bWJvbE5vZGUuc3R5bGUuY29sb3IgPSBjb2xvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gc3ltYm9sTm9kZTtcbn07XG5cbi8qKlxuICogTWFrZXMgYSBzeW1ib2wgaW4gTWFpbi1SZWd1bGFyIG9yIEFNUy1SZWd1bGFyLlxuICogVXNlZCBmb3IgcmVsLCBiaW4sIG9wZW4sIGNsb3NlLCBpbm5lciwgYW5kIHB1bmN0LlxuICovXG52YXIgbWF0aHN5bSA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlLCBjb2xvciwgY2xhc3Nlcykge1xuICAgIC8vIERlY2lkZSB3aGF0IGZvbnQgdG8gcmVuZGVyIHRoZSBzeW1ib2wgaW4gYnkgaXRzIGVudHJ5IGluIHRoZSBzeW1ib2xzXG4gICAgLy8gdGFibGUuXG4gICAgLy8gSGF2ZSBhIHNwZWNpYWwgY2FzZSBmb3Igd2hlbiB0aGUgdmFsdWUgPSBcXCBiZWNhdXNlIHRoZSBcXCBpcyB1c2VkIGFzIGFcbiAgICAvLyB0ZXh0b3JkIGluIHVuc3VwcG9ydGVkIGNvbW1hbmQgZXJyb3JzIGJ1dCBjYW5ub3QgYmUgcGFyc2VkIGFzIGEgcmVndWxhclxuICAgIC8vIHRleHQgb3JkaW5hbCBhbmQgaXMgdGhlcmVmb3JlIG5vdCBwcmVzZW50IGFzIGEgc3ltYm9sIGluIHRoZSBzeW1ib2xzXG4gICAgLy8gdGFibGUgZm9yIHRleHRcbiAgICBpZiAodmFsdWUgPT09IFwiXFxcXFwiIHx8IHN5bWJvbHNbbW9kZV1bdmFsdWVdLmZvbnQgPT09IFwibWFpblwiKSB7XG4gICAgICAgIHJldHVybiBtYWtlU3ltYm9sKHZhbHVlLCBcIk1haW4tUmVndWxhclwiLCBtb2RlLCBjb2xvciwgY2xhc3Nlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1ha2VTeW1ib2woXG4gICAgICAgICAgICB2YWx1ZSwgXCJBTVMtUmVndWxhclwiLCBtb2RlLCBjb2xvciwgY2xhc3Nlcy5jb25jYXQoW1wiYW1zcm1cIl0pKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIE1ha2VzIGEgc3ltYm9sIGluIHRoZSBkZWZhdWx0IGZvbnQgZm9yIG1hdGhvcmRzIGFuZCB0ZXh0b3Jkcy5cbiAqL1xudmFyIG1hdGhEZWZhdWx0ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUsIGNvbG9yLCBjbGFzc2VzLCB0eXBlKSB7XG4gICAgaWYgKHR5cGUgPT09IFwibWF0aG9yZFwiKSB7XG4gICAgICAgIHJldHVybiBtYXRoaXQodmFsdWUsIG1vZGUsIGNvbG9yLCBjbGFzc2VzKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwidGV4dG9yZFwiKSB7XG4gICAgICAgIHJldHVybiBtYWtlU3ltYm9sKFxuICAgICAgICAgICAgdmFsdWUsIFwiTWFpbi1SZWd1bGFyXCIsIG1vZGUsIGNvbG9yLCBjbGFzc2VzLmNvbmNhdChbXCJtYXRocm1cIl0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bmV4cGVjdGVkIHR5cGU6IFwiICsgdHlwZSArIFwiIGluIG1hdGhEZWZhdWx0XCIpO1xuICAgIH1cbn07XG5cbi8qKlxuICogTWFrZXMgYSBzeW1ib2wgaW4gdGhlIGl0YWxpYyBtYXRoIGZvbnQuXG4gKi9cbnZhciBtYXRoaXQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSwgY29sb3IsIGNsYXNzZXMpIHtcbiAgICBpZiAoL1swLTldLy50ZXN0KHZhbHVlLmNoYXJBdCgwKSkgfHxcbiAgICAgICAgICAgIC8vIGdseXBocyBmb3IgXFxpbWF0aCBhbmQgXFxqbWF0aCBkbyBub3QgZXhpc3QgaW4gTWF0aC1JdGFsaWMgc28gd2VcbiAgICAgICAgICAgIC8vIG5lZWQgdG8gdXNlIE1haW4tSXRhbGljIGluc3RlYWRcbiAgICAgICAgICAgIHV0aWxzLmNvbnRhaW5zKGRvdGxlc3NMZXR0ZXJzLCB2YWx1ZSkgfHxcbiAgICAgICAgICAgIHV0aWxzLmNvbnRhaW5zKGdyZWVrQ2FwaXRhbHMsIHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbWFrZVN5bWJvbChcbiAgICAgICAgICAgIHZhbHVlLCBcIk1haW4tSXRhbGljXCIsIG1vZGUsIGNvbG9yLCBjbGFzc2VzLmNvbmNhdChbXCJtYWluaXRcIl0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWFrZVN5bWJvbChcbiAgICAgICAgICAgIHZhbHVlLCBcIk1hdGgtSXRhbGljXCIsIG1vZGUsIGNvbG9yLCBjbGFzc2VzLmNvbmNhdChbXCJtYXRoaXRcIl0pKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIE1ha2VzIGVpdGhlciBhIG1hdGhvcmQgb3IgdGV4dG9yZCBpbiB0aGUgY29ycmVjdCBmb250IGFuZCBjb2xvci5cbiAqL1xudmFyIG1ha2VPcmQgPSBmdW5jdGlvbihncm91cCwgb3B0aW9ucywgdHlwZSkge1xuICAgIHZhciBtb2RlID0gZ3JvdXAubW9kZTtcbiAgICB2YXIgdmFsdWUgPSBncm91cC52YWx1ZTtcbiAgICBpZiAoc3ltYm9sc1ttb2RlXVt2YWx1ZV0gJiYgc3ltYm9sc1ttb2RlXVt2YWx1ZV0ucmVwbGFjZSkge1xuICAgICAgICB2YWx1ZSA9IHN5bWJvbHNbbW9kZV1bdmFsdWVdLnJlcGxhY2U7XG4gICAgfVxuXG4gICAgdmFyIGNsYXNzZXMgPSBbXCJtb3JkXCJdO1xuICAgIHZhciBjb2xvciA9IG9wdGlvbnMuZ2V0Q29sb3IoKTtcblxuICAgIHZhciBmb250ID0gb3B0aW9ucy5mb250O1xuICAgIGlmIChmb250KSB7XG4gICAgICAgIGlmIChmb250ID09PSBcIm1hdGhpdFwiIHx8IHV0aWxzLmNvbnRhaW5zKGRvdGxlc3NMZXR0ZXJzLCB2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRoaXQodmFsdWUsIG1vZGUsIGNvbG9yLCBjbGFzc2VzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBmb250TmFtZSA9IGZvbnRNYXBbZm9udF0uZm9udE5hbWU7XG4gICAgICAgICAgICBpZiAoZm9udE1ldHJpY3MuZ2V0Q2hhcmFjdGVyTWV0cmljcyh2YWx1ZSwgZm9udE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ha2VTeW1ib2woXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLCBmb250TmFtZSwgbW9kZSwgY29sb3IsIGNsYXNzZXMuY29uY2F0KFtmb250XSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0aERlZmF1bHQodmFsdWUsIG1vZGUsIGNvbG9yLCBjbGFzc2VzLCB0eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtYXRoRGVmYXVsdCh2YWx1ZSwgbW9kZSwgY29sb3IsIGNsYXNzZXMsIHR5cGUpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlIHRoZSBoZWlnaHQsIGRlcHRoLCBhbmQgbWF4Rm9udFNpemUgb2YgYW4gZWxlbWVudCBiYXNlZCBvbiBpdHNcbiAqIGNoaWxkcmVuLlxuICovXG52YXIgc2l6ZUVsZW1lbnRGcm9tQ2hpbGRyZW4gPSBmdW5jdGlvbihlbGVtKSB7XG4gICAgdmFyIGhlaWdodCA9IDA7XG4gICAgdmFyIGRlcHRoID0gMDtcbiAgICB2YXIgbWF4Rm9udFNpemUgPSAwO1xuXG4gICAgaWYgKGVsZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZWxlbS5jaGlsZHJlbltpXS5oZWlnaHQgPiBoZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBlbGVtLmNoaWxkcmVuW2ldLmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbGVtLmNoaWxkcmVuW2ldLmRlcHRoID4gZGVwdGgpIHtcbiAgICAgICAgICAgICAgICBkZXB0aCA9IGVsZW0uY2hpbGRyZW5baV0uZGVwdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWxlbS5jaGlsZHJlbltpXS5tYXhGb250U2l6ZSA+IG1heEZvbnRTaXplKSB7XG4gICAgICAgICAgICAgICAgbWF4Rm9udFNpemUgPSBlbGVtLmNoaWxkcmVuW2ldLm1heEZvbnRTaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWxlbS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgZWxlbS5kZXB0aCA9IGRlcHRoO1xuICAgIGVsZW0ubWF4Rm9udFNpemUgPSBtYXhGb250U2l6ZTtcbn07XG5cbi8qKlxuICogTWFrZXMgYSBzcGFuIHdpdGggdGhlIGdpdmVuIGxpc3Qgb2YgY2xhc3NlcywgbGlzdCBvZiBjaGlsZHJlbiwgYW5kIGNvbG9yLlxuICovXG52YXIgbWFrZVNwYW4gPSBmdW5jdGlvbihjbGFzc2VzLCBjaGlsZHJlbiwgY29sb3IpIHtcbiAgICB2YXIgc3BhbiA9IG5ldyBkb21UcmVlLnNwYW4oY2xhc3NlcywgY2hpbGRyZW4pO1xuXG4gICAgc2l6ZUVsZW1lbnRGcm9tQ2hpbGRyZW4oc3Bhbik7XG5cbiAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgc3Bhbi5zdHlsZS5jb2xvciA9IGNvbG9yO1xuICAgIH1cblxuICAgIHJldHVybiBzcGFuO1xufTtcblxuLyoqXG4gKiBNYWtlcyBhIGRvY3VtZW50IGZyYWdtZW50IHdpdGggdGhlIGdpdmVuIGxpc3Qgb2YgY2hpbGRyZW4uXG4gKi9cbnZhciBtYWtlRnJhZ21lbnQgPSBmdW5jdGlvbihjaGlsZHJlbikge1xuICAgIHZhciBmcmFnbWVudCA9IG5ldyBkb21UcmVlLmRvY3VtZW50RnJhZ21lbnQoY2hpbGRyZW4pO1xuXG4gICAgc2l6ZUVsZW1lbnRGcm9tQ2hpbGRyZW4oZnJhZ21lbnQpO1xuXG4gICAgcmV0dXJuIGZyYWdtZW50O1xufTtcblxuLyoqXG4gKiBNYWtlcyBhbiBlbGVtZW50IHBsYWNlZCBpbiBlYWNoIG9mIHRoZSB2bGlzdCBlbGVtZW50cyB0byBlbnN1cmUgdGhhdCBlYWNoXG4gKiBlbGVtZW50IGhhcyB0aGUgc2FtZSBtYXggZm9udCBzaXplLiBUbyBkbyB0aGlzLCB3ZSBjcmVhdGUgYSB6ZXJvLXdpZHRoIHNwYWNlXG4gKiB3aXRoIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZS5cbiAqL1xudmFyIG1ha2VGb250U2l6ZXIgPSBmdW5jdGlvbihvcHRpb25zLCBmb250U2l6ZSkge1xuICAgIHZhciBmb250U2l6ZUlubmVyID0gbWFrZVNwYW4oW10sIFtuZXcgZG9tVHJlZS5zeW1ib2xOb2RlKFwiXFx1MjAwYlwiKV0pO1xuICAgIGZvbnRTaXplSW5uZXIuc3R5bGUuZm9udFNpemUgPVxuICAgICAgICAoZm9udFNpemUgLyBvcHRpb25zLnN0eWxlLnNpemVNdWx0aXBsaWVyKSArIFwiZW1cIjtcblxuICAgIHZhciBmb250U2l6ZXIgPSBtYWtlU3BhbihcbiAgICAgICAgW1wiZm9udHNpemUtZW5zdXJlclwiLCBcInJlc2V0LVwiICsgb3B0aW9ucy5zaXplLCBcInNpemU1XCJdLFxuICAgICAgICBbZm9udFNpemVJbm5lcl0pO1xuXG4gICAgcmV0dXJuIGZvbnRTaXplcjtcbn07XG5cbi8qKlxuICogTWFrZXMgYSB2ZXJ0aWNhbCBsaXN0IGJ5IHN0YWNraW5nIGVsZW1lbnRzIGFuZCBrZXJucyBvbiB0b3Agb2YgZWFjaCBvdGhlci5cbiAqIEFsbG93cyBmb3IgbWFueSBkaWZmZXJlbnQgd2F5cyBvZiBzcGVjaWZ5aW5nIHRoZSBwb3NpdGlvbmluZyBtZXRob2QuXG4gKlxuICogQXJndW1lbnRzOlxuICogIC0gY2hpbGRyZW46IEEgbGlzdCBvZiBjaGlsZCBvciBrZXJuIG5vZGVzIHRvIGJlIHN0YWNrZWQgb24gdG9wIG9mIGVhY2ggb3RoZXJcbiAqICAgICAgICAgICAgICAoaS5lLiB0aGUgZmlyc3QgZWxlbWVudCB3aWxsIGJlIGF0IHRoZSBib3R0b20sIGFuZCB0aGUgbGFzdCBhdFxuICogICAgICAgICAgICAgIHRoZSB0b3ApLiBFbGVtZW50IG5vZGVzIGFyZSBzcGVjaWZpZWQgYXNcbiAqICAgICAgICAgICAgICAgIHt0eXBlOiBcImVsZW1cIiwgZWxlbTogbm9kZX1cbiAqICAgICAgICAgICAgICB3aGlsZSBrZXJuIG5vZGVzIGFyZSBzcGVjaWZpZWQgYXNcbiAqICAgICAgICAgICAgICAgIHt0eXBlOiBcImtlcm5cIiwgc2l6ZTogc2l6ZX1cbiAqICAtIHBvc2l0aW9uVHlwZTogVGhlIG1ldGhvZCBieSB3aGljaCB0aGUgdmxpc3Qgc2hvdWxkIGJlIHBvc2l0aW9uZWQuIFZhbGlkXG4gKiAgICAgICAgICAgICAgICAgIHZhbHVlcyBhcmU6XG4gKiAgICAgICAgICAgICAgICAgICAtIFwiaW5kaXZpZHVhbFNoaWZ0XCI6IFRoZSBjaGlsZHJlbiBsaXN0IG9ubHkgY29udGFpbnMgZWxlbVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXMsIGFuZCBlYWNoIG5vZGUgY29udGFpbnMgYW4gZXh0cmFcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hpZnRcIiB2YWx1ZSBvZiBob3cgbXVjaCBpdCBzaG91bGQgYmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0ZWQgKG5vdGUgdGhhdCBzaGlmdGluZyBpcyBhbHdheXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmluZyBkb3dud2FyZHMpLiBwb3NpdGlvbkRhdGEgaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlnbm9yZWQuXG4gKiAgICAgICAgICAgICAgICAgICAtIFwidG9wXCI6IFRoZSBwb3NpdGlvbkRhdGEgc3BlY2lmaWVzIHRoZSB0b3Btb3N0IHBvaW50IG9mXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgdmxpc3QgKG5vdGUgdGhpcyBpcyBleHBlY3RlZCB0byBiZSBhIGhlaWdodCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvIHBvc2l0aXZlIHZhbHVlcyBtb3ZlIHVwKVxuICogICAgICAgICAgICAgICAgICAgLSBcImJvdHRvbVwiOiBUaGUgcG9zaXRpb25EYXRhIHNwZWNpZmllcyB0aGUgYm90dG9tbW9zdCBwb2ludFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2YgdGhlIHZsaXN0IChub3RlIHRoaXMgaXMgZXhwZWN0ZWQgdG8gYmUgYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwdGgsIHNvIHBvc2l0aXZlIHZhbHVlcyBtb3ZlIGRvd25cbiAqICAgICAgICAgICAgICAgICAgIC0gXCJzaGlmdFwiOiBUaGUgdmxpc3Qgd2lsbCBiZSBwb3NpdGlvbmVkIHN1Y2ggdGhhdCBpdHNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZWxpbmUgaXMgcG9zaXRpb25EYXRhIGF3YXkgZnJvbSB0aGUgYmFzZWxpbmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2YgdGhlIGZpcnN0IGNoaWxkLiBQb3NpdGl2ZSB2YWx1ZXMgbW92ZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3dud2FyZHMuXG4gKiAgICAgICAgICAgICAgICAgICAtIFwiZmlyc3RCYXNlbGluZVwiOiBUaGUgdmxpc3Qgd2lsbCBiZSBwb3NpdGlvbmVkIHN1Y2ggdGhhdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0cyBiYXNlbGluZSBpcyBhbGlnbmVkIHdpdGggdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZWxpbmUgb2YgdGhlIGZpcnN0IGNoaWxkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uRGF0YSBpcyBpZ25vcmVkLiAodGhpcyBpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVxdWl2YWxlbnQgdG8gXCJzaGlmdFwiIHdpdGhcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbkRhdGE9MClcbiAqICAtIHBvc2l0aW9uRGF0YTogRGF0YSB1c2VkIGluIGRpZmZlcmVudCB3YXlzIGRlcGVuZGluZyBvbiBwb3NpdGlvblR5cGVcbiAqICAtIG9wdGlvbnM6IEFuIE9wdGlvbnMgb2JqZWN0XG4gKlxuICovXG52YXIgbWFrZVZMaXN0ID0gZnVuY3Rpb24oY2hpbGRyZW4sIHBvc2l0aW9uVHlwZSwgcG9zaXRpb25EYXRhLCBvcHRpb25zKSB7XG4gICAgdmFyIGRlcHRoO1xuICAgIHZhciBjdXJyUG9zO1xuICAgIHZhciBpO1xuICAgIGlmIChwb3NpdGlvblR5cGUgPT09IFwiaW5kaXZpZHVhbFNoaWZ0XCIpIHtcbiAgICAgICAgdmFyIG9sZENoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICAgIGNoaWxkcmVuID0gW29sZENoaWxkcmVuWzBdXTtcblxuICAgICAgICAvLyBBZGQgaW4ga2VybnMgdG8gdGhlIGxpc3Qgb2YgY2hpbGRyZW4gdG8gZ2V0IGVhY2ggZWxlbWVudCB0byBiZVxuICAgICAgICAvLyBzaGlmdGVkIHRvIHRoZSBjb3JyZWN0IHNwZWNpZmllZCBzaGlmdFxuICAgICAgICBkZXB0aCA9IC1vbGRDaGlsZHJlblswXS5zaGlmdCAtIG9sZENoaWxkcmVuWzBdLmVsZW0uZGVwdGg7XG4gICAgICAgIGN1cnJQb3MgPSBkZXB0aDtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IG9sZENoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZGlmZiA9IC1vbGRDaGlsZHJlbltpXS5zaGlmdCAtIGN1cnJQb3MgLVxuICAgICAgICAgICAgICAgIG9sZENoaWxkcmVuW2ldLmVsZW0uZGVwdGg7XG4gICAgICAgICAgICB2YXIgc2l6ZSA9IGRpZmYgLVxuICAgICAgICAgICAgICAgIChvbGRDaGlsZHJlbltpIC0gMV0uZWxlbS5oZWlnaHQgK1xuICAgICAgICAgICAgICAgICBvbGRDaGlsZHJlbltpIC0gMV0uZWxlbS5kZXB0aCk7XG5cbiAgICAgICAgICAgIGN1cnJQb3MgPSBjdXJyUG9zICsgZGlmZjtcblxuICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh7dHlwZTogXCJrZXJuXCIsIHNpemU6IHNpemV9KTtcbiAgICAgICAgICAgIGNoaWxkcmVuLnB1c2gob2xkQ2hpbGRyZW5baV0pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvblR5cGUgPT09IFwidG9wXCIpIHtcbiAgICAgICAgLy8gV2UgYWx3YXlzIHN0YXJ0IGF0IHRoZSBib3R0b20sIHNvIGNhbGN1bGF0ZSB0aGUgYm90dG9tIGJ5IGFkZGluZyB1cFxuICAgICAgICAvLyBhbGwgdGhlIHNpemVzXG4gICAgICAgIHZhciBib3R0b20gPSBwb3NpdGlvbkRhdGE7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNoaWxkcmVuW2ldLnR5cGUgPT09IFwia2VyblwiKSB7XG4gICAgICAgICAgICAgICAgYm90dG9tIC09IGNoaWxkcmVuW2ldLnNpemU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJvdHRvbSAtPSBjaGlsZHJlbltpXS5lbGVtLmhlaWdodCArIGNoaWxkcmVuW2ldLmVsZW0uZGVwdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGVwdGggPSBib3R0b207XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvblR5cGUgPT09IFwiYm90dG9tXCIpIHtcbiAgICAgICAgZGVwdGggPSAtcG9zaXRpb25EYXRhO1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb25UeXBlID09PSBcInNoaWZ0XCIpIHtcbiAgICAgICAgZGVwdGggPSAtY2hpbGRyZW5bMF0uZWxlbS5kZXB0aCAtIHBvc2l0aW9uRGF0YTtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uVHlwZSA9PT0gXCJmaXJzdEJhc2VsaW5lXCIpIHtcbiAgICAgICAgZGVwdGggPSAtY2hpbGRyZW5bMF0uZWxlbS5kZXB0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkZXB0aCA9IDA7XG4gICAgfVxuXG4gICAgLy8gTWFrZSB0aGUgZm9udFNpemVyXG4gICAgdmFyIG1heEZvbnRTaXplID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNoaWxkcmVuW2ldLnR5cGUgPT09IFwiZWxlbVwiKSB7XG4gICAgICAgICAgICBtYXhGb250U2l6ZSA9IE1hdGgubWF4KG1heEZvbnRTaXplLCBjaGlsZHJlbltpXS5lbGVtLm1heEZvbnRTaXplKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgZm9udFNpemVyID0gbWFrZUZvbnRTaXplcihvcHRpb25zLCBtYXhGb250U2l6ZSk7XG5cbiAgICAvLyBDcmVhdGUgYSBuZXcgbGlzdCBvZiBhY3R1YWwgY2hpbGRyZW4gYXQgdGhlIGNvcnJlY3Qgb2Zmc2V0c1xuICAgIHZhciByZWFsQ2hpbGRyZW4gPSBbXTtcbiAgICBjdXJyUG9zID0gZGVwdGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChjaGlsZHJlbltpXS50eXBlID09PSBcImtlcm5cIikge1xuICAgICAgICAgICAgY3VyclBvcyArPSBjaGlsZHJlbltpXS5zaXplO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV0uZWxlbTtcblxuICAgICAgICAgICAgdmFyIHNoaWZ0ID0gLWNoaWxkLmRlcHRoIC0gY3VyclBvcztcbiAgICAgICAgICAgIGN1cnJQb3MgKz0gY2hpbGQuaGVpZ2h0ICsgY2hpbGQuZGVwdGg7XG5cbiAgICAgICAgICAgIHZhciBjaGlsZFdyYXAgPSBtYWtlU3BhbihbXSwgW2ZvbnRTaXplciwgY2hpbGRdKTtcbiAgICAgICAgICAgIGNoaWxkV3JhcC5oZWlnaHQgLT0gc2hpZnQ7XG4gICAgICAgICAgICBjaGlsZFdyYXAuZGVwdGggKz0gc2hpZnQ7XG4gICAgICAgICAgICBjaGlsZFdyYXAuc3R5bGUudG9wID0gc2hpZnQgKyBcImVtXCI7XG5cbiAgICAgICAgICAgIHJlYWxDaGlsZHJlbi5wdXNoKGNoaWxkV3JhcCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaW4gYW4gZWxlbWVudCBhdCB0aGUgZW5kIHdpdGggbm8gb2Zmc2V0IHRvIGZpeCB0aGUgY2FsY3VsYXRpb24gb2ZcbiAgICAvLyBiYXNlbGluZXMgaW4gc29tZSBicm93c2VycyAobmFtZWx5IElFLCBzb21ldGltZXMgc2FmYXJpKVxuICAgIHZhciBiYXNlbGluZUZpeCA9IG1ha2VTcGFuKFxuICAgICAgICBbXCJiYXNlbGluZS1maXhcIl0sIFtmb250U2l6ZXIsIG5ldyBkb21UcmVlLnN5bWJvbE5vZGUoXCJcXHUyMDBiXCIpXSk7XG4gICAgcmVhbENoaWxkcmVuLnB1c2goYmFzZWxpbmVGaXgpO1xuXG4gICAgdmFyIHZsaXN0ID0gbWFrZVNwYW4oW1widmxpc3RcIl0sIHJlYWxDaGlsZHJlbik7XG4gICAgLy8gRml4IHRoZSBmaW5hbCBoZWlnaHQgYW5kIGRlcHRoLCBpbiBjYXNlIHRoZXJlIHdlcmUga2VybnMgYXQgdGhlIGVuZHNcbiAgICAvLyBzaW5jZSB0aGUgbWFrZVNwYW4gY2FsY3VsYXRpb24gd29uJ3QgdGFrZSB0aGF0IGluIHRvIGFjY291bnQuXG4gICAgdmxpc3QuaGVpZ2h0ID0gTWF0aC5tYXgoY3VyclBvcywgdmxpc3QuaGVpZ2h0KTtcbiAgICB2bGlzdC5kZXB0aCA9IE1hdGgubWF4KC1kZXB0aCwgdmxpc3QuZGVwdGgpO1xuICAgIHJldHVybiB2bGlzdDtcbn07XG5cbi8vIEEgdGFibGUgb2Ygc2l6ZSAtPiBmb250IHNpemUgZm9yIHRoZSBkaWZmZXJlbnQgc2l6aW5nIGZ1bmN0aW9uc1xudmFyIHNpemluZ011bHRpcGxpZXIgPSB7XG4gICAgc2l6ZTE6IDAuNSxcbiAgICBzaXplMjogMC43LFxuICAgIHNpemUzOiAwLjgsXG4gICAgc2l6ZTQ6IDAuOSxcbiAgICBzaXplNTogMS4wLFxuICAgIHNpemU2OiAxLjIsXG4gICAgc2l6ZTc6IDEuNDQsXG4gICAgc2l6ZTg6IDEuNzMsXG4gICAgc2l6ZTk6IDIuMDcsXG4gICAgc2l6ZTEwOiAyLjQ5LFxufTtcblxuLy8gQSBtYXAgb2Ygc3BhY2luZyBmdW5jdGlvbnMgdG8gdGhlaXIgYXR0cmlidXRlcywgbGlrZSBzaXplIGFuZCBjb3JyZXNwb25kaW5nXG4vLyBDU1MgY2xhc3NcbnZhciBzcGFjaW5nRnVuY3Rpb25zID0ge1xuICAgIFwiXFxcXHFxdWFkXCI6IHtcbiAgICAgICAgc2l6ZTogXCIyZW1cIixcbiAgICAgICAgY2xhc3NOYW1lOiBcInFxdWFkXCIsXG4gICAgfSxcbiAgICBcIlxcXFxxdWFkXCI6IHtcbiAgICAgICAgc2l6ZTogXCIxZW1cIixcbiAgICAgICAgY2xhc3NOYW1lOiBcInF1YWRcIixcbiAgICB9LFxuICAgIFwiXFxcXGVuc3BhY2VcIjoge1xuICAgICAgICBzaXplOiBcIjAuNWVtXCIsXG4gICAgICAgIGNsYXNzTmFtZTogXCJlbnNwYWNlXCIsXG4gICAgfSxcbiAgICBcIlxcXFw7XCI6IHtcbiAgICAgICAgc2l6ZTogXCIwLjI3Nzc3OGVtXCIsXG4gICAgICAgIGNsYXNzTmFtZTogXCJ0aGlja3NwYWNlXCIsXG4gICAgfSxcbiAgICBcIlxcXFw6XCI6IHtcbiAgICAgICAgc2l6ZTogXCIwLjIyMjIyZW1cIixcbiAgICAgICAgY2xhc3NOYW1lOiBcIm1lZGl1bXNwYWNlXCIsXG4gICAgfSxcbiAgICBcIlxcXFwsXCI6IHtcbiAgICAgICAgc2l6ZTogXCIwLjE2NjY3ZW1cIixcbiAgICAgICAgY2xhc3NOYW1lOiBcInRoaW5zcGFjZVwiLFxuICAgIH0sXG4gICAgXCJcXFxcIVwiOiB7XG4gICAgICAgIHNpemU6IFwiLTAuMTY2NjdlbVwiLFxuICAgICAgICBjbGFzc05hbWU6IFwibmVnYXRpdmV0aGluc3BhY2VcIixcbiAgICB9LFxufTtcblxuLyoqXG4gKiBNYXBzIFRlWCBmb250IGNvbW1hbmRzIHRvIG9iamVjdHMgY29udGFpbmluZzpcbiAqIC0gdmFyaWFudDogc3RyaW5nIHVzZWQgZm9yIFwibWF0aHZhcmlhbnRcIiBhdHRyaWJ1dGUgaW4gYnVpbGRNYXRoTUwuanNcbiAqIC0gZm9udE5hbWU6IHRoZSBcInN0eWxlXCIgcGFyYW1ldGVyIHRvIGZvbnRNZXRyaWNzLmdldENoYXJhY3Rlck1ldHJpY3NcbiAqL1xuLy8gQSBtYXAgYmV0d2VlbiB0ZXggZm9udCBjb21tYW5kcyBhbiBNYXRoTUwgbWF0aHZhcmlhbnQgYXR0cmlidXRlIHZhbHVlc1xudmFyIGZvbnRNYXAgPSB7XG4gICAgLy8gc3R5bGVzXG4gICAgXCJtYXRoYmZcIjoge1xuICAgICAgICB2YXJpYW50OiBcImJvbGRcIixcbiAgICAgICAgZm9udE5hbWU6IFwiTWFpbi1Cb2xkXCIsXG4gICAgfSxcbiAgICBcIm1hdGhybVwiOiB7XG4gICAgICAgIHZhcmlhbnQ6IFwibm9ybWFsXCIsXG4gICAgICAgIGZvbnROYW1lOiBcIk1haW4tUmVndWxhclwiLFxuICAgIH0sXG5cbiAgICAvLyBcIm1hdGhpdFwiIGlzIG1pc3NpbmcgYmVjYXVzZSBpdCByZXF1aXJlcyB0aGUgdXNlIG9mIHR3byBmb250czogTWFpbi1JdGFsaWNcbiAgICAvLyBhbmQgTWF0aC1JdGFsaWMuICBUaGlzIGlzIGhhbmRsZWQgYnkgYSBzcGVjaWFsIGNhc2UgaW4gbWFrZU9yZCB3aGljaCBlbmRzXG4gICAgLy8gdXAgY2FsbGluZyBtYXRoaXQuXG5cbiAgICAvLyBmYW1pbGllc1xuICAgIFwibWF0aGJiXCI6IHtcbiAgICAgICAgdmFyaWFudDogXCJkb3VibGUtc3RydWNrXCIsXG4gICAgICAgIGZvbnROYW1lOiBcIkFNUy1SZWd1bGFyXCIsXG4gICAgfSxcbiAgICBcIm1hdGhjYWxcIjoge1xuICAgICAgICB2YXJpYW50OiBcInNjcmlwdFwiLFxuICAgICAgICBmb250TmFtZTogXCJDYWxpZ3JhcGhpYy1SZWd1bGFyXCIsXG4gICAgfSxcbiAgICBcIm1hdGhmcmFrXCI6IHtcbiAgICAgICAgdmFyaWFudDogXCJmcmFrdHVyXCIsXG4gICAgICAgIGZvbnROYW1lOiBcIkZyYWt0dXItUmVndWxhclwiLFxuICAgIH0sXG4gICAgXCJtYXRoc2NyXCI6IHtcbiAgICAgICAgdmFyaWFudDogXCJzY3JpcHRcIixcbiAgICAgICAgZm9udE5hbWU6IFwiU2NyaXB0LVJlZ3VsYXJcIixcbiAgICB9LFxuICAgIFwibWF0aHNmXCI6IHtcbiAgICAgICAgdmFyaWFudDogXCJzYW5zLXNlcmlmXCIsXG4gICAgICAgIGZvbnROYW1lOiBcIlNhbnNTZXJpZi1SZWd1bGFyXCIsXG4gICAgfSxcbiAgICBcIm1hdGh0dFwiOiB7XG4gICAgICAgIHZhcmlhbnQ6IFwibW9ub3NwYWNlXCIsXG4gICAgICAgIGZvbnROYW1lOiBcIlR5cGV3cml0ZXItUmVndWxhclwiLFxuICAgIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmb250TWFwOiBmb250TWFwLFxuICAgIG1ha2VTeW1ib2w6IG1ha2VTeW1ib2wsXG4gICAgbWF0aHN5bTogbWF0aHN5bSxcbiAgICBtYWtlU3BhbjogbWFrZVNwYW4sXG4gICAgbWFrZUZyYWdtZW50OiBtYWtlRnJhZ21lbnQsXG4gICAgbWFrZVZMaXN0OiBtYWtlVkxpc3QsXG4gICAgbWFrZU9yZDogbWFrZU9yZCxcbiAgICBzaXppbmdNdWx0aXBsaWVyOiBzaXppbmdNdWx0aXBsaWVyLFxuICAgIHNwYWNpbmdGdW5jdGlvbnM6IHNwYWNpbmdGdW5jdGlvbnMsXG59O1xuIiwiLyoqXG4gKiBUaGUgcmVzdWx0aW5nIHBhcnNlIHRyZWUgbm9kZXMgb2YgdGhlIHBhcnNlIHRyZWUuXG4gKi9cbmZ1bmN0aW9uIFBhcnNlTm9kZSh0eXBlLCB2YWx1ZSwgbW9kZSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMubW9kZSA9IG1vZGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFBhcnNlTm9kZTogUGFyc2VOb2RlLFxufTtcblxuIiwiLyogZXNsaW50IG5vLXVudXNlZC12YXJzOjAgKi9cblxudmFyIFN0eWxlID0gcmVxdWlyZShcIi4vU3R5bGVcIik7XG5cbi8qKlxuICogVGhpcyBmaWxlIGNvbnRhaW5zIG1ldHJpY3MgcmVnYXJkaW5nIGZvbnRzIGFuZCBpbmRpdmlkdWFsIHN5bWJvbHMuIFRoZSBzaWdtYVxuICogYW5kIHhpIHZhcmlhYmxlcywgYXMgd2VsbCBhcyB0aGUgbWV0cmljTWFwIG1hcCBjb250YWluIGRhdGEgZXh0cmFjdGVkIGZyb21cbiAqIFRlWCwgVGVYIGZvbnQgbWV0cmljcywgYW5kIHRoZSBUVEYgZmlsZXMuIFRoZXNlIGRhdGEgYXJlIHRoZW4gZXhwb3NlZCB2aWEgdGhlXG4gKiBgbWV0cmljc2AgdmFyaWFibGUgYW5kIHRoZSBnZXRDaGFyYWN0ZXJNZXRyaWNzIGZ1bmN0aW9uLlxuICovXG5cbi8vIFRoZXNlIGZvbnQgbWV0cmljcyBhcmUgZXh0cmFjdGVkIGZyb20gVGVYIGJ5IHVzaW5nXG4vLyBcXGZvbnRcXGE9Y21taTEwXG4vLyBcXHNob3d0aGVcXGZvbnRkaW1lblhcXGFcbi8vIHdoZXJlIFggaXMgdGhlIGNvcnJlc3BvbmRpbmcgdmFyaWFibGUgbnVtYmVyLiBUaGVzZSBjb3JyZXNwb25kIHRvIHRoZSBmb250XG4vLyBwYXJhbWV0ZXJzIG9mIHRoZSBzeW1ib2wgZm9udHMuIEluIFRlWCwgdGhlcmUgYXJlIGFjdHVhbGx5IHRocmVlIHNldHMgb2Zcbi8vIGRpbWVuc2lvbnMsIG9uZSBmb3IgZWFjaCBvZiB0ZXh0c3R5bGUsIHNjcmlwdHN0eWxlLCBhbmQgc2NyaXB0c2NyaXB0c3R5bGUsXG4vLyBidXQgd2Ugb25seSB1c2UgdGhlIHRleHRzdHlsZSBvbmVzLCBhbmQgc2NhbGUgY2VydGFpbiBkaW1lbnNpb25zIGFjY29yZGluZ2x5LlxuLy8gU2VlIHRoZSBUZVhib29rLCBwYWdlIDQ0MS5cbnZhciBzaWdtYTEgPSAwLjAyNTtcbnZhciBzaWdtYTIgPSAwO1xudmFyIHNpZ21hMyA9IDA7XG52YXIgc2lnbWE0ID0gMDtcbnZhciBzaWdtYTUgPSAwLjQzMTtcbnZhciBzaWdtYTYgPSAxO1xudmFyIHNpZ21hNyA9IDA7XG52YXIgc2lnbWE4ID0gMC42Nzc7XG52YXIgc2lnbWE5ID0gMC4zOTQ7XG52YXIgc2lnbWExMCA9IDAuNDQ0O1xudmFyIHNpZ21hMTEgPSAwLjY4NjtcbnZhciBzaWdtYTEyID0gMC4zNDU7XG52YXIgc2lnbWExMyA9IDAuNDEzO1xudmFyIHNpZ21hMTQgPSAwLjM2MztcbnZhciBzaWdtYTE1ID0gMC4yODk7XG52YXIgc2lnbWExNiA9IDAuMTUwO1xudmFyIHNpZ21hMTcgPSAwLjI0NztcbnZhciBzaWdtYTE4ID0gMC4zODY7XG52YXIgc2lnbWExOSA9IDAuMDUwO1xudmFyIHNpZ21hMjAgPSAyLjM5MDtcbnZhciBzaWdtYTIxID0gMS4wMTtcbnZhciBzaWdtYTIxU2NyaXB0ID0gMC44MTtcbnZhciBzaWdtYTIxU2NyaXB0U2NyaXB0ID0gMC43MTtcbnZhciBzaWdtYTIyID0gMC4yNTA7XG5cbi8vIFRoZXNlIGZvbnQgbWV0cmljcyBhcmUgZXh0cmFjdGVkIGZyb20gVGVYIGJ5IHVzaW5nXG4vLyBcXGZvbnRcXGE9Y21leDEwXG4vLyBcXHNob3d0aGVcXGZvbnRkaW1lblhcXGFcbi8vIHdoZXJlIFggaXMgdGhlIGNvcnJlc3BvbmRpbmcgdmFyaWFibGUgbnVtYmVyLiBUaGVzZSBjb3JyZXNwb25kIHRvIHRoZSBmb250XG4vLyBwYXJhbWV0ZXJzIG9mIHRoZSBleHRlbnNpb24gZm9udHMgKGZhbWlseSAzKS4gU2VlIHRoZSBUZVhib29rLCBwYWdlIDQ0MS5cbnZhciB4aTEgPSAwO1xudmFyIHhpMiA9IDA7XG52YXIgeGkzID0gMDtcbnZhciB4aTQgPSAwO1xudmFyIHhpNSA9IDAuNDMxO1xudmFyIHhpNiA9IDE7XG52YXIgeGk3ID0gMDtcbnZhciB4aTggPSAwLjA0O1xudmFyIHhpOSA9IDAuMTExO1xudmFyIHhpMTAgPSAwLjE2NjtcbnZhciB4aTExID0gMC4yO1xudmFyIHhpMTIgPSAwLjY7XG52YXIgeGkxMyA9IDAuMTtcblxuLy8gVGhpcyB2YWx1ZSBkZXRlcm1pbmVzIGhvdyBsYXJnZSBhIHB0IGlzLCBmb3IgbWV0cmljcyB3aGljaCBhcmUgZGVmaW5lZCBpblxuLy8gdGVybXMgb2YgcHRzLlxuLy8gVGhpcyB2YWx1ZSBpcyBhbHNvIHVzZWQgaW4ga2F0ZXgubGVzczsgaWYgeW91IGNoYW5nZSBpdCBtYWtlIHN1cmUgdGhlIHZhbHVlc1xuLy8gbWF0Y2guXG52YXIgcHRQZXJFbSA9IDEwLjA7XG5cbi8vIFRoZSBzcGFjZSBiZXR3ZWVuIGFkamFjZW50IGB8YCBjb2x1bW5zIGluIGFuIGFycmF5IGRlZmluaXRpb24uIEZyb21cbi8vIGBcXHNob3d0aGVcXGRvdWJsZXJ1bGVzZXBgIGluIExhVGVYLlxudmFyIGRvdWJsZVJ1bGVTZXAgPSAyLjAgLyBwdFBlckVtO1xuXG4vKipcbiAqIFRoaXMgaXMganVzdCBhIG1hcHBpbmcgZnJvbSBjb21tb24gbmFtZXMgdG8gcmVhbCBtZXRyaWNzXG4gKi9cbnZhciBtZXRyaWNzID0ge1xuICAgIHhIZWlnaHQ6IHNpZ21hNSxcbiAgICBxdWFkOiBzaWdtYTYsXG4gICAgbnVtMTogc2lnbWE4LFxuICAgIG51bTI6IHNpZ21hOSxcbiAgICBudW0zOiBzaWdtYTEwLFxuICAgIGRlbm9tMTogc2lnbWExMSxcbiAgICBkZW5vbTI6IHNpZ21hMTIsXG4gICAgc3VwMTogc2lnbWExMyxcbiAgICBzdXAyOiBzaWdtYTE0LFxuICAgIHN1cDM6IHNpZ21hMTUsXG4gICAgc3ViMTogc2lnbWExNixcbiAgICBzdWIyOiBzaWdtYTE3LFxuICAgIHN1cERyb3A6IHNpZ21hMTgsXG4gICAgc3ViRHJvcDogc2lnbWExOSxcbiAgICBheGlzSGVpZ2h0OiBzaWdtYTIyLFxuICAgIGRlZmF1bHRSdWxlVGhpY2tuZXNzOiB4aTgsXG4gICAgYmlnT3BTcGFjaW5nMTogeGk5LFxuICAgIGJpZ09wU3BhY2luZzI6IHhpMTAsXG4gICAgYmlnT3BTcGFjaW5nMzogeGkxMSxcbiAgICBiaWdPcFNwYWNpbmc0OiB4aTEyLFxuICAgIGJpZ09wU3BhY2luZzU6IHhpMTMsXG4gICAgcHRQZXJFbTogcHRQZXJFbSxcbiAgICBlbVBlckV4OiBzaWdtYTUgLyBzaWdtYTYsXG4gICAgZG91YmxlUnVsZVNlcDogZG91YmxlUnVsZVNlcCxcblxuICAgIC8vIFRPRE8oYWxwZXJ0KTogTWlzc2luZyBwYXJhbGxlbCBzdHJ1Y3R1cmUgaGVyZS4gV2Ugc2hvdWxkIHByb2JhYmx5IGFkZFxuICAgIC8vIHN0eWxlLXNwZWNpZmljIG1ldHJpY3MgZm9yIGFsbCBvZiB0aGVzZS5cbiAgICBkZWxpbTE6IHNpZ21hMjAsXG4gICAgZ2V0RGVsaW0yOiBmdW5jdGlvbihzdHlsZSkge1xuICAgICAgICBpZiAoc3R5bGUuc2l6ZSA9PT0gU3R5bGUuVEVYVC5zaXplKSB7XG4gICAgICAgICAgICByZXR1cm4gc2lnbWEyMTtcbiAgICAgICAgfSBlbHNlIGlmIChzdHlsZS5zaXplID09PSBTdHlsZS5TQ1JJUFQuc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNpZ21hMjFTY3JpcHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoc3R5bGUuc2l6ZSA9PT0gU3R5bGUuU0NSSVBUU0NSSVBULnNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBzaWdtYTIxU2NyaXB0U2NyaXB0O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgc3R5bGUgc2l6ZTogXCIgKyBzdHlsZS5zaXplKTtcbiAgICB9LFxufTtcblxuLy8gVGhpcyBtYXAgY29udGFpbnMgYSBtYXBwaW5nIGZyb20gZm9udCBuYW1lIGFuZCBjaGFyYWN0ZXIgY29kZSB0byBjaGFyYWN0ZXJcbi8vIG1ldHJpY3MsIGluY2x1ZGluZyBoZWlnaHQsIGRlcHRoLCBpdGFsaWMgY29ycmVjdGlvbiwgYW5kIHNrZXcgKGtlcm4gZnJvbSB0aGVcbi8vIGNoYXJhY3RlciB0byB0aGUgY29ycmVzcG9uZGluZyBcXHNrZXdjaGFyKVxuLy8gVGhpcyBtYXAgaXMgZ2VuZXJhdGVkIHZpYSBgbWFrZSBtZXRyaWNzYC4gSXQgc2hvdWxkIG5vdCBiZSBjaGFuZ2VkIG1hbnVhbGx5LlxudmFyIG1ldHJpY01hcCA9IHJlcXVpcmUoXCIuL2ZvbnRNZXRyaWNzRGF0YVwiKTtcblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGEgY29udmVuaWVuY2UgZnVuY3Rpb24gZm9yIGxvb2tpbmcgdXAgaW5mb3JtYXRpb24gaW4gdGhlXG4gKiBtZXRyaWNNYXAgdGFibGUuIEl0IHRha2VzIGEgY2hhcmFjdGVyIGFzIGEgc3RyaW5nLCBhbmQgYSBzdHlsZS5cbiAqXG4gKiBOb3RlOiB0aGUgYHdpZHRoYCBwcm9wZXJ0eSBtYXkgYmUgdW5kZWZpbmVkIGlmIGZvbnRNZXRyaWNzRGF0YS5qcyB3YXNuJ3RcbiAqIGJ1aWx0IHVzaW5nIGBNYWtlIGV4dGVuZGVkX21ldHJpY3NgLlxuICovXG52YXIgZ2V0Q2hhcmFjdGVyTWV0cmljcyA9IGZ1bmN0aW9uKGNoYXJhY3Rlciwgc3R5bGUpIHtcbiAgICB2YXIgbWV0cmljcyA9IG1ldHJpY01hcFtzdHlsZV1bY2hhcmFjdGVyLmNoYXJDb2RlQXQoMCldO1xuICAgIGlmIChtZXRyaWNzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkZXB0aDogbWV0cmljc1swXSxcbiAgICAgICAgICAgIGhlaWdodDogbWV0cmljc1sxXSxcbiAgICAgICAgICAgIGl0YWxpYzogbWV0cmljc1syXSxcbiAgICAgICAgICAgIHNrZXc6IG1ldHJpY3NbM10sXG4gICAgICAgICAgICB3aWR0aDogbWV0cmljc1s0XSxcbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtZXRyaWNzOiBtZXRyaWNzLFxuICAgIGdldENoYXJhY3Rlck1ldHJpY3M6IGdldENoYXJhY3Rlck1ldHJpY3MsXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==