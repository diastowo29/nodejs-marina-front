FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV BACKEND_HOST marina-apps.et.r.appspot.com
ENV NEXT_PUBLIC_SHOPEE_HOST https://partner.shopeemobile.com
ENV NEXT_PUBLIC_SHOPEE_PARTNER_ID 2010813
ENV NEXT_PUBLIC_AUTH0_BASE_URL https://marinapps.id
ENV NEXT_PUBLIC_APP_BASE_URL https://app.marinapps.id
ENV NEXT_PUBLIC_LAZ_APP_OMS_KEY_ID 131555
ENV NEXT_PUBLIC_LAZ_APP_CHAT_KEY_ID 131557
ENV NEXT_PUBLIC_SHOPEE_REDIRECT_URL https://marina-apps-553781175495.asia-southeast2.run.app/
ENV NEXT_PUBLIC_SHOPEE_PARTNER_KEY 754d647958715a6f65586b68745369784f64475a414a634668704c526459704c

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]