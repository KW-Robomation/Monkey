function sketch() {
    pop_sketch();
    let pCanvas = new p5((p) => {
        p.setup = function () {
            psetup(p);
        };
    
        p.draw = () => {
            pdraw(p);
        };
    }, "p5-canvas");
}

let canvasWidth, canvasHeight;

let minAngleJoint1;
let angleRangeJoint2, minAngleJoint2, maxAngleJoint2;

let link1Wheelbase, link2Wheelbase;

let arm1, arm2, armTop, armTopClose;
let arm1Path, arm2Path, armTopPath, armTopClosePath;

let body, body2, bodyTop;
let bodyPath, body2Path, bodyTopPath;

let currentAngleJoint1, currentAngleJoint2; // 2관절
let newAngleJoint1, newAngleJoint2;

let x1, y1;
let x0, y0;
const scale = 0.5;
const moreHeight = 100;

function pop_sketch() {
    const option = {
      title: "Simulator",
      body: '<div id="p5-canvas"></div>',
      width: 1,
      height: 1,
      modal: true,
      actions: {},
    }
    w2custompopup.open(option);
}

// setup
function psetup(p) {
  canvasWidth = 1200 * scale + 600;
  canvasHeight = 900 * scale + moreHeight;

  minAngleJoint1 = 0;

  angleRangeJoint2 = -120;
  minAngleJoint2 = 0;
  maxAngleJoint2 = minAngleJoint2 + angleRangeJoint2;

  link1Wheelbase = 388;
  link2Wheelbase = 388;

  arm1Path = spine.images.get("arm1_side.png");
  arm2Path = spine.images.get("arm2_side.png");
  bodyPath = spine.images.get("body_side.png");
  body2Path = spine.images.get("body2_side.png");
  bodyTopPath = spine.images.get("body_top.png");
  armTopPath = spine.images.get("arm_top.png");
  armTopClosePath = spine.images.get("arm_top_close.png");
  
  arm1 = p.loadImage(arm1Path);
  arm2 = p.loadImage(arm2Path);
  body = p.loadImage(bodyPath);
  body2 = p.loadImage(body2Path);
  bodyTop = p.loadImage(bodyTopPath);
  armTop = p.loadImage(armTopPath);
  armTopClose = p.loadImage(armTopClosePath);

  x1 = 1200;
  y1 = canvasHeight + 100 + moreHeight;

  x0 = 400;
  y0 = 825 + moreHeight;

  currentAngleJoint1 = p.radians(minAngleJoint1);
  currentAngleJoint2 = p.radians(minAngleJoint2 - 90);

  w2custompopup.resize(canvasWidth + 16, canvasHeight + 46);
  p.createCanvas(canvasWidth, canvasHeight);
}

// draw
function pdraw(p) {
  p.background(250);
  p.scale(scale);

  // 2관절 끝점 계산
  let x2 = x1 + link1Wheelbase * p.cos(currentAngleJoint2);
  let y2 = y1 + link1Wheelbase * p.sin(currentAngleJoint2);

  let x3 = x2 + link2Wheelbase * p.cos(currentAngleJoint2 + currentAngleJoint2);
  let y3 = y2 + link2Wheelbase * p.sin(currentAngleJoint2 + currentAngleJoint2);

  // 바디 그리기
  p.image(bodyTop, x0 - 145, y0 - 185);

  p.push();
  p.translate(x2, y2);
  p.rotate(currentAngleJoint2 + currentAngleJoint2);
  p.image(arm2, -65, -70);
  p.pop();

  p.push();
  p.translate(x1, y1);
  p.rotate(currentAngleJoint2);
  p.image(arm1, -90, -95);
  p.pop();

  p.push();
  p.translate(x0, y0);
  p.rotate(currentAngleJoint1);
  if ($('end_effector').d == 1) {
    p.image(armTopClose, -135, -815);
  } else {
    p.image(armTop, -137, -805);    
  }
  p.pop();
  
  // 바디 그리기
  p.image(body, x1 - 290, y1 + 110);
  p.image(body2, x1 - 135, y1 - 85);

  // 시각화 라인
  p.stroke(0, 0, 0);
  p.line(900, 0, 900, 1300);

  // 센서값 가져오기
  newAngleJoint1 = $('encoder.joint_1').d;
  newAngleJoint2 = $('encoder.joint_2').d;

  currentAngleJoint1 = newAngleJoint1 === null ? currentAngleJoint1 : p.radians(newAngleJoint1) * -1;
  currentAngleJoint2 = newAngleJoint2 === null ? currentAngleJoint2 : p.radians(newAngleJoint2) * -1;
}
