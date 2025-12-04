// === J1 / J2 전용 대시보드 ===

// 심플 슬라이더 생성기 (HTML range)

// === 제어 로직 ===
let init = false;
// angles[0] = J1, angles[1] = J2
let angles = [0, 0];
// 모드 전환용 변수, false = SVG, true = Monkey FK 모드
let useSimpleFK = false;

function createSlider(parent, cfg, id, min, max, initial) {
  const [W, X, Y] = cfg;

  parent
    .append("foreignObject")
    .attr("x", X)
    .attr("y", Y)
    .attr("width", W)
    .attr("height", 30).html(`
            <input 
                type="range" 
                id="${id}"
                min="${min}" 
                max="${max}" 
                value="${initial}" 
                style="width:${W}px"
            />
        `);
}

// 버튼 생성기 (HTML button)
function createButton(parent, cfg, id, label) {
  const [W, X, Y] = cfg;

  parent
    .append("foreignObject")
    .attr("x", X)
    .attr("y", Y)
    .attr("width", W)
    .attr("height", 30).html(`
            <button id="${id}" style="width:${W}px; height:28px;">${label}</button>
        `);
}

// 팝업에 J1/J2/Speed 슬라이더 + 버튼 표시
function dashboard() {
  w2popup.resize(400, 220);
  window.onresize = () => {
    w2popup.resize(400, 220);
  };
  w2popup.on("close", () => {
    // 키보드 이벤트 같은 거 더 이상 안 씀
  });

  const popup_box = select("#dashboard");
  popup_box.html(""); // 기존 내용 싹 지우기
  popup_box.style("user_select", "none");

  const frame = popup_box
    .append("svg")
    .attr("width", 400)
    .attr("height", 260)
    .style("background", "#fff")
    .style("border", "1px solid #ddd");

  // 제목
  frame
    .append("text")
    .attr("x", 15)
    .attr("y", 25)
    .attr("font-size", "12px")
    .text("J1 / J2 Joint Angle Control");

  const sliderWidth = 260;
  const sliderX = 120;

  // J2 슬라이더
  const J2 = frame.append("g");
  J2.append("text")
    .attr("x", 15)
    .attr("y", 70)
    .attr("font-size", "12px")
    .text("J2 (deg)");
  createSlider(J2, [sliderWidth, sliderX, 60], "angle_J2", 0, 120, 0);

  // J1 슬라이더
  const J1 = frame.append("g");
  J1.append("text")
    .attr("x", 15)
    .attr("y", 115)
    .attr("font-size", "12px")
    .text("J1 (deg)");
  createSlider(J1, [sliderWidth, sliderX, 105], "angle_J1", -120, 120, 0);

  // 속도 슬라이더
  const speed = frame.append("g");
  speed
    .append("text")
    .attr("x", 15)
    .attr("y", 160)
    .attr("font-size", "12px")
    .text("Speed");
  createSlider(speed, [sliderWidth, sliderX, 150], "angle_speed", 0, 100, 100);

// === Pen Up/Down 버튼 ===
const penBtn = frame.append("g");
createButton(penBtn, [100, 50, 200], "pen_toggle_btn", "Pen Up");

// 버튼 내부 상태
let penIsDown = false;

// 버튼 이벤트
select("#pen_toggle_btn").on("click", () => {
  penIsDown = !penIsDown;

  // ★★★ 핵심: p5에서 쓰는 currentPen을 여기서 직접 바꿔준다
  currentPen = penIsDown ? 1 : 0;

  // 버튼 텍스트 변경
  select("#pen_toggle_btn").text(penIsDown ? "Pen Down" : "Pen Up");

  console.log("Pen toggled →", penIsDown ? "DOWN (1)" : "UP (0)");
});


  // Monkey FK 버튼
  const fkBtn = frame.append("g");
  createButton(fkBtn, [120, 200, 240], "fk_draw_btn", "Monkey FK Draw");

  // SVG Draw 버튼
  const drawBtn = frame.append("g");
  createButton(drawBtn, [120, 200, 200], "svg_draw_btn", "SVG Draw");

  // 버튼 이벤트  <-- 여기에 넣어야 한다
  select("#svg_draw_btn").on("click", () => {
    // 기존 동작 유지
    useSimpleFK = false;
    pathPoints = [];
    if (trailLayer) trailLayer.clear();

    // === 드로잉 모드 진입 필수 코드 ===
    isPlaying = true;
    useSvgAsMotion = true;
    svgIndex = 0;

    console.log("SVG drawing mode activated");
  });

  select("#fk_draw_btn").on("click", () => {
    useSimpleFK = true;
    pathPoints = [];
  });
}

// // === 제어 로직 ===
// let init = false;
// // angles[0] = J1, angles[1] = J2
// let angles = [0, 0];
// // 모드 전환용 변수, false = SVG, true = Monkey FK 모드
// let useSimpleFK = false;

function control() {
  // 1) 첫 호출에서 엔코더 값으로 초기화
  if (!init) {
    init = true;

    angles = [
      Math.round($("encoder.joint_1").d), // J1
      Math.round($("encoder.joint_2").d), // J2
    ];

    // 슬라이더에 현재 각도 반영
    if (select("#angle_J1").node()) {
      select("#angle_J1").property("value", angles[0]);
    }
    if (select("#angle_J2").node()) {
      select("#angle_J2").property("value", angles[1]);
    }

    // 속도 기본값 100
    if (select("#angle_speed").node()) {
      select("#angle_speed").property("value", 100);
    }
  }

  // 2) 매 프레임마다 슬라이더 값 읽어서 angles[] 업데이트
  if (select("#angle_J1").node()) {
    $("encoder.joint_1").d = parseInt(select("#angle_J1").property("value"));
  }
  if (select("#angle_J2").node()) {
    $("encoder.joint_2").d = parseInt(select("#angle_J2").property("value"));
  }

  // 3) 속도 슬라이더 → joint.max_speed
  if (select("#angle_speed").node()) {
    $("joint.max_speed").d =
      parseInt(select("#angle_speed").property("value")) || 100;
  }
}
