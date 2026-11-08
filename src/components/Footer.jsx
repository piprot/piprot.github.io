import { Link } from 'react-router-dom'
import { nextOpen } from '../data/workshops'

const FEEDBACK_EMAIL = '39764023@qq.com'
const FEEDBACK_MAILTO = 'mailto:' + FEEDBACK_EMAIL + '?subject=' + encodeURIComponent('读者来信 · 云月峻岭')

export default function Footer() {
  const nx = nextOpen()
  return (
    <footer className="border-t border-black/[.06] bg-[#f5f5f7]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="text-[17px] font-bold text-[#1d1d1f] mb-2">云月峻岭</div>
            <p className="text-[13px] leading-relaxed text-[#86868b] max-w-sm">
              拆的是 AI 软件，拆的是 AI，拆为己用。面向学习者的工作坊课程阵地。
            </p>
          </div>
          <div>
            <div className="text-[12px] font-semibold text-[#1d1d1f] mb-3">课程</div>
            <ul className="space-y-2 text-[13px] text-[#6e6e73]">
              <li><Link to="/workshops" className="hover:text-[#0071e3] transition-colors">工作坊全系列</Link></li>
              <li><Link to="/learning-path" className="hover:text-[#0071e3] transition-colors">拆成长</Link></li>
              <li><a href={nx ? nx.link : '/workshops'} className="hover:text-[#0071e3] transition-colors">{nx ? '报名下一场' : '课程材料回看'}</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[12px] font-semibold text-[#1d1d1f] mb-3">资源</div>
            <ul className="space-y-2 text-[13px] text-[#6e6e73]">
              <li><Link to="/hot/books" className="hover:text-[#0071e3] transition-colors">拆经典</Link></li>
              <li><Link to="/skills" className="hover:text-[#0071e3] transition-colors">拆技能工坊</Link></li>
              <li><a href="https://www.aibay.asia" target="_blank" rel="noreferrer" className="hover:text-[#0071e3] transition-colors">aibay.asia</a></li>
              <li><a href={FEEDBACK_MAILTO} className="hover:text-[#0071e3] transition-colors">读者来信</a></li>
              <li><a href="/articles/" className="hover:text-[#0071e3] transition-colors">文章归档</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 rounded-xl border border-black/[.06] bg-white/70 px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <span className="text-[13px] text-[#6e6e73]">读到有想法、想提问，或想聊聊职场与业务？欢迎给站长写信，也欢迎关注公众号「大红帮帮您」。</span>
          <a href={FEEDBACK_MAILTO} className="text-[13px] font-medium text-[#0071e3] hover:underline whitespace-nowrap">读者来信 · {FEEDBACK_EMAIL} ↗</a>
        </div>
        <div className="mt-10 pt-6 border-t border-black/[.06] flex flex-col md:flex-row justify-between gap-2 text-[12px] text-[#86868b]">
          <span>© 2026 云月峻岭</span>
          <span>方法论支持：拆书帮（chaishubang.net） · 拆为己用</span>
        </div>
      </div>
    </footer>
  )
}
