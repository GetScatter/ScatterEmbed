<template>
	<button :disabled="disabled || loading" :class="{'blue':blue, 'white':white, 'red':red, 'big':big, 'small':small, 'icon':icon && !text}" @click="click && !loading ? click() : ()=>{}">
		<span v-if="icon" class="icon" :class="icon"></span>
		<span v-if="loading" class="loading icon-spin4 animate-spin"></span>
		<span v-if="text">{{text}}</span>
	</button>
</template>

<script>
	export default {
		props:['white','text','click', 'blue', 'red', 'disabled', 'big', 'icon', 'small', 'loading']
	}
</script>

<style scoped lang="scss">
	@import "../../styles/variables";


	button {
		display: inline-block;
		padding: 10px 14px;
		background-color: lighten($blue, 40%);
		border: 1px solid lighten($blue, 40%);
		border-radius: $radius;
		text-transform: uppercase;
		color: $blue;
		text-decoration: none;
		position: relative;
		overflow: hidden;
		font-family: 'Poppins', sans-serif;
		font-weight:bold;
		font-size:$font-size-standard;
		transition:background-color 0.12s ease-in-out;
		cursor: pointer;
		outline:0;

		@media (max-width: $breakpoint-mobile) {
        padding:8px 10px;
        font-size:$font-size-small;
    }

		&.button-text {
			background: transparent !important;
			box-shadow: none !important;
			padding-right:1rem;
			position:relative;
		}

		&.button-small {
			padding: .34rem .6rem !important;
			font-size:1rem;
		}

		&.white {
			color: $blue;
			background-color:darken($white, 5%);
			border-color: $white;
			box-shadow:none;

			&:hover {
				color:darken($blue, 5%);
				border-color: darken($white, 8%);
				background-color:darken($white, 8%);
			}
		}



		&:hover {
			color:white;
			background-color:darken($blue, 5%);
		}

		&.blue {
			background:$blue;
			color:$white;
			border:1px solid $darkblue;
		}

		&.red {
			background:$red;
			color:$white;
			border:0;
		}

		&.big {
			padding:6px 18px;
			font-size: $large;
		}

		&.small {
			padding:4px 6px;
			font-size: $small;
		}

		&.icon {
			padding:0 8px;
		}

		.loading {
			margin-right:10px;
			display:inline-block;
		}

		&:disabled {
			opacity:0.6;
			cursor: not-allowed;
		}
	}


</style>
