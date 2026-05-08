var juego = new Phaser.Game(800, 450, Phaser.CANVAS, 'bloque_juego');
var fondoJuego;
var batamon; 
var teclaArriba;
var teclaAbajo;
var teclaDerecha;
var teclaIzquierda;

var estadoPrincipal = {
    preload: function(){
        juego.load.image('fondo', 'img/fondo_kirby.png');
        
        juego.load.spritesheet('batamon', 'img/kirby.png', 18, 17); 
    },
    
    create: function(){
        fondoJuego = juego.add.tileSprite(0, 0, 800, 450, 'fondo');
        fondoJuego.tileScale.setTo(800/1920, 450/1080);
        
        batamon = juego.add.sprite(100, 335, 'batamon'); 
        
        batamon.scale.setTo(3, 3);
        
        batamon.animations.add('caminar', [0, 1, 2, 3], 10, true);
        batamon.animations.play('caminar');

        teclaDerecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        teclaIzquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        teclaArriba = juego.input.keyboard.addKey(Phaser.Keyboard.UP);
        teclaAbajo = juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    },
    
    update: function(){
        fondoJuego.tilePosition.x -= 3; 
        
        var velocidad = 5; 
        
        if(teclaDerecha.isDown){
            batamon.x += velocidad;
        } else if(teclaIzquierda.isDown){
            batamon.x -= velocidad;
        } else if(teclaArriba.isDown){
            batamon.y -= velocidad;
        } else if(teclaAbajo.isDown){
            batamon.y += velocidad;
        }
    }
}

juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');