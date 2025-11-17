// 일단 라쿤봇에서 J3, J4 삭제함. 이 중 안 쓰는 함수도 있고, 누락된 함수도 있을 것.

class Monkey2Joint {
  #minEncoderJoint1 = -120; // 상수값 자체는 추후 수정 필요
  #maxEncoderJoint1 = 120;
  #minEncoderJoint2 = 0;
  #maxEncoderJoint2 = 120;
  #angleSpeedOffset = 10;
  #speedJointOffset = 10;

  constructor(angleSpeed) {
    this._angleSpeed = angleSpeed;
    this.repeat = null;

    this.encoderJoint1 = $('encoder.joint_1').d;
    this.encoderJoint2 = $('encoder.joint_2').d;

    this.targetAngleJoint1 = null;
    this.targetAngleJoint2 = null;

    this._speedJoint1 = 0;
    this._speedJoint2 = 0;
  }

  get angleSpeed() { return this._angleSpeed; }
  set angleSpeed(value) { this._angleSpeed = value / this.#angleSpeedOffset; }

  get speedJoint1() { return this._speedJoint1; }
  set speedJoint1(value) { this._speedJoint1 = value / this.#speedJointOffset; }

  get speedJoint2() { return this._speedJoint2; }
  set speedJoint2(value) { this._speedJoint2 = value / this.#speedJointOffset; }

  moveByAngle(targetAngleJoint1, targetAngleJoint2) {
    if (this.targetAngleJoint1 === targetAngleJoint1 &&
        this.targetAngleJoint2 === targetAngleJoint2) return;

    this.targetAngleJoint1 = targetAngleJoint1;
    this.targetAngleJoint2 = targetAngleJoint2;

    if (this.repeat) clearInterval(this.repeat);

    this.repeat = setInterval(() => {
      this.encoderJoint1 = Math.max(Math.min(this.encoderJoint1 + (this.encoderJoint1 < this.targetAngleJoint1 ? this.angleSpeed : -this.angleSpeed), this.targetAngleJoint1), this.targetAngleJoint1);
      this.encoderJoint2 = Math.max(Math.min(this.encoderJoint2 + (this.encoderJoint2 < this.targetAngleJoint2 ? this.angleSpeed : -this.angleSpeed), this.targetAngleJoint2), this.targetAngleJoint2);

      if (this.encoderJoint1 === this.targetAngleJoint1 && this.encoderJoint2 === this.targetAngleJoint2) {
        clearInterval(this.repeat);
        this.repeat = null;
      }
    }, 50);
  }

  moveBySpeed(speedJoint1, speedJoint2) {
    if (this.repeat) clearInterval(this.repeat);

    this.speedJoint1 = speedJoint1;
    this.speedJoint2 = speedJoint2;

    this.repeat = setInterval(() => {
      this.encoderJoint1 = Math.min(Math.max(this.encoderJoint1 + this.speedJoint1, this.#minEncoderJoint1), this.#maxEncoderJoint1);
      this.encoderJoint2 = Math.min(Math.max(this.encoderJoint2 + this.speedJoint2, this.#minEncoderJoint2), this.#maxEncoderJoint2);
    }, 50);
  }
}

// 인스턴스 생성
const monkey = new Monkey2Joint(4);

// serialize: 제어 입력 반영
function serialize() {
  const mode = $('mode').d;

  switch (mode) {
    case 0: // speed control
      monkey.moveBySpeed($('speed.joint_1').d, $('speed.joint_2').d);
      break;
    case 1: // angle control
      monkey.angleSpeed = $('joint.max_speed').d;
      monkey.moveByAngle($('joint.angles').d[0], $('joint.angles').d[1]);
      break;
  }
}

// deserialize: 센서값 업데이트
function deserialize() {
  $('encoder.joint_1').d = Number(monkey.encoderJoint1.toFixed(3));
  $('encoder.joint_2').d = Number(monkey.encoderJoint2.toFixed(3));
  $('encoder.encoders').d = [$('encoder.joint_1').d, $('encoder.joint_2').d];
}

// loop는 필요 시 작성
function loop() {}
