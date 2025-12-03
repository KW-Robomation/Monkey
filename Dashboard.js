// === J1 / J2 전용 대시보드 ===

// 심플 슬라이더 생성기 (HTML range)
function createSlider(parent, cfg, id, min, max, initial) {
    const [W, X, Y] = cfg;

    parent.append('foreignObject')
        .attr("x", X)
        .attr("y", Y)
        .attr("width", W)
        .attr("height", 30)
        .html(`
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

// 팝업에 J1/J2/Speed 슬라이더만 표시
function dashboard() {
    w2popup.resize(400, 220);
    window.onresize = () => {
        w2popup.resize(400, 220);
    };
    w2popup.on('close', () => {
        // 키보드 이벤트 같은 거 더 이상 안 씀
    });

    const popup_box = select('#dashboard');
    popup_box.html('');                  // 기존 내용 싹 지우기
    popup_box.style('user_select', 'none');

    const frame = popup_box.append('svg')
        .attr("width", 400)
        .attr("height", 200)
        .style("background", "#fff")
        .style("border", "1px solid #ddd");

    // 제목
    frame.append("text")
        .attr("x", 15)
        .attr("y", 25)
        .attr("font-size", "12px")
        .text("J1 / J2 Joint Angle Control");

    const sliderWidth = 260;
    const sliderX = 100;

    // === J2 슬라이더 (0 ~ 120도) ===
    const J2 = frame.append('g');
    J2.append("text")
        .attr("x", 15)
        .attr("y", 70)
        .attr("font-size", "12px")
        .text("J2 (deg)");
    createSlider(J2, [sliderWidth, sliderX, 60, 0, 120], "angle_J2", 0, 120, 0);

    // === J1 슬라이더 (-120 ~ 120도) ===
    const J1 = frame.append('g');
    J1.append("text")
        .attr("x", 15)
        .attr("y", 115)
        .attr("font-size", "12px")
        .text("J1 (deg)");
    createSlider(J1, [sliderWidth, sliderX, 105, -120, 120], "angle_J1", -120, 120, 0);

    // === 속도 슬라이더 (joint.max_speed) ===
    const speed = frame.append('g');
    speed.append("text")
        .attr("x", 15)
        .attr("y", 160)
        .attr("font-size", "12px")
        .text("Speed");
    createSlider(speed, [sliderWidth, sliderX, 150, 0, 100], "angle_speed", 0, 100, 100);
}
// put draw code here, to run repeatedly
let init = false;
// angles[0] = J1, angles[1] = J2
let angles = [0, 0];

function control() {
    // 1) 첫 호출에서 엔코더 값으로 초기화
    if (!init) {
        init = true;

        angles = [
            Math.round($('encoder.joint_1').d),  // J1
            Math.round($('encoder.joint_2').d),  // J2
        ];

        // 슬라이더에 현재 각도 반영
        if (select('#angle_J1').node()) {
            select('#angle_J1').property("value", angles[0]);
        }
        if (select('#angle_J2').node()) {
            select('#angle_J2').property("value", angles[1]);
        }

        // 속도 기본값 100
        if (select('#angle_speed').node()) {
            select('#angle_speed').property("value", 100);
        }
    }

    // 2) 매 프레임마다 슬라이더 값 읽어서 angles[] 업데이트
    if (select('#angle_J1').node()) {
        angles[0] = parseInt(select('#angle_J1').property("value")) || 0;
    }
    if (select('#angle_J2').node()) {
        angles[1] = parseInt(select('#angle_J2').property("value")) || 0;
    }

    // 3) 속도 슬라이더 → joint.max_speed
    if (select('#angle_speed').node()) {
        $('joint.max_speed').d = parseInt(select('#angle_speed').property("value")) || 100;
    }

    // 4) angles[]를    명령으로 전송 (J1, J2만)
    $('joint.angles').d = angles;

    // 5) (옵션) 엔코더 상태 텍스트 갱신용 hook
    // 만약 대시보드 쪽에서 <text id="encoder_joint_1"> 같은 걸 추가하면 사용 가능
    if (select('#encoder_joint_1').node()) {
        select('#encoder_joint_1').text($('encoder.joint_1').d + ' °');
    }
    if (select('#encoder_joint_2').node()) {
        select('#encoder_joint_2').text($('encoder.joint_2').d + ' °');
    }
    $('joint.angles').d = angles;    // 목표치 명령
    $('encoder.joint_1').d = angles[0];  // <─ 엔코더도 갱신
    $('encoder.joint_2').d = angles[1];
}
