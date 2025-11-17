class Raccoon {
  #minEncoderJoint1 = -120;
  #maxEncoderJoint1 = 120;
  #minEncoderJoint2 = 0;
  #maxEncoderJoint2 = 120;
  #minEncoderJoint3 = -150;
  #maxEncoderJoint3 = -0;
  #minEncoderJoint4 = -105;
  #maxEncoderJoint4 = 105;
  #angleSpeedOffset = 10;
  #speedJointOffset = 10;

  constructor(angleSpeed) {
    this._angleSpeed = angleSpeed;
    this.repeat = null;
    this.encoderJoint1 = $('encoder.joint_1').d;
    this.encoderJoint2 = $('encoder.joint_2').d;
    this.encoderJoint3 = $('encoder.joint_3').d;
    this.encoderJoint4 = $('encoder.joint_4').d;
    this.targetAngleJoint1 = null;
    this.targetAngleJoint2 = null;
    this.targetAngleJoint3 = null;
    this.targetAngleJoint4 = null;
    this._speedJoint1 = 0;
    this._speedJoint2 = 0;
    this._speedJoint3 = 0;
    this._speedJoint4 = 0;
  }

  get angleSpeed() {
    return this._angleSpeed;
  }

  set angleSpeed(value) {
    this._angleSpeed = value / this.#angleSpeedOffset;
  }

  get speedJoint1() {
    return this._speedJoint1;
  }

  set speedJoint1(value) {
    this._speedJoint1 = value / this.#speedJointOffset;
  }

  get speedJoint2() {
    return this._speedJoint2;
  }

  set speedJoint2(value) {
    this._speedJoint2 = value / this.#speedJointOffset;
  }

  get speedJoint3() {
    return this._speedJoint3;
  }

  set speedJoint3(value) {
    this._speedJoint3 = value / this.#speedJointOffset;
  }

  get speedJoint4() {
    return this._speedJoint4;
  }

  set speedJoint4(value) {
    this._speedJoint4 = value / this.#speedJointOffset;
  }

  moveByAngle(
    targetAngleJoint1,
    targetAngleJoint2,
    targetAngleJoint3,
    targetAngleJoint4
  ) {
    if (
      this.targetAngleJoint1 === targetAngleJoint1 &&
      this.targetAngleJoint2 === targetAngleJoint2 &&
      this.targetAngleJoint3 === targetAngleJoint3 &&
      this.targetAngleJoint4 === targetAngleJoint4
    ) {
      return;
    }

    // 목표 각도 설정
    this.targetAngleJoint1 = targetAngleJoint1;
    this.targetAngleJoint2 = targetAngleJoint2;
    this.targetAngleJoint3 = targetAngleJoint3;
    this.targetAngleJoint4 = targetAngleJoint4;

    this.repeat = setInterval(() => {
      if (this.encoderJoint1 < this.targetAngleJoint1) {
        if (this.encoderJoint1 + this.angleSpeed > this.targetAngleJoint1) {
          this.encoderJoint1 = this.targetAngleJoint1;
        } else {
          this.encoderJoint1 += this.angleSpeed;
        }
      } else if (this.encoderJoint1 > this.targetAngleJoint1) {
        if (this.encoderJoint1 - this.angleSpeed < this.targetAngleJoint1) {
          this.encoderJoint1 = this.targetAngleJoint1;
        } else {
          this.encoderJoint1 -= this.angleSpeed;
        }
      }

      if (this.encoderJoint2 < this.targetAngleJoint2) {
        if (this.encoderJoint2 + this.angleSpeed > this.targetAngleJoint2) {
          this.encoderJoint2 = this.targetAngleJoint2;
        } else {
          this.encoderJoint2 += this.angleSpeed;
        }
      } else if (this.encoderJoint2 > this.targetAngleJoint2) {
        if (this.encoderJoint2 - this.angleSpeed < this.targetAngleJoint2) {
          this.encoderJoint2 = this.targetAngleJoint2;
        } else {
          this.encoderJoint2 -= this.angleSpeed;
        }
      }

      if (this.encoderJoint3 < this.targetAngleJoint3) {
        if (this.encoderJoint3 + this.angleSpeed > this.targetAngleJoint3) {
          this.encoderJoint3 = this.targetAngleJoint3;
        } else {
          this.encoderJoint3 += this.angleSpeed;
        }
      } else if (this.encoderJoint3 > this.targetAngleJoint3) {
        if (this.encoderJoint3 - this.angleSpeed < this.targetAngleJoint3) {
          this.encoderJoint3 = this.targetAngleJoint3;
        } else {
          this.encoderJoint3 -= this.angleSpeed;
        }
      }

      if (this.encoderJoint4 < this.targetAngleJoint4) {
        if (this.encoderJoint4 + this.angleSpeed > this.targetAngleJoint4) {
          this.encoderJoint4 = this.targetAngleJoint4;
        } else {
          this.encoderJoint4 += this.angleSpeed;
        }
      } else if (this.encoderJoint4 > this.targetAngleJoint4) {
        if (this.encoderJoint4 - this.angleSpeed < this.targetAngleJoint4) {
          this.encoderJoint4 = this.targetAngleJoint4;
        } else {
          this.encoderJoint4 -= this.angleSpeed;
        }
      }

      if (
        this.encoderJoint1 === this.targetAngleJoint1 &&
        this.encoderJoint2 === this.targetAngleJoint2 &&
        this.encoderJoint3 === this.targetAngleJoint3 &&
        this.encoderJoint4 === this.targetAngleJoint4
      ) {
        clearInterval(this.repeat);
        this.repeat = null;
      }
    }, 50);
  }

  moveBySpeed(speedJoint1, speedJoint2, speedJoint3, speedJoint4) {
    if (
      this.speedJoint1 === speedJoint1 / this.#speedJointOffset &&
      this.speedJoint2 === speedJoint2 / this.#speedJointOffset &&
      this.speedJoint3 === speedJoint3 / this.#speedJointOffset &&
      this.speedJoint4 === speedJoint4 / this.#speedJointOffset
    )
      return;

    if (this.repeat != null) {
      clearInterval(this.repeat);
      this.repeat = null;
    }

    this.speedJoint1 = speedJoint1;
    this.speedJoint2 = speedJoint2;
    this.speedJoint3 = speedJoint3;
    this.speedJoint4 = speedJoint4;

    this.repeat = setInterval(() => {
      if (this.encoderJoint1 < this.#minEncoderJoint1) {
        this.encoderJoint1 = this.#minEncoderJoint1;
        this.speedJoint1 = 0;
      } else if (this.encoderJoint1 > this.#maxEncoderJoint1) {
        this.encoderJoint1 = this.#maxEncoderJoint1;
        this.speedJoint1 = 0;
      } else {
        this.encoderJoint1 += this.speedJoint1;
      }

      if (this.encoderJoint2 < this.#minEncoderJoint2) {
        this.encoderJoint2 = this.#minEncoderJoint2;
        this.speedJoint2 = 0;
      } else if (this.encoderJoint2 > this.#maxEncoderJoint2) {
        this.encoderJoint2 = this.#maxEncoderJoint2;
        this.speedJoint2 = 0;
      } else {
        this.encoderJoint2 += this.speedJoint2;
      }

      if (this.encoderJoint3 < this.#minEncoderJoint3) {
        this.encoderJoint3 = this.#minEncoderJoint3;
        this.speedJoint3 = 0;
      } else if (this.encoderJoint3 > this.#maxEncoderJoint3) {
        this.encoderJoint3 = this.#maxEncoderJoint3;
        this.speedJoint3 = 0;
      } else {
        this.encoderJoint3 += this.speedJoint3;
      }

      if (this.encoderJoint4 < this.#minEncoderJoint4) {
        this.encoderJoint4 = this.#minEncoderJoint4;
        this.speedJoint4 = 0;
      } else if (this.encoderJoint4 > this.#maxEncoderJoint4) {
        this.encoderJoint4 = this.#maxEncoderJoint4;
        this.speedJoint4 = 0;
      } else {
        this.encoderJoint4 += this.speedJoint4;
      }
    }, 50);
  }
}

