<script>
export let target;
</script>


<div
class='targetMark'
style="width:{5}px;
height:{5}px;
top:{target.y - 2}px;
left:{target.x - 2}px;
position:absolute;"></div>

<style>
.targetMark{
    background-color: #ff3e00;
    animation: hideTargetMark 3.0s 1;
}

@keyframes hideTargetMark {
    0% {opacity: 1.0};
    100% {opacity: 0.0};
  }
    
</style>