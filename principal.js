var juego = new Phaser.Game(800, 450, Phaser.CANVAS, 'bloque_juego');
var fondoJuego;
var batamon; 
var teclaArriba;
var teclaAbajo;
var teclaDerecha;
var teclaIzquierda;
var musicaFondo; 

var estadoPrincipal = {
    preload: function(){
        juego.load.image('fondo', 'img/fondo_kirby.png');
        juego.load.spritesheet('batamon', 'img/kirby.png', 18, 17); 
        juego.load.audio('sonido_fondo', 'img/fondo_sound.mp3');
    },
    
    create: function(){
        juego.physics.startSystem(Phaser.Physics.ARCADE);

        fondoJuego = juego.add.tileSprite(0, 0, 800, 450, 'fondo');
        fondoJuego.tileScale.setTo(800/1920, 450/1080);
        
        musicaFondo = juego.add.audio('sonido_fondo');
        musicaFondo.loopFull(1); 

        batamon = juego.add.sprite(100, 335, 'batamon'); 
        batamon.scale.setTo(3, 3);
        batamon.anchor.setTo(0.5, 0.5); 
        
        juego.physics.arcade.enable(batamon);
        batamon.body.gravity.y = 800; 
        batamon.body.collideWorldBounds = true; 
        
        batamon.animations.add('caminar', [0, 1, 2, 3], 10, true);

        teclaDerecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        teclaIzquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        teclaArriba = juego.input.keyboard.addKey(Phaser.Keyboard.UP);
        teclaAbajo = juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    },
    
    update: function(){
        fondoJuego.tilePosition.x -= 3; 
        
        batamon.body.velocity.x = 0; 
        var velocidadHorizontal = 250; 
        
        var alturaSuelo = 360; 
        
        if (batamon.y >= alturaSuelo) {
            batamon.y = alturaSuelo;
            batamon.body.velocity.y = 0; 
        }


        if(teclaDerecha.isDown){
            batamon.body.velocity.x = velocidadHorizontal;
            batamon.animations.play('caminar');
            batamon.scale.x = 3; 
        } else if(teclaIzquierda.isDown){
            batamon.body.velocity.x = -velocidadHorizontal;
            batamon.animations.play('caminar');
            batamon.scale.x = -3; 
        } else {
            batamon.animations.stop();
            batamon.frame = 1;
        }

        if(teclaArriba.isDown && batamon.y >= alturaSuelo){
            batamon.body.velocity.y = -400; 
        } 
        
        if(teclaAbajo.isDown){
        }
    }
}

juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');