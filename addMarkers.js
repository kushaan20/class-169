AFRAME.registerComponent('create-markers', {
    schema: {
        
    },

    init: async function () {
      var mainScene = document.querySelector("main-scene")
      var dishes = await this.getDishes()
      dishes.map(dish => {
        var marker = document.createElement("a-marker")
        marker.setAttribute("id",dish.dish_id)
        marker.setAttribute("type","pattern")
        marker.setAttribute("url",dish.marker_pattern_url)
        marker.setAttribute("cursor",{origin:"mouse"})
        marker.setAttribute("marker-handler",{})
        mainScene.appendChild(marker)

        var model = document.createElement("a-entity")
        model.setAttribute("id",`model-${dish.dish_id}`)
        model.setAttribute("position",dish.model_geometry.position)
        model.setAttribute("rotation",dish.model_geometry.rotation)
        model.setAttribute("scale",dish.model_geometry.scale)
        model.setAttribute("gltf-model",`url(${dish.model_url})`)
        model.setAttribute("gesture-handler",{})
        marker.appendChild(model) 

        var mainPlane = document.createElement("a-entity")
        mainPlane.setAttribute("id",`mainPlane-${dish.dish_id}`)
        mainPlane.setAttribute("position",{x:0, y:0, z:0})
        mainPlane.setAttribute("rotation", {x:-90, y:0, z:0})
        mainPlane.setAttribute("width",1.7)
        mainPlane.setAttribute("height",1.5)
        marker.appendChild(mainPlane) 

        var titlePlane = document.createElement("a-entity")
        titlePlane.setAttribute("id",`titlePlane-${dish.dish_id}`)
        titlePlane.setAttribute("position",{x:0, y:0.89, z:0.02})
        titlePlane.setAttribute("rotation", {x:0, y:0, z:0})
        titlePlane.setAttribute("width",1.69)
        titlePlane.setAttribute("height",0.3)
        titlePlane.setAttribute("material",{color:"#F0C30F"})
        mainPlane.appendChild(titlePlane) 

        var dishTitle = document.createElement("a-entity")
        dishTitle.setAttribute("id",`dishTitle-${dish.dish_id}`)
        dishTitle.setAttribute("position",{x:0, y:0, z:0.1})
        dishTitle.setAttribute("rotation", {x:0, y:0, z:0})
        dishTitle.setAttribute("text",{
            font:"monoid",
            color:"black",
            width:1.8,
            height:1,
            align:"center",
            value:dish.dish_name.toUpperCase()
        })
        titlePlane.appendChild(dishTitle)

        var ingredients = document.createElement("a-entity")
        ingredients.setAttribute("id",`ingredients-${dish.dish_id}`)
        ingredients.setAttribute("position",{x:0.3, y:0, z:0.1})
        ingredients.setAttribute("rotation", {x:0, y:0, z:0})
        ingredients.setAttribute("text",{
            font:"monoid",
            color:"black",
            width:2,
            height:1,
            align:"center",
            value:`${dish.ingredients.toUpperCase().join("\n\n")}`
        })
        mainPlane.appendChild(ingredients)
      })
    },

    getDishes:  async function () {
        return await firebase.firestore().collection("dishes").get().then(snacks => {
            return snacks.docs.map(doc => doc.data())
        })
    },

    update: function () {
      
    },

    remove: function () {
      
    },

    tick: function (time, timeDelta) {
      
    }
});
