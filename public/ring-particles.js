/**
 * Ring Particles Houdini Paint Worklet
 * File: ring-particles.js
 */

registerPaint(
  "ring-particles",
  class {
    // Định nghĩa các biến CSS mà Worklet sẽ lắng nghe
    static get inputProperties() {
      return [
        "--ring-x",
        "--ring-y",
        "--ring-radius",
        "--particle-count",
        "--particle-size",
        "--particle-color",
        "--animation-tick",
        "--ring-interactive",
        "--seed",
      ];
    }

    paint(ctx, geom, props) {
      // 1. Lấy và chuẩn hóa dữ liệu từ CSS
      const mouseXPercent = parseFloat(props.get("--ring-x")) || 50;
      const mouseYPercent = parseFloat(props.get("--ring-y")) || 50;
      const mouseX = (mouseXPercent / 100) * geom.width;
      const mouseY = (mouseYPercent / 100) * geom.height;

      const radius = parseFloat(props.get("--ring-radius")) || 150;
      const count = parseInt(props.get("--particle-count")) || 80;
      const size = parseFloat(props.get("--particle-size")) || 2;
      const tick = parseFloat(props.get("--animation-tick")) || 0;
      const isInteractive = parseFloat(props.get("--ring-interactive")) || 0;
      const color = props.get("--particle-color").toString() || "white";
      const seedValue = parseInt(props.get("--seed")) || 200;

      // 2. Hàm tạo số ngẫu nhiên có kiểm soát (Pseudo-random)
      // Giúp vị trí hạt không bị nhảy loạn khi re-render
      let seed = seedValue;
      const random = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };

      ctx.fillStyle = color;

      // 3. Vòng lặp vẽ hạt
      for (let i = 0; i < count; i++) {
        // Tính toán vị trí hạt dựa trên vòng tròn (Ring)
        // Thêm biến 'tick' từ CSS animation để tạo hiệu ứng xoay mượt mà
        const angle = (i / count) * Math.PI * 2 + tick * Math.PI * 2;

        // Thêm một chút độ lệch ngẫu nhiên cho hạt trông tự nhiên hơn
        const offset = (random() - 0.5) * 20;
        let px = geom.width / 2 + Math.cos(angle) * (radius + offset);
        let py = geom.height / 2 + Math.sin(angle) * (radius + offset);

        // 4. LOGIC ĐẨY HẠT (Repulsion)
        if (isInteractive === 1) {
          const dx = px - mouseX;
          const dy = py - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repulseRadius = 120; // Bán kính vùng đẩy (pixels)

          if (distance < repulseRadius) {
            // Lực đẩy mạnh dần khi chuột càng gần hạt
            const force = (repulseRadius - distance) / repulseRadius;
            const repulsionAngle = Math.atan2(dy, dx);

            // Dịch chuyển tọa độ hạt ra xa
            px += Math.cos(repulsionAngle) * force * 80;
            py += Math.sin(repulsionAngle) * force * 80;

            // Tăng kích thước hạt nhẹ khi bị đẩy (tạo hiệu ứng thị giác)
            ctx.globalAlpha = 0.8;
          } else {
            ctx.globalAlpha = 0.4;
          }
        }

        // 5. Tiến hành vẽ hạt lên Canvas
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  },
);
