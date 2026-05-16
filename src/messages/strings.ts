import type { Lang } from "@/lib/lang";

export type NavId = "home" | "about" | "coaches" | "facilities" | "gallery" | "contact";

export type SiteStrings = {
  siteName: string;
  siteTagline: string;
  nav: Record<NavId, string>;
  footer: {
    rights: string;
    privacy: string;
    terms: string;
  };
  home: {
    pageTitle: string;
    heroTitle: string;
    heroLead: string;
    ctaAbout: string;
    ctaContact: string;
    highlightsTitle: string;
    highlights: { title: string; body: string }[];
  };
  about: { pageTitle: string; title: string; p1: string; p2: string };
  coaches: { pageTitle: string; title: string; lead: string; coaches: { name: string; role: string; bio: string }[] };
  facilities: { pageTitle: string; title: string; lead: string; items: { title: string; body: string }[] };
  gallery: { pageTitle: string; title: string; lead: string; captions: string[] };
  contact: {
    pageTitle: string;
    title: string;
    lead: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    labelAddress: string;
    labelPhone: string;
    labelEmail: string;
    labelHours: string;
    mapLabel: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
    formNote: string;
    formSent: string;
    formFailed: string;
  };
};

export const STRINGS: Record<Lang, SiteStrings> = {
  ja: {
    siteName: "EVERWILD テニスクラブ",
    siteTagline: "コートとコーチ、そしてコミュニティ。",
    nav: {
      home: "ホーム",
      about: "クラブについて",
      coaches: "コーチ",
      facilities: "施設",
      gallery: "ギャラリー",
      contact: "お問い合わせ"
    },
    footer: {
      rights: "© EVERWILD Tennis Club. All rights reserved.",
      privacy: "プライバシーポリシー",
      terms: "利用規約"
    },
    home: {
      pageTitle: "ホーム",
      heroTitle: "ラリーからレッスンまで、一つの場所で。",
      heroLead:
        "硬式・屋内コート、経験豊富なコーチ陣、そして歓迎の文化。初心者から競技志向のプレーヤーまで。",
      ctaAbout: "クラブについて",
      ctaContact: "見学・問い合わせ",
      highlightsTitle: "選ばれる理由",
      highlights: [
        { title: "プロ仕様のコート", body: "メンテナンスされた表面と照明。快適なプレー環境。" },
        { title: "段階的なレッスン", body: "キッズから大人まで、目標に合わせたプログラム。" },
        { title: "コミュニティ", body: "ソーシャルイベントとリーグでつながりを深める。" }
      ]
    },
    about: {
      pageTitle: "クラブについて",
      title: "プレーを大切にする文化",
      p1: "EVERWILD Tennis Club は、技術向上とウェルビーイングの両立を目指します。公平な精神と安全を最優先に、すべてのメンバーを歓迎します。",
      p2: "このサイトはマーケティング用の静的プレビューです。正式なスケジュールや料金はスタッフへお問い合わせください。"
    },
    coaches: {
      pageTitle: "コーチ",
      title: "コーチチーム",
      lead: "認定資格と豊富なコート経験を持つコーチがサポートします。",
      coaches: [
        { name: "Alex Chen", role: "ヘッドコーチ", bio: "ジュニア開発と競技志向プレーヤーを専門。" },
        { name: "Jordan Lee", role: "フィットネス", bio: "ケガ予防と機動力のためのコンディショニング。" },
        { name: "Sam Rivera", role: "レッスン", bio: "初級〜中級向けグループとプライベート。" }
      ]
    },
    facilities: {
      pageTitle: "施設",
      title: "施設とアメニティ",
      lead: "快適にプレーし、リフレッシュできる空間。",
      items: [
        { title: "屋内ハードコート", body: "天候に左右されないプレー。最新のコート表面。" },
        { title: "更衣室・シャワー", body: "清潔で広々としたロッカールーム。" },
        { title: "ラウンジ", body: "試合後の休憩やミーティングに。" },
        { title: "駐車場", body: "来場者向けの駐車スペース（詳細はお問い合わせ）。" }
      ]
    },
    gallery: {
      pageTitle: "ギャラリー",
      title: "コートの雰囲気",
      lead: "イベントと日常のひとコマ（プレースホルダー画像）。",
      captions: ["ダブルスの夜", "ジュニアキャンプ", "朝のレッスン", "クラブ選手権", "ストレッチエリア", "ロビー"]
    },
    contact: {
      pageTitle: "お問い合わせ",
      title: "ご連絡ください",
      lead:
        "体験・見学や入会のご希望は、まずこのページからご連絡ください。スタッフがプログラム内容と次のステップをご案内します。",
      address: "〒000-0000 東京都（プレースホルダー）",
      phone: "+81 00-0000-0000",
      email: "hello@example.com",
      hours: "受付時間の目安：平日 10:00–20:00 / 土日 9:00–18:00（確定スケジュールは返信時に調整）",
      labelAddress: "住所",
      labelPhone: "電話",
      labelEmail: "メール",
      labelHours: "営業時間",
      mapLabel: "地図で開く（外部リンク）",
      formName: "お名前",
      formEmail: "メール",
      formMessage: "メッセージ",
      formSubmit: "送信",
      formNote:
        "フォーム送信には Formspree のエンドポイント設定が必要です（README 参照）。設定前でもメールで同様にお問い合わせいただけます。",
      formSent: "送信しました。ありがとうございます。",
      formFailed: "送信に失敗しました。時間をおいて再度お試しください。"
    }
  },
  en: {
    siteName: "EVERWILD Tennis Club",
    siteTagline: "Courts, coaching, and community.",
    nav: {
      home: "Home",
      about: "About",
      coaches: "Coaches",
      facilities: "Facilities",
      gallery: "Gallery",
      contact: "Contact"
    },
    footer: {
      rights: "© EVERWILD Tennis Club. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Use"
    },
    home: {
      pageTitle: "Home",
      heroTitle: "From rally nights to structured lessons.",
      heroLead:
        "Hard courts, indoor options, experienced coaches, and a welcoming culture—for beginners and competitive players alike.",
      ctaAbout: "About the club",
      ctaContact: "Book a visit",
      highlightsTitle: "Why members choose us",
      highlights: [
        { title: "Pro-grade courts", body: "Well-maintained surfaces and lighting for comfortable play." },
        { title: "Progressive coaching", body: "Programs for juniors and adults aligned to your goals." },
        { title: "Community", body: "Social mixers and ladders to meet partners and build habits." }
      ]
    },
    about: {
      pageTitle: "About",
      title: "A culture that respects the game",
      p1: "EVERWILD Tennis Club exists to grow skill and wellbeing together. We welcome every member with sportsmanship and safety first.",
      p2: "This marketing site is a static preview. For schedules and pricing, please contact the front desk."
    },
    coaches: {
      pageTitle: "Coaches",
      title: "Meet the coaching team",
      lead: "Certified pros with deep on-court experience across ages and levels.",
      coaches: [
        { name: "Alex Chen", role: "Head coach", bio: "Junior development and competitive pathway programming." },
        { name: "Jordan Lee", role: "Performance", bio: "Mobility and conditioning to reduce injury risk." },
        { name: "Sam Rivera", role: "Instruction", bio: "Beginner to intermediate groups and private lessons." }
      ]
    },
    facilities: {
      pageTitle: "Facilities",
      title: "Spaces that support great sessions",
      lead: "Play hard, recover well, and connect between sets.",
      items: [
        { title: "Indoor hard courts", body: "Weather-proof play with modern court surfaces." },
        { title: "Locker rooms", body: "Clean, spacious changing and shower facilities." },
        { title: "Member lounge", body: "A calm spot for post-match debriefs and meetings." },
        { title: "Parking", body: "Visitor parking available—ask staff for details." }
      ]
    },
    gallery: {
      pageTitle: "Gallery",
      title: "Court life in frames",
      lead: "Moments from events and everyday play (placeholder tiles).",
      captions: ["Doubles night", "Junior camp", "Morning drills", "Club championship", "Stretch zone", "Lobby"]
    },
    contact: {
      pageTitle: "Contact",
      title: "We would love to hear from you",
      lead:
        "Share your goals for a tour, trial lesson, or membership—staff will follow up with programming details and next steps.",
      address: "123 Placeholder Ave, City, ST 00000",
      phone: "+1 (000) 000-0000",
      email: "hello@example.com",
      hours: "Typical hours: Mon–Fri 10:00–20:00 / Sat–Sun 9:00–18:00 (exact timing confirmed in replies)",
      labelAddress: "Address",
      labelPhone: "Phone",
      labelEmail: "Email",
      labelHours: "Hours",
      mapLabel: "Open in maps (external)",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formSubmit: "Send",
      formNote:
        "To enable the contact form, set NEXT_PUBLIC_FORMSPREE_ENDPOINT (see README). You can also email us directly while it is being configured.",
      formSent: "Thanks — your message was sent.",
      formFailed: "Something went wrong. Please try again later."
    }
  },
  zh: {
    siteName: "EVERWILD 网球俱乐部",
    siteTagline: "场地、教练与社群，一站齐备。",
    nav: {
      home: "首页",
      about: "关于俱乐部",
      coaches: "教练团队",
      facilities: "场地设施",
      gallery: "图集",
      contact: "联系我们"
    },
    footer: {
      rights: "© EVERWILD Tennis Club. 保留所有权利。",
      privacy: "隐私政策",
      terms: "使用条款"
    },
    home: {
      pageTitle: "首页",
      heroTitle: "从约球夜训到系统课程，都在这里。",
      heroLead: "硬地/室内场地、经验丰富的教练团队，以及开放友好的俱乐部文化——无论入门还是进阶，都能找到节奏。",
      ctaAbout: "了解俱乐部",
      ctaContact: "预约参观 / 咨询",
      highlightsTitle: "为什么选择我们",
      highlights: [
        { title: "专业级场地", body: "维护良好的面层与灯光，长时间打球也舒适。" },
        { title: "循序渐进的教学", body: "面向青少年与成人的分级课程，贴合你的目标。" },
        { title: "活跃社群", body: "活动与小型联赛，帮你找到固定球友与练习节奏。" }
      ]
    },
    about: {
      pageTitle: "关于我们",
      title: "尊重运动，也尊重彼此",
      p1: "EVERWILD 网球俱乐部希望把「技术进步」与「身心健康」放在一起。我们以安全、公平与包容为前提，欢迎每一位成员。",
      p2: "本站为展示型静态站点预览。课程表、价格与报名请以俱乐部前台或官方渠道为准。"
    },
    coaches: {
      pageTitle: "教练团队",
      title: "认识教练组",
      lead: "具备认证资质与丰富执教经验，覆盖不同年龄段与水平。",
      coaches: [
        { name: "Alex Chen", role: "主教练", bio: "专注青少年培养与竞赛路径规划。" },
        { name: "Jordan Lee", role: "体能与防护", bio: "提升移动能力与降低运动损伤风险。" },
        { name: "Sam Rivera", role: "课程教学", bio: "初到中级的团体课与一对一私教。" }
      ]
    },
    facilities: {
      pageTitle: "场地设施",
      title: "空间为训练服务",
      lead: "让你专注打球，也能好好放松与交流。",
      items: [
        { title: "室内硬地场", body: "减少天气影响，面层与照明按标准维护。" },
        { title: "更衣室与淋浴", body: "干净整洁、动线清晰的更衣空间。" },
        { title: "会员休息区", body: "赛后交流或短暂办公的安静角落。" },
        { title: "停车", body: "访客停车位请咨询前台（以现场规则为准）。" }
      ]
    },
    gallery: {
      pageTitle: "图集",
      title: "球场剪影",
      lead: "活动与日常训练的影像占位（可替换为实拍照片）。",
      captions: ["双打夜", "青少年营", "晨训", "俱乐部赛", "拉伸区", "大堂"]
    },
    contact: {
      pageTitle: "联系我们",
      title: "欢迎来信或到访",
      lead:
        "体验课、场地参观或入会意向，请先在本页留言或发邮件；工作人员会说明课程框架并协助安排后续步骤。",
      address: "中国某某市某某路 123 号（占位）",
      phone: "+86 000-0000-0000",
      email: "hello@example.com",
      hours: "接听时间参考：周一至周五 10:00–20:00 / 周末 9:00–18:00（具体时间以邮件／电话回复确认为准）",
      labelAddress: "地址",
      labelPhone: "电话",
      labelEmail: "邮箱",
      labelHours: "营业时间",
      mapLabel: "在地图中打开（外链）",
      formName: "姓名",
      formEmail: "邮箱",
      formMessage: "留言",
      formSubmit: "发送",
      formNote:
        "如需启用在线表单，请配置环境变量 NEXT_PUBLIC_FORMSPREE_ENDPOINT（见 README）。未配置前也可直接发送邮件咨询。",
      formSent: "已发送，感谢你的留言。",
      formFailed: "发送失败，请稍后重试。"
    }
  }
};

export function getStrings(lang: Lang): SiteStrings {
  return STRINGS[lang];
}
