# Hyperpop Daily Discord Message

매일 KST 17:43에 하이퍼팝 제작자를 위한 3문단 메시지를 디스코드로 전송합니다.

## 구성
- `messages.json`: 메시지 데이터 풀 (30개)
- `script.mjs`: 랜덤 선택 후 Discord Webhook 전송
- `.github/workflows/daily.yml`: GitHub Actions 스케줄

## 사용 방법
1) GitHub repo로 올리기
2) Discord Webhook URL 발급
   - 서버 설정 -> Integrations -> Webhooks
3) GitHub repo -> Settings -> Secrets and variables -> Actions
   - `DISCORD_WEBHOOK_URL` 등록
4) Actions 탭에서 `daily-hyperpop` 워크플로 확인

## 테스트 (로컬)
```bash
DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/..." node script.mjs
```

## 스케줄
- KST 17:43 = UTC 08:43
- GitHub Actions `schedule`은 best-effort라 정각 트래픽 집중/러너 가용성에 따라 지연될 수 있습니다.
