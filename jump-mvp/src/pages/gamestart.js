class GameStart {

    constructor(callbacks) {
        this.callbacks = callbacks;
    }

    init() {
        console.log('game is init')
        let width = window.innerWidth,
            height = window.innerHeight;
            
        // let canvas = document.getElementById('canvas');
        let renderer = new THREE.WebGLRenderer({
            canvas: canvas,
        })

        // 绘制场景
        let scene = new THREE.Scene(),
            camera = new THREE.OrthographicCamera(-width / 2, width / 2, height /2, -height / 2, -1000, 10000);

        this.scene = scene;


        renderer.setClearColor(new THREE.Color(0x000000));
        renderer.setSize(400, 400);

        let triangleShape = new THREE.Shape();
        triangleShape.moveTo(0, 100);
        triangleShape.lineTo(-100, -100);
        triangleShape.lineTo(100, -100);
        triangleShape.lineTo(0, 100);

        // 创建一个几何体l
        let geometry = new THREE.ShapeGeometry(triangleShape);

        // 定义材质
        let material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide,
        })

        let mesh = new THREE.Mesh(geometry, material);
        this.mesh = mesh;
        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = 1;

        scene.add(mesh);
        var axesHelper = new THREE.AxesHelper( 100 );
        scene.add( axesHelper )

        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 0;
        camera.lookAt(new THREE.Vector3(0, 0, 1));

        let currentAngle = 0,
            lastTimeStmp = Date.now();
        
        let animate = function() {
            let now = Date.now(),
                duration = now - lastTimeStmp;
            lastTimeStmp = now;
            currentAngle = currentAngle + duration / 1000 * Math.PI;
        }

        let render = function() {
            animate();
            mesh.rotation.set(0, currentAngle, 0);
            renderer.render(scene, camera);
            requestAnimationFrame(render)
        }

        render();
    }

    show() {
        this.mesh.visible = true;
    }

    hide() {
        this.mesh.visible = false;
    }

    restart() {
        console.log('game page restart')
    }
}

export default GameStart;