<template>
	<section>
		<Assets />
	</section>
</template>

<script>
	import Assets from "../components/misc/Assets";

	export default {
		components: {Assets},
	}
</script>

<style scoped lang="scss">
	@import "../styles/variables";

	.assets {
		height:calc(100vh - 139px);
	}


</style>