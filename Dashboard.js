// put code here, to display dashboard panel
function dashboard() {
    w2popup.resize(720, 480);
    window.onresize = () => {
        w2popup.resize(720, 480);
    }
    w2popup.on('close', () => {
        remove_key_event();
    })

    const popup_box = select('#dashboard');
    popup_box.style('user_select', 'none');
    
    const control_frame = popup_box.append('svg')
        .attr("id", "device_control")
        .attr("width", 350)
        .attr("height", 420)
        .attr("transform", "translate(5, 5)")
        
        .style("background-color", "#fff") // rgba(0, 255, 0, 0.3)
        .style("border", "1px solid silver");
    const sensory_frame = popup_box.append('svg')
            .attr("width", 350)
            .attr("height", 420)
            .attr("transform", "translate(10, 5)")
            .attr("shape-rendering", "crispEdges")
            .style("background-color", "#fff") // rgba(0, 0, 255, 0.1)
            .style("border", "1px solid silver");
    device_control();
    sensory_control();
    peripheral_control();
    
    function device_control() {
        mode_select();
        
        speed_control();  
        module_control();
    }
    
    function mode_select() {
        const mode_frame = control_frame.append('g').attr("id", "mode_frame");
        const mode = mode_frame.append('g').attr("id", "mode");
        mode_frame.append('text')
            .attr("x", 15)
            .attr("y", 30)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("Mode");
        mode_frame.append('foreignObject')
            .attr("x", 60)
            .attr("y", 10)
            .attr("width", 100)
            .attr("height", 30)
            .attr("font-size", "10.5px")
            .html(function() {
                return '<select id="mode_select" style="width:100px; height:30px;">' + 
                '<option value=0>speed</option>' + 
                '<option value=1>angle</option>' + 
                '<option value=2>xyz</option>' + 
                '<option value=3>keyboard</option>' + 
                '</select>';
            });
            
        const lock = mode_frame.append('g').attr("id", "lock");
        lock.append('text')
            .attr("x", 200)
            .attr("y", 30)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("Lock");
        lock.append('foreignObject')
            .attr("x", 240)
            .attr("y", 10)
            .attr("width", 90)
            .attr("height", 30)
            .attr("font-size", "10.5px")
            .html(function() {
                return '<select id="lock_select" style="width:90px; height:30px;">' + 
                '<option value=0>none</option>' + 
                '<option value=1>vertical</option>' + 
                '<option value=2>horizontal</option>' + 
                '</select>';
            });
            
        select('#mode_select').on('input', function() {
            if(select('#speed_frame').node()) select('#speed_frame').remove();
            if(select('#angle_frame').node()) select('#angle_frame').remove();
            if(select('#xyz_frame').node()) select('#xyz_frame').remove();
            if(select('#keyboard_frame').node()) select('#keyboard_frame').remove();
            remove_key_event();
            
            select('#mode_select').node().blur();
            
            switch(parseInt(select(this).property("value"))) {
                case 0:
                    speed_control();
                    break;
                case 1:
                    angle_control();
                    break;
                case 2:
                    xyz_control();
                    break;
                case 3:
                    keyboard_control();
                    break;
            }
        });
        
        select('#lock_select').on('input', function() {
            select('#lock_select').node().blur();
        })
    }

    function speed_control() {
        const speed_frame = control_frame.append('g').attr("id", "speed_frame");
        speed_frame.append('text')
            .attr("x", 15)
            .attr("y", 70)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("Speed Control");
            
        const motor_onoff = speed_frame.append('g').attr("id", "cmd_motor_onoff");
        createButton(motor_onoff, [50, 24, 280, 55, 280+50/2, 55+24/2, getColor('yellow')], "MOTOR");
        motor_onoff.select('text').attr('font-size', '10.5px');
    

        const J3 = speed_frame.append('g');
        const J2 = speed_frame.append('g');
        const J1 = speed_frame.append('g');
    
        

    
        J2.append('text')
            .attr("x", 15)
            .attr("y", 190 - 5)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("J2");
        J2.append('text')
            .attr('x', 60)
            .attr('y', 190 + 10)
            .attr('font-size', "10.5px")
            .attr("text-anchor", "start")
            .text(-100);
        J2.append('text')
            .attr('x', 60 + 200)
            .attr('y', 190 + 10)
            .attr('font-size', "10.5px")
            .attr("text-anchor", "end")
            .text(100);
        J2.append('foreignObject')
            .attr("x", 280)
            .attr("y", 190 - 20)
            .attr("width", 50)
            .attr("height", 32)
            .attr("font-size", "10.5px")
            .html(function() {
                return `<input type="text" id="speed_J2" value="0" style="width: 50px;" readonly />`;
            });
        createSlider(J2, [200, 60, 190 - 10, -100, 100], "speed_J2", false, "input");
    
        J1.append('text')
            .attr("x", 15)
            .attr("y", 230 - 5)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("J1");
        J1.append('text')
            .attr('x', 60)
            .attr('y', 230 + 10)
            .attr('font-size', "10.5px")
            .attr("text-anchor", "start")
            .text(-100);
        J1.append('text')
            .attr('x', 60 + 200)
            .attr('y', 230 + 10)
            .attr('font-size', "10.5px")
            .attr("text-anchor", "end")
            .text(100);
        J1.append('foreignObject')
            .attr("x", 280)
            .attr("y", 230 - 20)
            .attr("width", 50)
            .attr("height", 32)
            .attr("font-size", "10.5px")
            .html(function() {
                return `<input type="text" id="speed_J1" value="0" style="width: 50px;" readonly />`;
            });
        createSlider(J1, [200, 60, 230 - 10, -100, 100], "speed_J1", false, "input"); 
    
        // const keyboard_control = speed_frame.append('g').attr("id", "keyboard_control");
        // createButton(keyboard_control, [120, 30, 210, 295, 210+120/2, 295+30/2], "키보드 제어 OFF");
        // keyboard_control.select('text').attr("font-size", "12px");
    }
    
    function angle_control() {
        const angle_frame = control_frame.append('g').attr("id", "angle_frame");
        
        angle_frame.append('text')
            .attr("x", 15)
            .attr("y", 70)  // 35 40
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("Angle Control");
    
        const J2 = angle_frame.append('g');
        const J1 = angle_frame.append('g');
        const speed = angle_frame.append('g');
    
        const angle_reset = angle_frame.append('g').attr("id", "angle_control_reset");
        createButton(angle_reset, [50, 24, 280, 55, 280+50/2, 55+24/2, getColor("red")], "RESET");
        angle_reset.select('text').attr("font-size", "10.5px");
        
        J2.append('text')
            .attr("x", 15)
            .attr("y", 190 - 5)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("J2");
        J2.append('text')
            .attr('x', 60)
            .attr('y', 190 + 10)
            .attr('font-size', "10.5px")
            .attr("text-anchor", "start")
            .text(0 + '°');
        J2.append('text')
            .attr('x', 60 + 200)
            .attr('y', 190 + 10)
            .attr('font-size', "10.5px")
            .attr("text-anchor", "end")
            .text(120 + '°');
        J2.append('foreignObject')
            .attr("x", 280)
            .attr("y", 190 - 20)
            .attr("width", 50)
            .attr("height", 32)
            .attr("font-size", "10.5px")
            .html(function() {
                return `<input type="text" id="angle_J2" value="0" style="width: 50px;" readonly />`;
            });
        createSlider(J2, [200, 60, 190 - 10, 0, 120], "angle_J2", true, "input"); 
    
        J1.append('text')
            .attr("x", 15)
            .attr("y", 230 - 5)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("J1");
        J1.append('text')
            .attr('x', 60)
            .attr('y', 230 + 10)
            .attr('font-size', "10.5px")
            .attr("text-anchor", "start")
            .text(-120 + '°');
        J1.append('text')
            .attr('x', 60 + 200)
            .attr('y', 230 + 10)
            .attr('font-size', "10.5px")
            .attr("text-anchor", "end")
            .text(120 + '°');
        J1.append('foreignObject')
            .attr("x", 280)
            .attr("y", 230 - 20)
            .attr("width", 50)
            .attr("height", 32)
            .attr("font-size", "10.5px")
            .html(function() {
                return `<input type="text" id="angle_J1" value="0" style="width: 50px;" readonly />`;
            });
        createSlider(J1, [200, 60, 230 - 10, -120, 120], "angle_J1", true, "input");
    
        speed.append('text')
            .attr("x", 10)
            .attr("y", 270 - 5)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("Speed");
        speed.append('text')
            .attr('x', 60)
            .attr('y', 270 + 10)
            .attr("text-anchor", "start")
            .attr("font-size", "10.5px")
            .text(0);
        speed.append('text')
            .attr('x', 60 + 200)
            .attr('y', 270 + 10)
            .attr('font-size', "10.5px")
            .attr("text-anchor", "end")
            .text(100);
        speed.append('foreignObject')
            .attr("x", 280)
            .attr("y", 270 - 20)
            .attr("width", 50)
            .attr("height", 32)
            .attr("font-size", "10.5px")
            .html(function() {
                return `<input type="text" id="angle_speed" value="100" style="width: 50px;" readonly />`;
            });
        createSlider(speed, [200, 60, 270 - 10, 0, 100], "angle_speed", true, "input");
    }
    
    function xyz_control() {
        const xyz_frame = control_frame.append('g').attr("id", "xyz_frame");
        
        xyz_frame.append('text')
            .attr("x", 15)
            .attr("y", 70)  // 35 40
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("XYZ Control");
        xyz_frame.append('text')
            .attr("id", "invalid_xyz")
            .attr("x", 305)
            .attr("y", 70)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .style("fill", "red")
            .style("visibility", "hidden")
            .text("Invalid!");
    
        const X = xyz_frame.append('g');
        const Y = xyz_frame.append('g');
        const Z = xyz_frame.append('g');
        const speed = xyz_frame.append('g');
        
        X.append('text')
            .attr("x", 15)
            .attr("y", 110 - 5)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("X");
        X.append('text')
            .attr('x', 60)
            .attr('y', 110 + 10)
            .attr("text-anchor", "start")
            .attr('font-size', "10.5px")
            .text(-100);
        X.append('text')
            .attr('x', 60 + 200)
            .attr('y', 110 + 10)
            .attr("text-anchor", "end")
            .attr('font-size', "10.5px")
            .text(200);
        X.append('foreignObject')
            .attr("x", 280)
            .attr("y", 110 - 20)
            .attr("width", 50)
            .attr("height", 32)
            .attr("font-size", "10.5px")
            .html(function() {
                return `<input type="text" id="xyz_X" value="0" style="width: 50px;" readonly />`;
            });
        createSlider(X, [200, 60, 110 - 10, -100, 200], "xyz_X", true, "input");
    
        Y.append('text')
            .attr("x", 15)
            .attr("y", 150 - 5)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("Y");
        Y.append('text')
            .attr('x', 60)
            .attr('y', 150 + 10)
            .attr('font-size', "10.5px")
            .attr("text-anchor", "start")
            .text(-200);
        Y.append('text')
            .attr('x', 60 + 200)
            .attr('y', 150 + 10)
            .attr('font-size', "10.5px")
            .attr("text-anchor", "end")
            .text(200);
        Y.append('foreignObject')
            .attr("x", 280)
            .attr("y", 150 - 20)
            .attr("width", 50)
            .attr("height", 32)
            .attr("font-size", "10.5px")
            .html(function() {
                return `<input type="text" id="xyz_Y" value="0" style="width: 50px;" readonly />`;
            });
        createSlider(Y, [200, 60, 150 - 10, -200, 200], "xyz_Y", true, "input");
    
        Z.append('text')
            .attr("x", 15)
            .attr("y", 190 - 5)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("Z");
        Z.append('text')
            .attr('x', 60)
            .attr('y', 190 + 10)
            .attr('font-size', "10.5px")
            .attr("text-anchor", "start")
            .text(-100);
        Z.append('text')
            .attr('x', 60 + 200 )
            .attr('y', 190 + 10)
            .attr('font-size', "10.5px")
            .attr("text-anchor", "end")
            .text(200);
        Z.append('foreignObject')
            .attr("x", 280)
            .attr("y", 190 - 20)
            .attr("width", 50)
            .attr("height", 32)
            .attr("font-size", "10.5px")
            .html(function() {
                return `<input type="text" id="xyz_Z" value="0" style="width: 50px;" readonly />`;
            });
        createSlider(Z, [200, 60, 190 - 10, -100, 200], "xyz_Z", true, "input"); 
    
        speed.append('text')
            .attr("x", 10)
            .attr("y", 230 - 5)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("Speed");
        speed.append('text')
            .attr('x', 60)
            .attr('y', 230 + 10)
            .attr('font-size', "10.5px")
            .attr("text-anchor", "start")
            .text(0);
        speed.append('text')
            .attr('x', 60 + 200)
            .attr('y', 230 + 10)
            .attr('font-size', "10.5px")
            .attr("text-anchor", "end")
            .text(100);
        speed.append('foreignObject')
            .attr("x", 280)
            .attr("y", 230 - 20)
            .attr("width", 50)
            .attr("height", 32)
            .attr("font-size", "10.5px")
            .html(function() {
                return `<input type="text" id="xyz_speed" value="100" style="width: 50px;" readonly />`;
            });
        createSlider(speed, [200, 60, 230 - 10, 0, 100], "xyz_speed", true, "input");
    }
    
    function keyboard_control() {
        const keyboard_frame = control_frame.append('g').attr("id", "keyboard_frame")
        keyboard_frame.append('text')
            .attr("x", 15)
            .attr("y", 70)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("Keyboard Control");
        keyboard_frame.append('text')
            .attr("x", 170)
            .attr("y", 70)
            .attr("font-size", "10.5px")
            .style("fill", "black")
            .text("joint 1: ◀ ▶");
        keyboard_frame.append('text')
            .attr("x", 170)
            .attr("y", 85)
            .attr("font-size", "10.5px")
            .style("fill", "black")
            .text("joint 2: ▲ ▼");
        keyboard_frame.append('text')
            .attr("x", 170)
            .attr("y", 130)
            .attr("font-size", "10.5px")
            .style("fill", "black")
            .text("gripper: space");
        keyboard_frame.append('foreignObject')
            .html(function(d) {
                return `<input type="text" id="keyboard_joint" value="2" style="visibility:hidden;" />
                        <input type="text" id="keyboard_key" value="none" style="visibility:hidden;" />
                        <input type="text" id="keyboard_gripper" value="0" style="visibility:hidden;" />`
            });
        
        const key_shift = keyboard_frame.append('g').attr("id", "Shift");
        createButton(key_shift, [60, 24, 15, 210, 15+60/2, 210+24/2, getColor("lightgray")], "shift");
        key_shift.style("pointer-events", "none");
        key_shift.select("text").attr("font-size", "11px").style("fill", "gray");
        
        const key_alt = keyboard_frame.append('g').attr("id", "Alt");
        createButton(key_alt, [60, 24, 80, 210, 80+60/2, 210+24/2, getColor("lightgray")], "alt");
        key_alt.style("pointer-events", "none");
        key_alt.select("text").attr("font-size", "11px").style("fill", "gray");
        
        const key_up = keyboard_frame.append('g').attr("id", "ArrowUp");
        createButton(key_up, [50, 24, 225, 150, 225+50/2, 150+24/2, getColor("lightgray")], "▲");
        key_up.style("pointer-events", "none");
        key_up.select("text").attr("font-size", "11px").style("fill", "gray");
        
        const key_down = keyboard_frame.append('g').attr("id", "ArrowDown");
        createButton(key_down, [50, 24, 225, 180, 225+50/2, 180+24/2, getColor("lightgray")], "▼");
        key_down.style("pointer-events", "none");
        key_down.select("text").attr("font-size", "11px").style("fill", "gray");
        
        const key_left = keyboard_frame.append('g').attr("id", "ArrowLeft");
        createButton(key_left, [50, 24, 170, 180, 170+50/2, 180+24/2, getColor("lightgray")], "◀");
        key_left.style("pointer-events", "none");
        key_left.select("text").attr("font-size", "11px").style("fill", "gray");
        
        const key_right = keyboard_frame.append('g').attr("id", "ArrowRight");
        createButton(key_right, [50, 24, 280, 180, 280+50/2, 180+24/2, getColor("lightgray")], "▶");
        key_right.style("pointer-events", "none");
        key_right.select("text").attr("font-size", "11px").style("fill", "gray");
        
        const key_space = keyboard_frame.append('g').attr("id", "Space");
        createButton(key_space, [160, 24, 170, 210, 170+160/2, 210+24/2, getColor("lightgray")], "space");
        key_space.style("pointer-events", "none");
        key_space.select("text").attr("font-size", "11px").style("fill", "gray");
        
        const key_speed = keyboard_frame.append('g');
        key_speed.append('text')
            .attr("x", 10)
            .attr("y", 270 - 5)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("Speed");
        key_speed.append('text')
            .attr('x', 60)
            .attr('y', 270 + 10)
            .attr("text-anchor", "start")
            .attr("font-size", "10.5px")
            .text(0);
        key_speed.append('text')
            .attr('x', 60 + 200)
            .attr('y', 270 + 10)
            .attr('font-size', "10.5px")
            .attr("text-anchor", "end")
            .text(100);
        key_speed.append('foreignObject')
            .attr("x", 280)
            .attr("y", 270 - 20)
            .attr("width", 50)
            .attr("height", 32)
            .attr("font-size", "10.5px")
            .html(function() {
                return `<input type="text" id="keyboard_speed" value="50" style="width: 50px;" readonly />`;
            });
        createSlider(key_speed, [200, 60, 270 - 10, 0, 100], "keyboard_speed", true, "input");
        
        add_key_event();
    }
    
    function keydown_event(e) {
        let key;
        
        if(e.code.includes('Shift')) {
            key = select('#Shift');
            select('#keyboard_joint').property("value", 3);
            select('#keyboard_joint').node().dispatchEvent(new Event('change', { bubbles: true }));
        } 
        else if(e.code.includes('Alt')) {
            key = select('#Alt');
            select('#keyboard_joint').property("value", 4);
            select('#keyboard_joint').node().dispatchEvent(new Event('change', { bubbles: true }));
        }
        else if(e.code.includes('Arrow')) {
            key = select('#' + e.code);
            switch(e.code) {
                case "ArrowUp":
                    select('#keyboard_key').property("value", "up");
                    select('#keyboard_key').node().dispatchEvent(new Event('change', { bubbles: true }));
                    break;
                case "ArrowDown":
                    select('#keyboard_key').property("value", "down");
                    select('#keyboard_key').node().dispatchEvent(new Event('change', { bubbles: true }));
                    break;
                case "ArrowLeft":
                    select('#keyboard_key').property("value", "left");
                    select('#keyboard_key').node().dispatchEvent(new Event('change', { bubbles: true }));
                    break;
                case "ArrowRight":
                    select('#keyboard_key').property("value", "right");
                    select('#keyboard_key').node().dispatchEvent(new Event('change', { bubbles: true }));
                    break;
            }
        }
        else if(e.code.includes('Space')) {
            key = select('#' + e.code);
        }
        
        if(key) {
            key.select('rect').style("fill", getColor("yellow"));
            key.select('text').style("fill", "black");
        }
    }
    function keyup_event(e) {
        let key;
        
        if(e.code.includes('Shift')) {
            key = select('#Shift');
            select('#keyboard_joint').property("value", 2);
            select('#keyboard_joint').node().dispatchEvent(new Event('change', { bubbles: true }));
        }
        else if(e.code.includes('Alt')) {
            key = select('#Alt');
            select('#keyboard_joint').property("value", 2);
            select('#keyboard_joint').node().dispatchEvent(new Event('change', { bubbles: true }));
        }
        else if(e.code.includes('Arrow')) {
            key = select('#' + e.code);
            select('#keyboard_key').property("value", "none");
            select('#keyboard_key').node().dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        if(key) {
            key.select('rect').style("fill", getColor("lightgray"));
            key.select('text').style("fill", "gray");
        }
    }
    function add_key_event() {
        window.addEventListener("keydown", keydown_event);
        window.addEventListener("keyup", keyup_event);
    }
    function remove_key_event() {
        window.removeEventListener("keydown", keydown_event);
        window.removeEventListener("keyup", keyup_event);
    }
    
    function module_control() {
        const module_frame = control_frame.append('g').attr("id", "module_frame");
        createLine(module_frame, [0, 290, 350, 290]);
        // createLine(module_frame, [0, 340, 350, 340]);
    
        const end_effector = module_frame.append('g');
        end_effector.append('text')
            .attr("x", 15)
            .attr("y", 320)  // 370
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("End Effector");
        end_effector.append('foreignObject')
            .attr("x", 100)
            .attr("y", 320 - 18)
            .attr("width", 100)
            .attr("height", 30)
            .attr("font-size", "10.5px")
            .html(function(d) {
                return `<select id="end_effector" style="width: 100px; height: 30px;">
                            <option value="gripper" selected>gripper</option>
                            <option value="vacuum">vacuum</option>
                        </select>`;
            })
        
    
        const notes = organs.filter(d => d.class == 'constant' && d.urn.includes('note'));
        const sound_note = module_frame.append('g');
        sound_note.append('text')
            .attr("x", 15)
            .attr("y", 360)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("note");
        sound_note.append('foreignObject')
            .attr("x", 100)
            .attr("y", 345)
            .attr("width", 100)
            .attr("height", 30)
            .attr("font-size", "10.5px")
            .html(function(d) {
                var options = '';
                notes.forEach((d) => {
                    options += `<option value=${d.value}>${d.name}</option>`;
                })
                return '<select id="sound_note" name="notes" style="width:100px;">' + options + '</select>';
            });
            
        const set_note = sound_note.append('g').attr("id", "cmd_set_note");
        createButton(set_note, [50, 24, 220, 345, 220+50/2, 345+24/2, getColor("lightgreen")], "PLAY");
        set_note.select('text').attr("font-size", "10.5px");
    
        const stop_note = sound_note.append('g').attr("id", "cmd_stop_note");
        createButton(stop_note, [50, 24, 280, 345, 280+50/2, 345+24/2, getColor("red")], "STOP");
        stop_note.select('text').attr("font-size", "10.5px");
    
        const sounds = organs.filter(d => d.class == 'constant' && d.urn.includes('sound'));
        const sound_sound = module_frame.append('g');
        sound_sound.append('text')
            .attr("x", 15)
            .attr("y", 390)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("sound");
        sound_sound.append('foreignObject')
            .attr("x", 100)
            .attr("y", 375)
            .attr("width", 100)
            .attr("height", 30)
            .attr("font-size", "10.5px")
            .html(function(d) {
                var options = '';
                sounds.forEach((d) => {
                    options += `<option value=${d.value}>${d.name}</option>`;
                })
                return '<select id="sound_sound" name="sounds" style="width:100px;">' + options + '</select>';
            });
    
        const set_sound = sound_sound.append('g').attr("id", "cmd_set_sound");
        createButton(set_sound, [50, 24, 220, 375, 220+50/2, 375+24/2, getColor("lightgreen")], "PLAY");
        set_sound.select('text').attr("font-size", "10.5px");
    
        const stop_sound = sound_sound.append('g').attr("id", "cmd_stop_sound");
        createButton(stop_sound, [50, 24, 280, 375, 280+50/2, 375+24/2, getColor("red")], "STOP");
        stop_sound.select('text').attr("font-size", "10.5px");
    }
    
    function sensory_control() {
        sensory_frame.append('text')
            .attr("x", 15)
            .attr("y", 30)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("Sensory Data");
        
        const encoder = sensory_frame.append('g');
        encoder.append('text')
            .attr("x", 15)
            .attr("y", 60)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("Encoder");
        createState(encoder, [
            [ [120, 60, "joint 4"], [120, 80, "joint 3"], [120, 100, "joint 2"], [120, 120, "joint 1"], ],
            [ [240, 60, "encoder_joint_4"], [240, 80, "encoder_joint_3"], [240, 100, "encoder_joint_2"], [240, 120, "encoder_joint_1"], ],
        ])
        const encoder_copy = encoder.append('g').attr("id", "encoder_copy");
        createButton(encoder_copy, [48, 24, 15, 70, 15+48/2, 70+24/2, getColor("lightgreen")], "COPY");
        encoder_copy.select('text').attr("font-size", "10.5px");
        
        createLine(sensory_frame, [0, 130, 350, 130]);
        
        const coordinate = sensory_frame.append('g');
        coordinate.append('text')
            .attr("x", 15)
            .attr("y", 150)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("Coordinate");
        createState(coordinate, [
            [ [120, 150, "x"], [120, 170, "y"], [120, 190, "z"],  ],
            [ [240, 150, "encoder_x"], [240, 170, "encoder_y"], [240, 190, "encoder_z"], ],
        ])
        const coordinate_copy = coordinate.append('g').attr("id", "encoder_copy");
        createButton(coordinate_copy, [48, 24, 15, 160, 15+48/2, 160+24/2, getColor("lightgreen")], "COPY");
        encoder_copy.select('text').attr("font-size", "10.5px");
        
        createLine(sensory_frame, [0, 200, 350, 200]);
            
        const others = sensory_frame.append('g');
        createState(others, [
                [ [15, 220, "Signal Strength"], [15, 245, "Battery Level"], [15, 270, "Warning"], ],
                [ [240, 220, "signal_strength"], [240, 245, "battery_level"], [240, 270, "warning"], ],
            ])
        // createState(others, [
        //     [ [15, 290, "Signal Strength"], [15, 310, "Battery Level"], [15, 330, "Warning"], ],
        //     [ [240, 290, "signal_strength"], [240, 310, "battery_level"], [240, 330, "warning"], ],
        // ])
    }
    
    function peripheral_control() {
        const peripheral_frame = sensory_frame.append('g').attr("id", "peripheral_frame");
        createLine(peripheral_frame, [0, 290, 350, 290]);
        // createLine(peripheral_frame, [0, 340, 350, 340]);
            
        const peripherals = organs.filter(d => d.class == 'constant' && d.urn.includes('peripheral'));
        peripheral_frame.append('text')
            .attr("x", 15)
            .attr("y", 320)
            .attr("font-size", "12px")
            .style("fill", "black")
            .text("Peripheral");
        peripheral_frame.append('foreignObject')
            .attr("x", 100)
            .attr("y", 300)
            .attr("width", 100)
            .attr("height", 30)
            .attr("font-size", "10.5px")
            .html(function() {
                var options = '';
                peripherals.forEach(d => {
                    if(d.value === 1 || d.name === 'conveyor') 
                        options += `<option value=${d.value} selected>${d.name}</option>`;
                    else 
                        options += `<option value=${d.value}>${d.name}</option>`;
                })
                return '<select id="peripheral_select" name="peripherals" style="width:100px; height:30px;">' + options + '</select>';
            });
            
        conveyor_control();
        select('#peripheral_select').on('input', function() {
            if(select('#conveyor_frame').node()) select('#conveyor_frame').remove();
            if(select('#slider_frame').node()) select('#slider_frame').remove();
    
            switch(select(this).property("value")) {
                case "0":
                    break;
                case "1":
                    conveyor_control();
                    break;
                case "2":
                    slider_control();
                    break;
            }
        })  
    }
    
   
    function createButton(g, arr, text) {
        g.style("cursor", "pointer")
        .on('mouseover', function () { 
            g.select('text').attr("font-size", (parseInt(g.select('text').attr("font-size").substring(0, 2)) + 1) + "px");
            g.select('rect').style("stroke-width", "2px");
        })
        .on('mouseout', function () { 
            g.select('text').attr("font-size", (parseInt(g.select('text').attr("font-size").substring(0, 2)) - 1) + "px");
            g.select('rect').style("stroke-width", "1px");
        })
    
        g.append('rect')
        .attr("width", arr[0]) //width
        .attr("height", arr[1]) //height
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("x", arr[2]) // x
        .attr("y", arr[3]) // y
        //.style("stroke", "lightgray")
        //.style("stroke-width", "1px")
        .style("fill", arr[6]||"#eee")
        // .style("opacity", .7);
    
        g.append('text')
        .attr("x", arr[4]) //text_x
        .attr("y", arr[5]) //text_y
        .attr("font-size", "10.5px")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("fill", "black")
        .text(text);
    }
    
    // arr => [x, y, id]
    function createState(g, arr) {
        arr[0].forEach(a => {
            g.append('text')
                .attr("x", a[0])
                .attr("y", a[1])
                .attr("font-size", "10.5px")
                .style("fill", "black")
                .text(a[2]);
        })
        arr[1].forEach(a => {
            g.append('text')
                .property("id", a[2])
                .attr("x", a[0])
                .attr("y", a[1])
                .attr("font-size", "10.5px")
                .style("fill", "black");
        })
    }
    
    // arr => [x1, y1, x2, y2]
    function createLine(g, arr) {
        g.append('line')
            .attr('x1', arr[0]) 
            .attr('y1', arr[1]) 
            .attr('x2', arr[2]) 
            .attr('y2', arr[3]) 
            .attr('stroke', 'silver') 
            .attr('stroke-width', 1)
            .attr("shape-rendering", "crispEdges"); 
    }
}

// put draw code here, to run repeatedly
let mode, lock, angles, coordinate, old_coordinate, keyboard_key, keyboard_joint;
let init = false, angle_dragged;
function control() {
    if(!init) {
        init = true;
        mode = parseInt(select('#mode_select').property("value"));
        lock = parseInt(select('#lock_select').property("value"));
        angles = [Math.round($('encoder.joint_1').d), Math.round($('encoder.joint_2').d), Math.round($('encoder.joint_3').d), Math.round($('encoder.joint_4').d)];
        angles_to_xyz();
        coordinate = [Math.round(Number(select('#encoder_x').text().replace(' mm', ''))), Math.round(Number(select('#encoder_y').text().replace(' mm', ''))), Math.round(Number(select('#encoder_z').text().replace(' mm', '')))];
        old_coordinate = [...coordinate];
    }
    select('#mode_select').on('change', function() {
        mode = parseInt(select('#mode_select').property("value"));
        lock = parseInt(select('#lock_select').property("value"));
        
        switch(mode) {
            case 0:  // speed mode
                $('mode').d = 0;
                break;
            case 1:  // angle mode
                $('mode').d = 1;
                $('speed.motor').d = 0;
                lock_angles();
                angles = [Math.round($('encoder.joint_1').d), Math.round($('encoder.joint_2').d), Math.round($('encoder.joint_3').d), Math.round($('encoder.joint_4').d)];
                $('joint.angles').d = angles;
    
                input_angles();
                select("#angle_speed").property("value", 100);
                select("#angle_speed").node().dispatchEvent(new Event('input', { bubbles: true }));
                break;
            case 2:  // xyz mode
                $('mode').d = 1;
                $('speed.motor').d = 0;
                coordinate = [Math.round(Number(select('#encoder_x').text().replace(' mm', ''))), Math.round(Number(select('#encoder_y').text().replace(' mm', ''))), Math.round(Number(select('#encoder_z').text().replace(' mm', '')))];
                xyz_to_angles();
                lock_angles();
                $('joint.angles').d = angles;
                
                input_xyz();
                select("#xyz_speed").property("value", 100);
                select("#xyz_speed").node().dispatchEvent(new Event('input', { bubbles: true }));
                break;
            case 3:  // keyboard mode
                $('mode').d = 0;
                
                keyboard_key = select('#keyboard_key').property("value");
                keyboard_joint = parseInt(select('#keyboard_joint').property("value"));
                
                select("#keyboard_speed").property("value", 50);
                select("#keyboard_speed").node().dispatchEvent(new Event('input', { bubbles: true }));
                break;
            default:
                break;
        }
    });
    select('#lock_select').on('change', function() {
        lock = parseInt(select('#lock_select').property("value"));
        // lock_J4(lock);
        
        switch(mode) {
            case 0:  // speed mode
                break;
            case 1:  // angle mode
                lock_angles();
                input_angles();
                $('joint.angles').d = angles;   
                break;
            case 2:  // xyz mode
                xyz_to_angles();
                lock_angles();
                input_xyz();
                $('joint.angles').d = angles;
                break;
            case 3:  // keyboard mode
                break;
        }
    })
    if(mode == 0 || mode == 3) {
        const DEG = 360 / 4096;
        let J4, speed_J4;
        switch(lock) {
            case 1:  // vertical => sum of j2, j3, j4 is -90
                J4 = -90 - ($('encoder.joint_2').d + $('encoder.joint_3').d);  // joint_4 range: -105 ~ 105 (-100 ~ 100)
                if(J4 < -100) J4 = -100;
                else if(J4 > 100) J4 = 100;
                else J4 = J4.toFixed(3);
                
                if((J4 - $('encoder.joint_4').d) / DEG < -100) speed_J4 = -100;
                else if((J4 - $('encoder.joint_4').d) / DEG > 100) speed_J4 = 100;
                else speed_J4 = (J4 - $('encoder.joint_4').d) / DEG;
                speed_J4 = parseInt(Math.round(speed_J4));
                
                if(mode == 0) select('#speed_J4').property("value", speed_J4)
                else if(mode == 3) $('speed.joint_4').d = speed_J4;
                break;
            case 2:  // horizontal => sum of j2, j3, j4 is 0
                J4 = - ($('encoder.joint_2').d + $('encoder.joint_3').d).toFixed(3);  // joint_4 range: -105 ~ 105 (-100 ~ 100)
                if(J4 < -100) J4 = -100;
                else if(J4 > 100) J4 = 100;
                else J4 = J4.toFixed(3);
                
                if((J4 - $('encoder.joint_4').d) / DEG < -100) speed_J4 = -100;
                else if((J4 - $('encoder.joint_4').d) / DEG > 100) speed_J4 = 100;
                else speed_J4 = (J4 - $('encoder.joint_4').d) / DEG;
                speed_J4 = parseInt(Math.round(speed_J4));
                
                if(mode == 0) select('#speed_J4').property("value", speed_J4)
                else if(mode == 3) $('speed.joint_4').d = speed_J4;
                break;
            default: 
                break;
        }
    }
    /* // 슬라이더 삭제하자.
    select('#peripheral_select').on('change', function() {
        switch($('peripheral').d) {
            case 1:  // conveyor
                $('slider+speed').d = 0;
                $('slider+position').d = 0;
                select('#slider_speed').property("value", 0);
                select('#slider_position').property("value", 0);
                break;
            case 2:  // slider
                $('conveyor+speed').d = 0;
                select('#conveyor_speed').property("value", 0);
                break;
            default:  
                $('conveyor+speed').d = 0;
                $('slider+speed').d = 0;
                $('slider+position').d = 0;
                select('#conveyor_speed').property("value", 0);
                select('#slider_speed').property("value", 0);
                select('#slider_position').property("value", 0);
                break;
        }      
    });
*/

    select('#cmd_motor_onoff').on('click', function() {
        $('speed.motor').d = $('speed.motor').d ^ 0x01;
    });
    select('#angle_control_reset').on('click', function() {
        lock = 0;
        select('#lock_select').property("value", parseInt(lock));
        lock_J4(lock);
        
        angles = [...$('joint.angles^ready')];
        $('joint.angles').d = angles;
    
        input_angles();
        select("#angle_speed").property("value", 100);
        select("#angle_speed").node().dispatchEvent(new Event('input', { bubbles: true }));
    });

    select('#keyboard_joint').on('change', function() {
        keyboard_joint = parseInt(select('#keyboard_joint').property("value"));
    })
    select('#keyboard_key').on('change', function() {
        keyboard_key = select('#keyboard_key').property("value");
        switch(keyboard_key) {
            case "up":
                if(keyboard_joint == 2) 
                    $('speed.joint_2').d = parseInt(select('#keyboard_speed').property("value"));
                else if(keyboard_joint == 3) 
                    $('speed.joint_3').d = parseInt(select('#keyboard_speed').property("value"));
                else if(keyboard_joint == 4) 
                    $('speed.joint_4').d = parseInt(select('#keyboard_speed').property("value"));
                break;
            case "down":
                if(keyboard_joint == 2) 
                    $('speed.joint_2').d = parseInt(select('#keyboard_speed').property("value")) * -1;
                else if(keyboard_joint == 3) 
                    $('speed.joint_3').d = parseInt(select('#keyboard_speed').property("value")) * -1;
                else if(keyboard_joint == 4) 
                    $('speed.joint_4').d = parseInt(select('#keyboard_speed').property("value")) * -1;
                break;
            case "left":
                $('speed.joint_1').d = parseInt(select('#keyboard_speed').property("value"));
                break;
            case "right":
                $('speed.joint_1').d = parseInt(select('#keyboard_speed').property("value")) * -1;
                break;
            default:
                $('speed.joint_1').d = 0;
                $('speed.joint_2').d = 0;
                $('speed.joint_3').d = 0;
                $('speed.joint_4').d = 0;
                break;
        }
    })
    select('#cmd_set_note').on('click', function() {
        if($('sound').d !== 0) $('sound').d = 0;
        $('note').d = parseInt(select('#sound_note').property("value"));
    });
    select('#cmd_stop_note').on('click', function() {
        $('note').d = 0;
    });
    select('#cmd_set_sound').on('click', function() {
        $('sound').d = parseInt(select('#sound_sound').property("value"));
    });
    select('#cmd_stop_sound').on('click', function() {
        $('sound').d = 0;
    });
    select('#cmd_conveyor_speed_set').on('click', function() {
        $('conveyor+speed').d = parseInt(select('#conveyor_speed').property("value"));
    });
    select('#cmd_conveyor_speed_reset').on('click', function() {
        $('conveyor+speed').d = 0;
        select('#conveyor_speed').property("value", 0);
    });
    select('#cmd_slider_position_set').on('click', function() {
        $('slider+speed').d = parseInt(select('#slider_speed').property("value"));
        $('slider+position').d = parseInt(select('#slider_position').property("value"));
    });
    select('#cmd_slider_position_reset').on('click', function() {
        $('slider+speed').d = 0;
        $('slider+position').d = 0;
        select('#slider_speed').property("value", 0);
        select('#slider_position').property("value", 0);
    });
    select('#encoder_copy').on('click', function() {
        let encoder = [ parseFloat($('encoder.joint_1').d), parseFloat($('encoder.joint_2').d), parseFloat($('encoder.joint_3').d), parseFloat($('encoder.joint_4').d)];
        encoder = JSON.stringify(encoder);
        encoder = encoder.substring(1, encoder.length - 1);
        navigator.clipboard.writeText(encoder);

        select('#encoder_copy').select('rect').style("fill", "none");
        select('#encoder_copy').select('text').text("Copied!");
        select('#encoder_copy').style('pointer-events', 'none');

        setTimeout(() => {
            select('#encoder_copy').select('rect').style("fill", getColor('lightgreen'));
            select('#encoder_copy').select('text').text("COPY");
            select('#encoder_copy').style('pointer-events', 'all');
        }, 1500);
    })
    select('#xyz_copy').on('click', function() {
        let xyz = [ parseFloat(Number(select('#encoder_x').text().replace(' mm', ''))), parseFloat(Number(select('#encoder_y').text().replace(' mm', ''))), parseFloat(Number(select('#encoder_z').text().replace(' mm', ''))) ];
        xyz = JSON.stringify(xyz);
        xyz = xyz.substring(1, xyz.length - 1);
        navigator.clipboard.writeText(xyz);

        select('#xyz_copy').select('rect').style("fill", "none");
        select('#xyz_copy').select('text').text("Copied!");
        select('#xyz_copy').style('pointer-events', 'none');

        setTimeout(() => {
            select('#xyz_copy').select('rect').style("fill", getColor('lightgreen'));
            select('#xyz_copy').select('text').text("COPY");
            select('#xyz_copy').style('pointer-events', 'all');
        }, 1500);
    })
    
    if(select('#cmd_motor_onoff').node()) {
        if($('speed.motor').d) 
            select('#cmd_motor_onoff').select('rect').style("fill", getColor("lightgray"));
        else 
            select('#cmd_motor_onoff').select('rect').style("fill", getColor("yellow"));
    }
    if(select('#speed_J2').node()) {
        $('speed.joint_2').d = parseInt(select('#speed_J2').property("value"));
    }
    if(select('#speed_J1').node()) {
        $('speed.joint_1').d = parseInt(select('#speed_J1').property("value"));
    }
    if(select('#angle_J2').node()) {
        angles[1] = parseInt(select('#angle_J2').property("value"));
    }
    if(select('#angle_J1').node()) {
        angles[0] = parseInt(select('#angle_J1').property("value"));
    }
    if(select('#xyz_X').node()) {
        coordinate[0] = parseInt(select('#xyz_X').property("value"));
    }
    if(select('#xyz_Y').node()) {
        coordinate[1] = parseInt(select('#xyz_Y').property("value"));
    }
    if(select('#xyz_Z').node()) {
        coordinate[2] = parseInt(select('#xyz_Z').property("value"));
    }
    if(select('#dragging').node()) {
        if(angle_dragged == true && JSON.parse(select('#dragging').property("value")) == false) {
            switch(mode) {
                case 1:  // angle control
                    $('joint.max_speed').d = select('#angle_speed').node() ? parseInt(select('#angle_speed').property("value")) : 100;
                    lock_angles();  // check the range of angles
                    input_angles();
                    $('joint.angles').d = angles;  
                    break;
                case 2:  // xyz control
                    $('joint.max_speed').d = select('#xyz_speed').node() ? parseInt(select('#xyz_speed').property("value")) : 100;
                    let valid = check_xyz_range();  // check the range of xyz
                    valid_xyz(valid);  // show if the input is valid or not
                    
                    // move only when the input is valid
                    if(valid) old_coordinate = [...coordinate];
                    else coordinate = [...old_coordinate];
                    
                    xyz_to_angles();
                    $('joint.angles').d = angles;
                    input_xyz();
                    break;
            }
        }
        angle_dragged = JSON.parse(select('#dragging').property("value"));
    }
    if(select('#encoder_joint_2').node()) {
        select('#encoder_joint_2').text($('encoder.joint_2').d + ' °');
    }
    if(select('#encoder_joint_1').node()) {
        select('#encoder_joint_1').text($('encoder.joint_1').d + ' °');
    }
    if(select('#encoder_x').node() && select('#encoder_y').node() && select('#encoder_z').node()) {
        angles_to_xyz();
    }

    if(select('#signal_strength').node() && $('signal_strength').d < 0) {
        select('#signal_strength').text($('signal_strength').d + ' dBm');
    }
    if(select('#battery_level').node() && $('battery.level').d > 2.00) {
        select('#battery_level').text($('battery.level').d.toFixed(2) + ' V');
    }
    if(select('#warning').node()) {
        select('#warning').text($('warning').d);
    }
    if(select('#peripheral_select').node()) {
        $('peripheral').d = parseInt(select('#peripheral_select').property("value"));
    }
    
           // 이거 angle_to_xy()로 수정 및 로직 개선 필요
    function angles_to_xyz() {
        // encoder of coordinate xyz (-292.5 ~ 292.5)
        const len_J1 = 0, len_J2 = 100, len_J3 = 100, len_J4 = 92.5;  // 92.5
        const angle_J1 = toRAD($('encoder.joint_1').d), angle_J2 = toRAD($('encoder.joint_2').d), angle_J3 = toRAD($('encoder.joint_3').d), angle_J4 = toRAD($('encoder.joint_4').d);
        
        let len_xy = (len_J2 * Math.cos(angle_J2)) + (len_J3 * Math.cos(angle_J2 + angle_J3));  // + (len_J4 * Math.cos(angle_J2 + angle_J3 + angle_J4));
        let x = len_xy * Math.cos(angle_J1);
        let y = len_xy * Math.sin(angle_J1);
        let z = len_J1 + (len_J2 * Math.sin(angle_J2)) + (len_J3 * Math.sin(angle_J2 + angle_J3));  // + (len_J4 * Math.sin(angle_J2 + angle_J3 + angle_J4));
    
        select('#encoder_x').text(parseFloat(x.toFixed(3)) + ' mm');
        select('#encoder_y').text(parseFloat(y.toFixed(3)) + ' mm');
        select('#encoder_z').text(parseFloat(z.toFixed(3)) + ' mm');
    }
    
    function xyz_to_angles() {
        const [x, y, z] = [...coordinate];
        const len_J1 = 0, len_J2 = 100, len_J3 = 100, len_J4 = 92.5;
        let theta = 0;  // set as horizontal mode
        if(lock == 1) theta = -90;
        
        // angle1
        angles[0] = toDEG( Math.atan2(y, x) );
        let sin1 = Math.sin(angles[0])
        let cos1 = Math.cos(angles[0])
        
        // angle3
        let cos3 = (Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z-len_J1, 2) - Math.pow(len_J2, 2) - Math.pow(len_J3, 2)) / (2 * len_J2 * len_J3);
        let sin3 = Math.sqrt(1 - Math.pow(cos3, 2)); 
        angles[2] = toDEG( Math.atan2(sin3, cos3) ) * -1;

        // angle2
        let cos2 = (x * (len_J2 * cos1 + len_J3 * cos1 * cos3)) + (y * (len_J2 * sin1 + len_J3 * cos3 * sin1)) - (len_J3 * sin3 * z);
        let sin2 = (z * (len_J2 + len_J3 * cos3)) + (len_J3 * sin3) * (cos1 * x + sin1 * y);
        angles[1] = toDEG( Math.atan2(sin2, cos2) );
        
        // angle4
        angles[3] = theta - (angles[1] + angles[2]);
        if(angles[3] > 100) angles[3] = 100;  //  105
        else if(angles[3] < -100) angles[3] = -100;  // -105
    }
    
    function check_xyz_range() {
        const [x, y, z] = [...coordinate];
        let w = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        
        let move_x = Math.abs(Number(select('#encoder_x').text().replace(' mm', '')) - x);
        let move_y = Math.abs(Number(select('#encoder_y').text().replace(' mm', '')) - y);
        let move_z = Math.abs(Number(select('#encoder_z').text().replace(' mm', '')) - z);
        let max_move = Math.max(move_x, move_y, move_z);
        if(max_move == move_x) max_move = 'x';
        else if(max_move == move_y) max_move = 'y';
        else if(max_move == move_z) max_move = 'z';
        
        if(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) > Math.pow(200, 2)) 
            return false;
        if(x < 0) {
            if(w > 100) return false;
            else if(0 <= w && w < 100) {
                if(toDEG( Math.atan2(y, x) ) <= -120 || toDEG( Math.atan2(y, x) ) >= 120)
                    return false;
                if(!check3(w, z) || !check4(w, z)) 
                    return false;
            }
        }
        else if(x >= 0) {
            if(0 < w && w <= 50 * (Math.sqrt(3) - 1)) {
                if(!check3(w, z) || !check4(w, z)) 
                    return false;
            }
            else if(w > 50 * (Math.sqrt(3) - 1) && w <= 50) {
                if(!check3(w, z) || !check4(w, z) || !check5(w, z)) 
                    return false;
            }
            else if(w > 50 && w <= 100 * Math.sqrt(2 - Math.sqrt(3))) {
                if(!check3(w, z) || !check5(w, z)) 
                    return false;
            }
            else if(w > 100 * Math.sqrt(2 - Math.sqrt(3)) && w <= 100 + 100 * Math.cos(toRAD(-100))) {
                if(!check1(w, z) || !check3(w, z)) 
                    return false;
            }
            else if(w > 100 + 100 * Math.cos(toRAD(-100)) && w <= 200) {
                if((z < 0 && !check2(w, z)) || (z > 0 && !check3(w, z))) 
                    return false;
            }
        }
        return true;
        
        function check1(a, b) {  // A -> B
            return b > ((100 * Math.sin(toRAD(-100))) / (100 + 100 * Math.cos(toRAD(-100)) - (100 * (2 - Math.sqrt(3))))) * (a - (100 * Math.sqrt(2 - Math.sqrt(3))));
        }
        function check2(a, b) {  // B -> C
            return Math.pow(a - 100, 2) + Math.pow(b, 2) <= Math.pow(100, 2);
        }
        function check3(a, b) {  // C -> D
            return Math.pow(a, 2) + Math.pow(b, 2) <= Math.pow(200, 2);
        }
        function check4(a, b) {  // D -> E
            return Math.pow(a + 50, 2) + Math.pow(b - 50 * Math.sqrt(3), 2) > Math.pow(100, 2);
        }
        function check5(a, b) {  // E -> A
            return Math.pow(a, 2) + Math.pow(b, 2) > Math.pow(100 * Math.sqrt(2 - Math.sqrt(3)), 2);
        }
        function toRAD(n) {
            return n * Math.PI / 180;
        }
    }
    function input_angles() {
        select("#angle_J2").property("value", parseInt(Math.round(angles[1])));
        select("#angle_J2").node().dispatchEvent(new Event('input', { bubbles: true }));

        select("#angle_J1").property("value", parseInt(Math.round(angles[0])));
        select("#angle_J1").node().dispatchEvent(new Event('input', { bubbles: true }));
    }
    function input_xyz() {
        select("#xyz_X").property("value", parseInt(Math.round(coordinate[0])));
        select("#xyz_X").node().dispatchEvent(new Event('input', { bubbles: true }));

        select("#xyz_Y").property("value", parseInt(Math.round(coordinate[1])));
        select("#xyz_Y").node().dispatchEvent(new Event('input', { bubbles: true }));

        select("#xyz_Z").property("value", parseInt(Math.round(coordinate[2])));
        select("#xyz_Z").node().dispatchEvent(new Event('input', { bubbles: true }));
    }
    function valid_xyz(valid) {
        if(!valid) {
            select('#invalid_xyz').style("visibility", "visible");
            setTimeout(() => {
                select('#invalid_xyz').style("visibility", "hidden");
            }, 1500);
        }
        else select('#invalid_xyz').style("visibility", "hidden");
    }
    function toDEG(n) {
        return n * 180 / Math.PI;
    }
    function toRAD(n) {
        return n * Math.PI / 180;
    }
}

function getColor(color) {
    const colors = {
        "red": 'rgba(239, 83, 80, 0.4)',  //  #EF5350
        "orange": '#ffA500',
        "yellow": '#FF8',
        "lightgreen": 'rgba(102, 187, 106, 0.4)', // '#66BB6A'
        "green": '#3CB371',
        "blue": '#2196F3',
        "lightgray": '#EEE',
    }
    return colors[color];
}
