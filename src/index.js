import React from "react"
import ReactDOM from "react-dom"
import { useDrag } from "react-use-gesture"
import { useSprings, a } from "@react-spring/web"
import "./styles.css"

// Sets up 3 springs, each carries x/y coords and z-rotation
// We add up mass and friction to make the later springs heavier
// A drag gesture is tied to the view, this gives us local coordinates and pointer-down state
// This gesture updates the springs without re-rendering the view

function Cards() {
  const [props, set] = useSprings(3, i => ({ x: 0, y: -i * 30, rotateZ: 0, scale: 1 - i * 0.05, config: { mass: 1 + i * 2.5, tension: 700 - i * 100, friction: 30 + i * 20 } }), [])
  const bind = useDrag(({ offset: [x, y], down }) => set(i => ({ x: x + down * i * 20, y: y - i * 30 - down * i * 120, rotateZ: down * i * 10 })))
  return [...new Array(3)].map((_, index) => <a.div key={index} {...bind()} style={props[3 - index - 1]} />)
}

ReactDOM.render(<Cards />, document.getElementById("root"))
