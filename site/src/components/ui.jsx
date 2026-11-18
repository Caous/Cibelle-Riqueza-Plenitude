import {
  Brain, MessagesSquare, Wallet, Target, ShieldCheck, TrendingUp, Baby, Receipt,
  HeartHandshake, GraduationCap, BookOpen, Compass, Table2, Check, ArrowRight,
  Quote, MessageCircle, UserRound,
} from 'lucide-react'
import { rosettePaths } from '../lib/guilloche'
import { CTA_URL } from '../content'

const icons = { Brain, MessagesSquare, Wallet, Target, ShieldCheck, TrendingUp, Baby, Receipt, HeartHandshake, GraduationCap, BookOpen, Compass, Table2, Check, ArrowRight, Quote, MessageCircle, UserRound }

export const Icon = ({ name, size = 28, ...p }) => {
  const C = icons[name]
  return C ? <C size={size} strokeWidth={1.6} aria-hidden="true" {...p} /> : null
}

export const Button = ({ children, variant = 'gold', href = CTA_URL, ...p }) => (
  <a className={`btn btn-${variant}`} href={href} {...p}>
    <span>{children}</span>
    <Icon name="ArrowRight" size={20} />
  </a>
)

export const Label = ({ children, dark }) => (
  <p className={`label ${dark ? 'label-dark' : ''}`} data-reveal>{children}</p>
)

const paths = rosettePaths({ size: 720, curves: 22 })
export const Rosette = ({ className = '' }) => (
  <svg className={`rosette ${className}`} viewBox="0 0 720 720" aria-hidden="true">
    {paths.map((d, i) => (
      <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="0.6" opacity={0.28 + (i % 4) * 0.1} />
    ))}
  </svg>
)

export const Coin = ({ className = '', style }) => (
  <span className={`coin ${className}`} style={style} aria-hidden="true"><i /></span>
)
