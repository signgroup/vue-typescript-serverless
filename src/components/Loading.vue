<template>
    <section class="loading-box " >
        <div class='loading'>
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    </section>
</template>
<style>
   /* section{
        width:100vh;
        height:100vh;
        position:relative;
    }*/

   .loading-box {
       background: #fff;
       z-index: 999;
       height: 100%;
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       display: flex;
       align-items: center;
       justify-content: center;
       overflow: hidden;
   }
   .loading {
       position: relative;
       width: 50px;
       height: 50px;
   }
   .double-bounce1, .double-bounce2 {
       width: 100%;
       height: 100%;
       border-radius: 50%;
       background-color: #67cf22;
       opacity: 0.6;
       position: absolute;
       top: 0;
       left: 0;
       -webkit-animation: bounceAt 2.0s infinite ease-in-out;
       animation: bounceAt 2.0s infinite ease-in-out;
   }

   .double-bounce2 {
       -webkit-animation-delay: -1.0s;
       animation-delay: -1.0s;
   }

   .fade {
       -webkit-animation: fadeAt 0.8s ease-out forwards;
       animation: fadeAt 0.8s ease-out forwards;
   }

   @-webkit-keyframes fadeAt {
       0% {
           opacity: 1;
           visibility: visible;
       }
    
       100% {
           opacity: 0;
           visibility: hidden;
       }
   }

   @keyframes fadeAt {
       0% {
           opacity: 1;
           visibility: visible;
       }
    
       100% {
           opacity: 0;
           visibility: hidden;
       }
   }

   @-webkit-keyframes bounceAt {
       0%, 100% {
           -webkit-transform: scale(0.0);
       }
    
       50% {
           -webkit-transform: scale(1.0);
       }
   }

   @keyframes bounceAt {
       0%, 100% {
           transform: scale(0.0);
           -webkit-transform: scale(0.0);
       }
    
       50% {
           transform: scale(1.0);
           -webkit-transform: scale(1.0);
       }
   }


</style>
