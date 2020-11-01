<script>
    export let active;
    $: console.log(active)
</script>

{#if active === true}
<div class="loadingRectangleBody">
    <div class="LoadingRectangleDiv">
      <div id="line_b" class="line_1"></div>
      <div id="line_r" class="line_2"></div>
      <div id="line_t" class="line_3"></div>
      <div id="line_l" class="line_4"></div>
    </div>
  </div>
{/if}

  <style>
      .loadingRectangleBody {
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    border: 1px solid black;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgba(0,0,0,0.8); /* Black w/ opacity */ 
    animation: showLoadingRectangle 0.8s 1;
  }
    .LoadingRectangleDiv {
      width: 150px;
      height: 150px;
      background-color: white; /*#3c5586; */
      display: flex;
      /* flex-direction: row; */
      align-items: center;
      justify-content: space-evenly;
      /* font-size: calc(10px + 2vmin); */
      text-align: center;
      position: absolute;
      background-color: rgba(255, 255, 255, 0);
      left:calc(50% - 75px);
      top:calc(50% - 75px);
    }
  
    .line_1, .line_2, .line_3, .line_4 {
      height: 0.4em;
      width: 0.4em;
      background: white; 
    }

    #line_b{
        animation: line_animation 2s infinite;
        animation-delay: 0s;
      }
     
    #line_r{
      animation: line_animation 2s infinite;
      animation-delay: 0.5s;
    }
    #line_t{
        animation: line_animation 2s infinite;
        animation-delay: 1s;
      }
    
    #line_l{
      animation: line_animation 2s infinite;
      animation-delay: 1.5s;
    }
    
 
    
   
    @keyframes line_animation {
        0% {
            height: 0.4em;
            width: 0.4em;
        }
        25% {
            height: 0.8em;
            width: 0.8em;
        }
        50% {
            height: 0.4em;
            width: 0.4em;
        }
        100% {
            height: 0.4em;
            width: 0.4em;
        }
    }
   
    @keyframes showLoadingRectangle {
      0% {opacity: 0.0};
      100%{opacity: 1.0};
  }
  </style>