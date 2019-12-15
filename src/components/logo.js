import React from 'react'

const Logo = () => (
  <svg viewBox="0 0 47.5 30" shape-rendering="crispEdges">
    <g transform="translate(5, 5)">
      <polygon
        points="0,0
                     5,0
                     7.5,10
                     10,0
                     15,0
                     17.5,10
                     15,20
                     12.5,10
                     10,20
                     5,20"
      />
      <polygon
        points="21,0
                     26,0
                     21,20
                     16,20"
      />
      <path
        d="M 27 0,
             L 30.125 0,
             A 7.5 7.5, 0, 0, 1, 30.125 15,
             L 23.25 15,
             L 24.5 10,
             L 30.125 10,
             A 2.5 2.5, 0, 0, 0, 30.125 5,
             L 25.75 5
             Z"
      />
    </g>
  </svg>
)

export default Logo
