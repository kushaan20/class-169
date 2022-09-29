AFRAME.AFRAME.registerComponent('marker-handler', {
    schema: {
        
    },

    init: async function () {
      this.el.addEventListener("markerFound",() => {
        this.markerFound()
      })

      this.el.addEventListener("markerLost",() => {
        this.markerLost()
      })
    },

    markerFound: function() {
        var buttondiv = document.getElementById("button-div");
        buttondiv.style.display = "flex"
        var ratingButton = document.getElementById("rating-button");
        ratingButton.addEventListener("click", () => {
            swal({
                title: "Rate Dish",
                text: "Work in Progress!",
                icon: "Warning",
                button: "Cancel",
              });
        })

        var orderButton = document.getElementById("order-button");
        orderButton.addEventListener("click", () => {
            swal({
                title: "Dish Succesfully Ordered",
                text: "Your Order is Being Prepared",
                icon: "Success",
                button: "Continue",
              });
        })
    },

     markerLost: function() {
       var buttondiv = document.getElementById("button-div");
       buttondiv.style.display = "none"
    },

    update: function () {
      
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
});
