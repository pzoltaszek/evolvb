<script>
    export let active;
</script>

{#if active === true}

<div class="loadingRectangleBody">
  <p class="dotClassText">Loading...</p>
      <div id="dot" class="dotClass"></div>
      <div id="dot" class="dotClass"></div>
</div>
{/if}

<style>
  .dotClassText {
    color: #ff3e00;
    text-shadow:
			0 0 1px #fff,
    		0 0 7px #ff3e00,
    		0 0 10px #ff3e00,
    		0 0 21px #ff3e00,
    		0 0 42px #ff3e00,
    		0 0 82px #ff3e00;
    position: absolute;
    left:calc(50% - 100px);
    top:calc(50% - 125px);
  }

  .loadingRectangleBody {
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    border: 1px solid black;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.8); 
    animation: showLoadingRectangle 0.8s 1;
  }

  .dotClass {
    height: 0.6em;
    width: 0.6em;
    border-radius: 0.3em;
    background: #ff3e00;
    box-shadow:
			0 0 1px #fff,
    		0 0 7px #ff3e00,
    		0 0 10px #ff3e00,
    		0 0 21px #ff3e00,
    		0 0 42px #ff3e00,
    		0 0 82px #ff3e00;
    position: absolute;
    left:calc(50% - 100px);
    top:calc(50% - 75px);
    animation: dot_animation 3.5s  infinite;
    animation-timing-function: linear;
  }

  @keyframes dot_animation {
    50% {
        left:calc(50% + 100px);
    }

    100% {
        left:calc(50% - 100px);
    }
  }
   
  @keyframes showLoadingRectangle {
    0% {opacity: 0.0};
    100% {opacity: 1.0};
  }
  </style>