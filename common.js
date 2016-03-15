// Явное указание на режим строгого соответствия современному стандарту
"use strict";

function animatedObject(type, options){
    // Назначение значений по умолчанию параметрам объекта окна, если они не были переданы в вызове
    type = type || getType();
    options = options || new Object;
    options.size = options.size || getSize();
    options.positionTop = options.positionTop || getPosition("top");
    options.positionLeft = options.positionLeft || getPosition("left");
    options.color = options.color || getColor();
    
    // Назначение значения по умолчанию свойству всплывающего окна
    this.object = null;
    // Сохранение ссылки на объект в переменной
    var self = this;
    
    function getType(){
        var objectTypes = ["square", "circle"],
            rand = Math.round( Math.random() * (1 - 0) + 0 );
        return objectTypes[rand];
    };

    function getSize(){
        var size = 0;
        switch(type){
            case "square":
                size = Math.round( Math.random() * (150 - 20) + 20 );
                break;
            case "circle":
                size = Math.round( Math.random() * (200 - 30) + 30 )
                break;
        }
        return size;
    };

    function getPosition(metrics){
        var minValue,
            mainContStyle = getComputedStyle(document.querySelector(".animation-container"));
        switch(metrics) {
            case "top":
                minValue = parseFloat( mainContStyle.height );
                break;
            case "left":
                minValue = parseFloat( mainContStyle.width );
                break;
        }
        return Math.round( Math.random() * (minValue - options.size - 0) + 0 );
    };

    function getColor(){
        return "#"+((1<<24)*Math.random()|0).toString(16);
    };

    function createObject(){
        var animatedObject = document.createElement('div');
        animatedObject.addEventListener("click", function(event){
            event.preventDefault();
            event.stopPropagation();
            self.remove();
        });
        animatedObject.setAttribute("class", "animated-object animated-object_type_"+type);
        animatedObject.style.width = options.size+"px";
        animatedObject.style.height = options.size+"px";
        animatedObject.style.top = options.positionTop+"px";
        animatedObject.style.left = options.positionLeft+"px";
        animatedObject.style.backgroundColor = options.color;
        return animatedObject;
    };
    
    this.object = createObject();
    
    document.querySelector(".animation-container").appendChild(this.object);
    
    this.remove = function(){
        document.querySelector(".animation-container").removeChild(self.object);
    };
};