import React, { useEffect } from "react";

const Particles = () => {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");

    let requestId;
    let balls = [];

    const maxSpeed = 0.15;
    const numBalls = (canvas.width * canvas.height) / 100000;

    function genBall() {
      balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * maxSpeed * 2 - maxSpeed,
        vy: Math.random() * maxSpeed * 2 - maxSpeed,
      });
    }

    function getDist(b1, b2) {
      var dist = Math.sqrt((b1.x - b2.x) ** 2 + (b1.y - b2.y) ** 2);
      return dist;
    }

    var user = { x: null, y: null };

    canvas.onmousemove = function (e) {
      var rect = canvas.getBoundingClientRect();
      user.x = e.clientX - rect.left;
      user.y = e.clientY - rect.top;
    };

    canvas.addEventListener(
      "mouseout",
      () => {
        user.x = null;
        user.y = null;
      },
      false
    );

    for (let i = 0; i < numBalls; i++) genBall();

    const render = () => {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      balls.map((ball) => {
        balls.map((oBall) => {
          var dist = getDist(ball, oBall);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(150,150,150, ${1 - dist / 150})`;
            ctx.moveTo(ball.x, ball.y);
            ctx.lineTo(oBall.x, oBall.y);
            ctx.stroke();
          }
        });

        var dist = getDist(ball, user);
        if (dist < 250) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(79, 70, 229, ${1 - dist / 250})`;
          ctx.moveTo(ball.x, ball.y);
          ctx.lineTo(user.x, user.y);
          ctx.stroke();
        }
        ctx.fillStyle = "gray";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, 2, 0, 2 * Math.PI);
        ctx.fill();
        if (ball.x > canvas.width || ball.x < 0) {
          ball.vx = -ball.vx;
        }
        if (ball.y > canvas.height || ball.y < 0) {
          ball.vy = -ball.vy;
        }
        ball.x += ball.vx;
        ball.y += ball.vy;
      });

      requestId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(requestId);
    };
  });

  if (typeof window !== "undefined") {
    return (
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="select-none"
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          width: "100vw",
          height: "100vh",
          opacity: 0.5,
        }}
      />
    );
  } else {
    return <></>;
  }
};

export default Particles;
