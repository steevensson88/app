cc.define('cc.models.Product', function(){});

cc.models.Product.prototype.getImage = function(size){
    for (var i = 0; i < this.images.length; i++) {
        if (this.images[i].sizeName.toLowerCase() === size){
            return this.images[i].url;
        }
    }

    return cc.Config.mediaPlaceholder;
};

cc.models.Product.prototype.getAllImages = function(){

    if (!this._allImages){
        this._allImages = [{ url: this.getImage('large') }].concat(this.imagesAlt);
    }

    return this._allImages;
};

//TODO: This is pure shit. I need to talk to Felix got get that clean
//It's only in here to keep some German clients happy that rely on it.
//We need to make it more flexibile & localizable
cc.models.Product.prototype.getBasePriceInfo = function(){
    if (this.custom1 > 0){
        if (this.custom3 === 'kg'){
            return 'entspricht ' + cc.Util.toFixed(this.custom1, 2) + ' € pro 1 Kilogramm (kg)';
        }
        else if (this.custom3 === 'St'){
            return 'entpricht ' + cc.Util.toFixed(this.custom1, 2) + ' € pro 1 Stück (St)';
        }
        else if (this.custom3 === 'L'){
            return 'entpricht ' + cc.Util.toFixed(this.custom1, 2) + ' € pro 1 Liter (l)';
        }
        else if (cc.Util.isString(this.custom3) && this.custom3.length > 0){
            return 'entpricht ' + cc.Util.toFixed(this.custom1, 2) + ' € pro ' + this.custom3;
        }
    }

    return '';
};

cc.models.Product.prototype.hasVariants = function(){
    return this.variants && this.variants.length > 0;
};