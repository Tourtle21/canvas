class Rect {

	constructor(x, y, w, h) {
		this.x = x
		this.y = y
		this.w = w
		this.h = h
	}

	collidesWith(other) {
		return (this.x < other.x + other.w &&
				this.x + this.w > other.x &&
				this.y < other.y + other.h &&
				this.h + this.y > other.y)
	}

	toString() {return "[object Rect]"}

}

class GameObject {

	constructor(game, rect, color="#F00") {
		if (!(rect instanceof Rect)) {
			this.rect = new Rect(rect[0], rect[1], rect[2], rect[3])
		}
		else {
			this.rect = rect
		}
		this.game = game
		this.col = this.game.entities
		this.color = color

		this.col.push(this)
	}

	move(speed, xdir, ydir) {
		let nx = speed * xdir * (this.game.deltaT/16)
		let ny = speed * ydir * (this.game.deltaT/16)
		let xMoved = 0
		let yMoved = 0
		let temp = [this.rect.x, this.rect.y]
		this.rect.x += nx
		this.rect.y += ny

		// collision detection
		for (let i = 0; i < this.col.length; i++) {
			if (this.rect.collidesWith(this.col[i].rect) && this != this.col[i]) {
				if (nx > 0) {
					this.rect.x = this.col[i].rect.x-this.rect.w
				}

				if (nx < 0) {
					this.rect.x = this.col[i].rect.x+this.col[i].rect.w
				}

				if (ny > 0) {
					this.rect.y = this.col[i].rect.y-this.rect.h
				}

				if (ny < 0) {
					this.rect.y = this.col[i].rect.y+this.col[i].rect.h
				}	
			}
		}

		xMoved = this.rect.x - temp[0]
		yMoved = this.rect.y - temp[1]

		return [xMoved, yMoved]
	
	}

	toString() {return "[Object GameObject]"}

}

class Game {
	
	constructor() {
		this.maxFPS = 60

		// Canvas initialization
		this.canvas = document.createElement("canvas")
		this.canvas.width = 1000
		this.canvas.height = 562
		this.canvas.tabIndex = 1
		this.canvas.style.outline = "none"
		this.canvas.style.backgroundColor = "black"
		this.context = this.canvas.getContext("2d")
		document.body.insertBefore(this.canvas, document.body.childNodes[0])
		this.lastframe = +new Date

		// Event Listeners

		this.keyState = {}

		this.canvas.addEventListener("keydown", (e) => {this.keyState[e.code] = true})
		this.canvas.addEventListener("keyup", (e) => {this.keyState[e.code] = false})

		
		this.entities = []

		this.player = new GameObject(this, [10, 10, 10, 10])
		this.update()

	}

	drawRect(color, rect) {
		this.context.fillStyle = color
		this.context.fillRect(rect.x, rect.y, rect.w, rect.h)
	}

	update() {
		this.clearScreen()

		this.now = +new Date
		this.deltaT = this.now - this.lastframe

		if (this.deltaT < 64) {

			// update game logic
			for (let i = 0; i < this.entities.length; i++) {
				
			}

			// event handling
			if (this.keyState["KeyW"]) {
				this.player.move(3, 0, -1)
			}

			if (this.keyState["KeyA"]) {
				this.player.move(4, -1, 0)
			}

			if (this.keyState["KeyS"]) {
				this.player.move(4, 0, 1)
			}

			if (this.keyState["KeyD"]) {
				this.player.move(4, 1, 0)
			}

			// draw
			for (let i = 0; i < this.entities.length; i++) {
				this.drawRect(this.entities[i].color, this.entities[i].rect)
			}
		}

		this.lastframe = this.now

		window.requestAnimationFrame(this.update.bind(this)) 
	}

	clearScreen() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

}

let hey = new Game()