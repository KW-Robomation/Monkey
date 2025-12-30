# plotto

**plotto**는 SVG 경로를 로봇팔의 관절 움직임으로 변환하고,  
이를 하드웨어와 효율적으로 통신하기 위한 로봇팔 시뮬레이터 프로젝트입니다.

## 사용 방법
 - 저장소 내의 simulator-plotto.roboid를 다운로드 받습니다.
 - 다운로드가 완료 되었다면, https://rbmate.com/RoboidModeler/에 접속합니다.<br>
   ![](https://github.com/user-attachments/assets/8690a508-5aec-4471-93dd-4be11a8284df)
 - 좌측 상단 -> 열기 -> 다운로드 받은 simulator-plotto.roboid를 선택합니다.<br>
   <img width="368" height="326" alt="Image" src="https://github.com/user-attachments/assets/acbc2a0b-7dae-44dc-9e0a-3f83f3ebe266" />
 - 다음과 같은 블록 화면이 되었다면 로드가 정상적으로 완료 된 것 입니다.
   ![](https://github.com/user-attachments/assets/400dd5d3-d126-4bc2-99bb-fd073c2e2cfe)
 - 로드가 완료되었다면, 대시보드를 클릭하여 프로그램을 실행하시면 됩니다.
 - 이후, 프로그램 사용 법은 저장소 https://github.com/KW-Robomation/Monkey/wiki 를 참고해주세요.
 - **또한, 동작(그리기)가 실행되지 않는다면, 새로고침 후 다시 실행해주세요.**
## Documentation

- [plotto Path 구조 및 통신 방식](docs/plotto_Path.md)
- [plotto 스펙(제원)](docs/HW_Specification.md)
- [SVG Parsing 처리](docs/Parsing.md)
- [plotto 용어 문서](docs/Terminology.md)
- [plotto 대시보드 UI](docs/Dashboard.md)
- [plotto 전체 함수 설명](docs/Function.md)

## Repository Structure

- `README.md` : 프로젝트 개요
- `docs/` : 세부 기술 문서
