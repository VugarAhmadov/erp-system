export const particleConfig = {
  background: { color: { value: "#212121" } },
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: { enable: true, mode: "repulse" },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 100,
        duration: 2,
        opacity: 1,
        size: 20,
      },
      repulse: {
        distance: 100,
        duration: 0.5,
      },
    },
  },
  particles: {
    color: {
      value: "#4dd0e1",
    },
    links: {
      color: "#4dd0e1",
      distance: 120,
      enable: true,
      opacity: 1,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 180,
    },
    opacity: {
      value: 1,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 2,
    },
  },
  detectRetina: true,
};
