/** @type {import('next').NextConfig} */
import { i18n } from './next-i18next.config'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n
}
module.exports = nextConfig
