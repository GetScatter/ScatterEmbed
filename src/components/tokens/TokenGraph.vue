<template>
	<section class="token-graph">
		<section class="tip" v-if="graphValue">
			<div>{{graphValue}}</div>
		</section>

		<section v-show="loading" class="no-graph">
			<i class="icon-spin4 animate-spin"></i>
		</section>
		<section v-show="!loading">
			<section class="chart" v-show="hasValues"></section>
			<section class="no-graph" v-if="!hasValues">No Price Data</section>
		</section>
	</section>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex';
	import Chartist from 'chartist';
	import PriceService from "@walletpack/core/services/apis/PriceService";
	import {dateId, utcToLocal} from "@walletpack/core/util/DateHelpers";
	import SharedFunctions from "../../util/SharedFunctions";
	require("../../styles/charts.scss");

	export default {
		props:['balances'],
		data(){return {
			chart:null,
			graphValue:null,
			hasValues:false,
			loading:false,
		}},
		computed:{
			...mapState([
				'prices',
				'priceData',
			]),
			...mapGetters([
				'displayCurrency',
			]),
		},
		mounted(){
			this.init();
		},
		methods:{
			async init(){
				if(this.priceData && this.priceData.hasOwnProperty('prices')) await this.setupGraph();
				else this.loading = true;
				await PriceService.loadPriceTimelineData();
				this.loading = false;
				this.setupGraph();
			},
			async setupGraph(){
				this.hasValues = true;
				try {
					const values = [];
					let totaled = SharedFunctions.getTokensTotaled();
					const onlyShowingSystemAndUntouchable = (() => {
						if(this.balances.length !== 2) return false;
						const tokenUnique = this.balances[0].uniqueWithChain();
						return this.balances.every(x => x.uniqueWithChain(false) === tokenUnique);
					})();
					totaled.map(({hour, data, date}, i) => {
						[date, hour] = utcToLocal(date, hour);

						let total;
						if(this.balances.length === 1 || onlyShowingSystemAndUntouchable){
							let tokenUnique = this.balances[0].uniqueWithChain(false);
							if(!this.prices[tokenUnique]) return;
							total = (data[tokenUnique] / this.prices[tokenUnique].USD) * this.prices[tokenUnique][this.displayCurrency];
						} else {
							total = this.balances.reduce((acc,balance) => {
								const priceData = data[balance.uniqueWithChain()];
								if(!priceData) return acc;

								const parsed = parseFloat(balance.fiatBalance(false, priceData * this.priceData.prices[this.displayCurrency]));
								if(isNaN(parsed)) return acc;
								acc += parsed;
								return acc;
							}, 0);
						}

						values.push({value:total, meta:`${date} ${`${hour}:00`}`});
					})

					const CHART_OPTIONS = {
						showArea:true,
						showPoint: true,
						lineSmooth: true,
						chartPadding: { top: 50, right: -20, bottom: -20, left: 0 },
						fullWidth:true,
						axisX: { showGrid: true, showLabel: true, },
						axisY: { showGrid:true, scaleMinSpace:0, showLabel: false, offset: 0, position: 'start', labelInterpolationFnc: n => this.formatNumber(n, n < 100000) },
					};

					this.$nextTick(() => {
						if(!this.chart){
							this.chart = new Chartist.Line('.chart', {
								series: [values]
							}, CHART_OPTIONS);
							this.chart.on('draw', data => {
								const toggleTooltip = (show = true) => {
									let parsed = parseFloat(data.value.y);
									if(this.balances.length !== 1) parsed = parsed.toFixed(2);
									this.graphValue = show ? `${data.meta} -- ${this.formatNumber(parsed, true)}` : null;
								}
								if (data.type === "point") {
									data.element._node.addEventListener("mouseenter", e => toggleTooltip())
									data.element._node.addEventListener("mouseleave", e => toggleTooltip(false));
								}
							});
							this.chart.on('created', ctx => {
								ctx.svg.elem('defs').elem('linearGradient', {
									id: 'gradient',
									x1: 0,
									y1: 1,
									x2: 0,
									y2: 0
								}).elem('stop', {
									offset: 0,
									'stop-color': 'rgba(7,153,255, 0)'
								}).parent().elem('stop', {
									offset: 0.5,
									'stop-color': 'rgba(7,153,255, 1)'
								});
							});
						} else {
							this.chart.update({
								series:[values]
							})
						}
						this.hasValues = !!values.length;
					})
				} catch(e){
					console.error('err', e);
				}
			},
		},
		watch:{
			['balances'](){
				this.setupGraph();
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../styles/variables";

	.no-graph {
		width:100%;
		height:180px;
		background:white;
		color:rgba(0,0,0,0.32);
		display:flex;
		justify-content: center;
		align-items: center;
		font-size: $medium;
		font-weight: bold;
	}

	.token-graph {
		height:180px;
		width:100%;
		position: relative;
		background:white;

		.tip {
			position:absolute;
			top:5px;
			right:5px;
			display:flex;
			justify-content: center;
			align-items: center;

			div {
				font-size: $font-size-standard;
				font-family: 'Poppins', sans-serif;
				font-weight: bold;
				margin:10px 20px;

			}
		}

		.chart {
			height:180px;
			width:100%;
		}
	}

</style>
