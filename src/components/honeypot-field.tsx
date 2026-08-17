"use client";

import type { ChangeEventHandler } from "react";

interface Props {
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

/**
 * Bot tuzağı (honeypot) alanı.
 *
 * Gerçek kullanıcı bu alanı göremez, klavye ile odaklanamaz ve ekran okuyucu
 * ile duyamaz; boş olarak gönderilir. Botlar formdaki tüm alanları doldurma
 * eğiliminde olduğu için doldurulmuş gelen istekler backend tarafından
 * sessizce yok sayılır.
 *
 * Alan `type="hidden"` değil, ekran dışına alınmış normal bir metin input'udur:
 * botların bir kısmı gizli input'ları atlar, normal input'u ise doldurur.
 * Shadcn `Input` yerine sade bir input kullanılır; görünür bir arayüz öğesi
 * değildir ve tasarım sınıfları taşımamalıdır.
 */
export default function HoneypotField({ id, value, onChange }: Props) {
  return (
    <div
      aria-hidden="true"
      className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
    >
      <label htmlFor={id}>Web sitesi</label>
      <input
        id={id}
        name="website"
        type="text"
        value={value}
        onChange={onChange}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
