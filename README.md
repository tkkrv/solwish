# SolWish ✨
> *«Цветы завянут — SolWish нет»*

**SolWish** — децентрализованный протокол вишлистов и социальных микроподарков на блокчейне Solana. Платформа позволяет создавать персонализированные списки желаний, делиться ими в виде автономных **Solana Blinks** в Twitter/X и Discord, а также взаимодействовать через **Telegram Mini App**. Дарители могут исполнять мечты в 1 клик с нулевой комиссией платформы и вечной памятной открыткой, запечатанной в блокчейн через SPL Memo.

---

## 🔗 Быстрые ссылки

- 🌐 **Live Demo (Web & Blink Player):** [https://solwish-theta.vercel.app](https://solwish-theta.vercel.app)
- 📱 **Telegram Mini App:** [@Sol_Wish_bot](https://t.me/Sol_Wish_bot)
- 🎁 **Создать вишлист:** [https://solwish-theta.vercel.app/create](https://solwish-theta.vercel.app/create)
- ⚡ **Сеть:** Solana Devnet
- 🏆 **Хакатон:** Colosseum Solana Hackathon

---

## 💡 Проблема и Решение

| Проблема традиционных сервисов | Решение SolWish |
| :--- | :--- |
| **Высокие комиссии:** Сервисы сбора берут от 5% до 15% за вывод средств. | **0% Platform Fees:** 100% средств переводятся напрямую P2P на кошелек автора. |
| **Забытые открытки:** Бумажные открытки теряются, а цветы увядают за 3 дня. | **Вечная ончейн-память:** Поздравление и имя дарителя навсегда вписаны в историю транзакции. |
| **Сложный UX:** Необходимость регистрироваться, вводить номера карт и переходить по 10 ссылкам. | **1 клик в соцсетях:** Нативный Solana Blink прямо в ленте X/Twitter или Telegram Mini App. |

---

## ⚡ Ключевые возможности

1. **Zero Platform Fees (Pure P2P):**  
   Прямой перевод SOL с кошелька дарителя на кошелек автора через `SystemProgram.transfer`. Никаких депозитных смарт-контрактов, холдов или шлюзов вывода.
2. **Ончейн-открытка (SPL Memo Program v2):**  
   Каждая транзакция параллельно прикрепляет структурированные данные (имя дарителя, текст пожелания, ID подарка) в инструкцию программы `MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`.
3. **Omnichannel Web3 UX:**
   - **Solana Actions & Blinks:** Спецификация `/api/actions/gift` и `actions.json` для разворачивания интерактивных виджетов в соцсетях.
   - **Telegram Mini App:** Нативный запуск через `@Sol_Wish_bot` без выхода из мессенджера.
   - **Standalone Web App:** Адаптивный веб-интерфейс с поддержкой Phantom и Solflare.

---

## 🛠 Архитектура и Стек

- **Frontend / Backend:** Next.js (App Router), TypeScript, Tailwind CSS
- **Blockchain SDK:** `@solana/web3.js`, `@solana/actions`, `@solana/wallet-adapter`
- **Solana Programs:**
  - `System Program` — P2P расчеты
  - `SPL Memo Program v2` (`MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`) — хранение метаданных открыток
- **Деплой:** Vercel

---

## 🚀 Локальный запуск

```bash
# Клонировать репозиторий
git clone [https://github.com/tkkrv/solwish.git](https://github.com/tkkrv/solwish.git)
cd solwish

# Установить зависимости
npm install

# Запустить режим разработки
npm run dev