const raccoon = new Raccoon(4);
let wait, wait_forever;

async function setup(spine) {
  const wait = function (n) {
    return new Promise((r) => setTimeout(r, n));
  };

  const wait_forever = function () {
    return wait(0x7fffffff);
  };

  $('mode').d = 1;
  $('joint.max_speed').d = 100;
  $('joint.angles').d = [0, 80, -140, 60];
  await wait(3000);
  $('joint.angles').d = [0, 80, -120, 20];
  $('mode').d = 0;
}

// put code here, to handle motor data
function serialize() {
//   if (dongle != null) {
//     return;
//   }

  // set control mode
  const mode = $('mode').d;
  switch (mode) {
    case 0: // speed control
      let speedJoint1 = $('speed.joint_1').d;
      let speedJoint2 = $('speed.joint_2').d;
      let speedJoint3 = $('speed.joint_3').d;
      let speedJoint4 = $('speed.joint_4').d;
      raccoon.moveBySpeed(speedJoint1, speedJoint2, speedJoint3, speedJoint4);
      break;
    case 1: // angle control
      let angleSpeed = $('joint.max_speed').d;
      raccoon.angleSpeed = angleSpeed;

      let angles = $('joint.angles').d;
      raccoon.moveByAngle(angles[0], angles[1], angles[2], angles[3]);
      break;
  }

  return;
}

// put code here, to handle sensory data
function deserialize() {
  $('encoder.joint_1').d = Number(raccoon.encoderJoint1.toFixed(3));
  $('encoder.joint_2').d = Number(raccoon.encoderJoint2.toFixed(3));
  $('encoder.joint_3').d = Number(raccoon.encoderJoint3.toFixed(3));
  $('encoder.joint_4').d = Number(raccoon.encoderJoint4.toFixed(3));
  $('encoder.encoders').d = [$('encoder.joint_1').d, $('encoder.joint_2').d, $('encoder.joint_3').d, $('encoder.joint_4').d];
}

// put control code here, to run repeatedly
function loop() {}
