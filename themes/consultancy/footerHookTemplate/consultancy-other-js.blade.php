<script>

   $(document).ready(function(){
       $(".consulting_single_counter__count").each(function() {
           $(this).isInViewport(function(status) {

               if (status === "entered") {
                   for (var i = 0; i < document.querySelectorAll(".odometer").length; i++) {
                       var el = document.querySelectorAll('.odometer')[i];
                       el.innerHTML = el.getAttribute("data-odometer-final");
                   }
               }
           });
       });
   })


</script>
