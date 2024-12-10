import React, { useEffect } from 'react';

const Tawk = () => {
  useEffect(() => {
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function() {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/662794861ec1082f04e5d91e/1hs59oc8e';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
    
    return () => {
      const tawkScript = document.querySelector('script[src="https://embed.tawk.to/662794861ec1082f04e5d91e/1hs59oc8e"]');
      if (tawkScript) {
        tawkScript.remove();
      }
      
      const tawkWidget = document.getElementById('tawk-widget');
      if (tawkWidget) {
        tawkWidget.remove();
      }
    };
  }, []);

  return null;
}

export default Tawk;



{/* <script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/662794861ec1082f04e5d91e/1hs59oc8e';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script> */}

