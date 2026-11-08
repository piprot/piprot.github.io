import { useState } from 'react'
import { motion } from 'framer-motion'

const NEEDS_API = 'https://api.aibay.asia/needs/needs'

function MessageBoard() {
  const [form, setForm] = useState({ name: '', msg: '', contact: '' })
  const [state, setState] = useState('idle')
  const [tip, setTip] = useState('')
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    if (state === 'sending') return
    if (form.msg.trim().length < 2) {
      setState('error')
      setTip('留言至少写两个字吧')
      return
    }
    setState('sending')
    setTip('')
    try {
      const r = await fetch(NEEDS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          software: `【留言板】${form.name.trim() || '匿名站友'}`,
          scene: '关于页留言板',
          expect: form.msg.trim(),
          contact: form.contact.trim() || '（未留联系方式，无需回复）',
          website: '',
        }),
      })
      const d = await r.json().catch(() => ({}))
      if (r.ok && d.ok) {
        setState('ok')
        setTip('留言已提交，感谢！')
        setForm({ name: '', msg: '', contact: '' })
      } else {
        setState('error')
        setTip(d.error || '提交失败，请稍后再试')
      }
    } catch {
      setState('error')
      setTip('网络异常——也可以直接加微信 yunlinyue')
    }
  }

  return (
    <form onSubmit={submit} className="p-6 rounded-xl bg-dark-card-hover/50 border border-dark-border space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input value={form.name} onChange={set('name')} maxLength={20} className="rounded-xl bg-[#f5f5f7] px-3.5 py-2.5 text-[13px] text-[#1d1d1f] outline-none focus:ring-2 focus:ring-neon-purple/30" placeholder="怎么称呼你？（可不填）" />
        <input value={form.contact} onChange={set('contact')} maxLength={40} className="rounded-xl bg-[#f5f5f7] px-3.5 py-2.5 text-[13px] text-[#1d1d1f] outline-none focus:ring-2 focus:ring-neon-purple/30" placeholder="联系方式，想收到回复就留（可不填）" />
      </div>
      <textarea value={form.msg} onChange={set('msg')} maxLength={500} rows={3} className="w-full rounded-xl bg-[#f5f5f7] px-3.5 py-2.5 text-[13px] text-[#1d1d1f] outline-none focus:ring-2 focus:ring-neon-purple/30 resize-none" placeholder="给站长和站友们说句话——建议、疑问、感想都行" />
      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-neon-purple to-neon-blue text-white text-[13px] font-bold disabled:opacity-50"
        >
          {state === 'sending' ? '发送中…' : '写下留言'}
        </button>
        {tip && (
          <span className={`text-xs ${state === 'ok' ? 'text-green-600' : 'text-red-500'}`}>{tip}</span>
        )}
      </div>
    </form>
  )
}

export default function About() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          {/* ① 我是谁 · 品牌与一句话身份 */}
          <div className="text-center mb-12">
            <img src="/images/loong-logo.svg" alt="云月峻岭" className="w-24 h-auto mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-black text-[#1d1d1f] mb-3">云月峻岭</h1>
            <p className="text-neon-purple font-medium">职场咨询顾问 · 企业管理数字化顾问 · 营销业绩提升教练</p>
          </div>

          {/* ① 我是谁 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#1d1d1f] mb-4">① 我是谁</h2>
            <p className="text-base font-bold text-[#1d1d1f] leading-relaxed mb-4">
              我是一名职场咨询顾问，也是企业管理数字化顾问、营销业绩提升教练。
            </p>
            <div className="flex flex-wrap gap-2">
              {['职场咨询顾问', '企业管理数字化顾问', '营销业绩提升教练'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ② 我做什么 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#1d1d1f] mb-4">② 我做什么</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { name: '职场咨询顾问', desc: '为职场人做优势定位与转行转型教练。' },
                { name: '企业管理数字化顾问', desc: '服务科技、金融、消费领域的中小企业。' },
                { name: '营销业绩提升教练', desc: '专注商业模式与销售团队培养。' },
              ].map(s => (
                <div key={s.name} className="p-4 rounded-xl bg-dark-card-hover/50 border border-dark-border">
                  <div className="text-base font-bold text-[#1d1d1f] mb-2">{s.name}</div>
                  <div className="text-sm text-[#6e6e73] leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ③ 怎么找到我 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#1d1d1f] mb-4">③ 怎么找到我</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: '微信', value: 'yunlinyue' },
                { label: '邮箱', value: '39764023@qq.com' },
                { label: '公众号', value: '大红帮帮您' },
              ].map(info => (
                <div key={info.label} className="p-4 rounded-xl bg-dark-card-hover/50 border border-dark-border">
                  <div className="text-xs text-[#86868b] mb-1">{info.label}</div>
                  <div className="text-sm text-[#1d1d1f]">{info.value}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#86868b] mt-3">想聊聊优势定位、管理数字化或营销业绩，微信、邮箱或公众号「大红帮帮您」都能找到我。</p>
          </div>

          {/* 内容说明与版权 */}
          <div className="mb-10">
            <div className="p-5 rounded-xl bg-dark-card-hover/50 border border-dark-border">
              <p className="text-xs text-[#86868b] leading-relaxed">
                本站「拆经典」等栏目内容整理自拆书帮社区公开拆页（非官方），著作权归各位拆书家本人所有，仅作学习交流之用、不用于商业用途；个人信息已脱敏。如有异议请联系站长（微信 yunlinyue / 邮箱 39764023@qq.com），核实后即刻移除。
              </p>
            </div>
          </div>

          {/* 留言板 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#1d1d1f] mb-2">留言板</h2>
            <p className="text-sm text-[#6e6e73] mb-4">匿名即可，不用注册任何账号；想收到回复就顺手留个联系方式。</p>
            <MessageBoard />
          </div>

          {/* 联系 CTA */}
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 border border-neon-purple/20 text-center">
            <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">联系我</h3>
            <p className="text-sm text-[#6e6e73] mb-4">
              职场咨询 · 管理数字化 · 营销业绩提升
            </p>
            <span
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-neon-purple to-neon-blue text-white font-medium text-sm"
            >
              微信联系 · yunlinyue
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
