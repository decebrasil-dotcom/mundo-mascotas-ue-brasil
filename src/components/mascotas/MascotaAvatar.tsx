import React, { useState } from 'react';
import { MascotId } from '../../types';

interface MascotaAvatarProps {
  id: MascotId;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showBadge?: boolean;
  className?: string;
}

export const MascotaAvatar: React.FC<MascotaAvatarProps> = ({
  id,
  size = 'md',
  showBadge = false,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeDimensions = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
    '2xl': 'w-44 h-44',
  };

  const imageSrc = `/assets/mascotas/${id}.png`;

  // Render stylized SVG illustration representing exact species
  const renderSpeciesSvg = () => {
    switch (id) {
      case 'miau': // GATO
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="54" fill="#ECFDF5" />
            {/* Orejas de gato */}
            <polygon points="26,45 36,14 54,34" fill="#F472B6" stroke="#059669" strokeWidth="3" strokeLinejoin="round" />
            <polygon points="94,45 84,14 66,34" fill="#F472B6" stroke="#059669" strokeWidth="3" strokeLinejoin="round" />
            <polygon points="32,40 38,20 50,34" fill="#FBCFE8" />
            <polygon points="88,40 82,20 70,34" fill="#FBCFE8" />
            {/* Cabeza */}
            <circle cx="60" cy="65" r="38" fill="#F8FAFC" stroke="#059669" strokeWidth="3.5" />
            {/* Ojos verdes brillantes */}
            <ellipse cx="46" cy="60" rx="6" ry="8" fill="#059669" />
            <ellipse cx="74" cy="60" rx="6" ry="8" fill="#059669" />
            <circle cx="48" cy="57" r="2.5" fill="#FFFFFF" />
            <circle cx="76" cy="57" r="2.5" fill="#FFFFFF" />
            {/* Nariz rosa y boca */}
            <polygon points="60,67 56,64 64,64" fill="#F472B6" />
            <path d="M56 71 Q60 75 64 71" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M60 67 L60 72" stroke="#059669" strokeWidth="2.5" />
            {/* Bigotes */}
            <line x1="28" y1="67" x2="42" y2="69" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            <line x1="26" y1="73" x2="42" y2="72" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            <line x1="92" y1="67" x2="78" y2="69" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            <line x1="94" y1="73" x2="78" y2="72" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            {/* Collar DECE con huellita */}
            <rect x="42" y="94" width="36" height="8" rx="4" fill="#059669" />
            <circle cx="60" cy="104" r="5" fill="#F59E0B" />
          </svg>
        );

      case 'guao': // PERRO
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="54" fill="#FEF3C7" />
            {/* Orejas caídas de perro */}
            <path d="M22 42 C16 65 24 82 32 82 C38 82 40 68 36 50 Z" fill="#D97706" stroke="#92400E" strokeWidth="3" />
            <path d="M98 42 C104 65 96 82 88 82 C82 82 80 68 84 50 Z" fill="#D97706" stroke="#92400E" strokeWidth="3" />
            {/* Cabeza de perro */}
            <circle cx="60" cy="64" r="37" fill="#FBBF24" stroke="#92400E" strokeWidth="3.5" />
            {/* Mancha café en ojo */}
            <ellipse cx="47" cy="58" rx="12" ry="14" fill="#F59E0B" />
            {/* Ojos expresivos */}
            <circle cx="47" cy="58" r="6" fill="#451A03" />
            <circle cx="73" cy="58" r="6" fill="#451A03" />
            <circle cx="49" cy="56" r="2.2" fill="#FFFFFF" />
            <circle cx="75" cy="56" r="2.2" fill="#FFFFFF" />
            {/* Hocico */}
            <ellipse cx="60" cy="74" rx="16" ry="12" fill="#FEF3C7" stroke="#92400E" strokeWidth="2.5" />
            {/* Nariz negra perrito */}
            <ellipse cx="60" cy="70" rx="6" ry="4.5" fill="#1E293B" />
            {/* Sonrisa y lengua contenta */}
            <path d="M54 77 Q60 82 66 77" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M58 79 Q60 86 63 79 Z" fill="#F87171" />
            {/* Collar DECE */}
            <rect x="44" y="93" width="32" height="7" rx="3.5" fill="#D97706" />
            <circle cx="60" cy="103" r="5" fill="#10B981" />
          </svg>
        );

      case 'bibi': // ABEJA
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="54" fill="#FEFCE8" />
            {/* Alas transparentes con brillo */}
            <ellipse cx="36" cy="36" rx="18" ry="24" transform="rotate(-25 36 36)" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2.5" fillOpacity="0.8" />
            <ellipse cx="84" cy="36" rx="18" ry="24" transform="rotate(25 84 36)" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2.5" fillOpacity="0.8" />
            {/* Antenas */}
            <path d="M48 38 Q42 22 36 24" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="34" cy="24" r="4.5" fill="#F59E0B" />
            <path d="M72 38 Q78 22 84 24" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="86" cy="24" r="4.5" fill="#F59E0B" />
            {/* Cuerpo de abejita con rayas */}
            <ellipse cx="60" cy="68" rx="34" ry="38" fill="#FACC15" stroke="#713F12" strokeWidth="3.5" />
            {/* Rayas negras suaves */}
            <path d="M30 60 Q60 67 90 60 L89 67 Q60 74 31 67 Z" fill="#1E293B" />
            <path d="M34 78 Q60 85 86 78 L84 85 Q60 92 36 85 Z" fill="#1E293B" />
            {/* Ojos grandes y tiernos de abeja */}
            <circle cx="48" cy="50" r="7" fill="#1E293B" />
            <circle cx="72" cy="50" r="7" fill="#1E293B" />
            <circle cx="50" cy="48" r="2.5" fill="#FFFFFF" />
            <circle cx="74" cy="48" r="2.5" fill="#FFFFFF" />
            {/* Mejillas sonrosadas y boquita */}
            <circle cx="38" cy="56" r="4" fill="#FCA5A5" opacity="0.7" />
            <circle cx="82" cy="56" r="4" fill="#FCA5A5" opacity="0.7" />
            <path d="M54 58 Q60 63 66 58" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Florcita de respeto */}
            <circle cx="60" cy="100" r="5" fill="#EC4899" />
          </svg>
        );

      case 'jagger': // JAGUAR
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="54" fill="#FFF7ED" />
            {/* Orejas redondeadas de felino */}
            <circle cx="32" cy="36" r="14" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
            <circle cx="88" cy="36" r="14" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
            <circle cx="32" cy="36" r="8" fill="#FFEDD5" />
            <circle cx="88" cy="36" r="8" fill="#FFEDD5" />
            {/* Cabeza del jaguar */}
            <circle cx="60" cy="64" r="38" fill="#FB923C" stroke="#7C2D12" strokeWidth="3.5" />
            {/* Manchas/rosetas del jaguar en la frente y mejillas */}
            <ellipse cx="60" cy="38" rx="4" ry="3" fill="#7C2D12" />
            <path d="M42 42 Q40 46 45 47" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M78 42 Q80 46 75 47" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M30 68 Q28 72 32 75" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M90 68 Q92 72 88 75" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Ojos determinados y ágiles */}
            <ellipse cx="46" cy="58" rx="6" ry="8" fill="#EAB308" stroke="#7C2D12" strokeWidth="1.5" />
            <ellipse cx="74" cy="58" rx="6" ry="8" fill="#EAB308" stroke="#7C2D12" strokeWidth="1.5" />
            <ellipse cx="46" cy="58" rx="3.5" ry="6" fill="#1C1917" />
            <ellipse cx="74" cy="58" rx="3.5" ry="6" fill="#1C1917" />
            <circle cx="48" cy="55" r="2" fill="#FFFFFF" />
            <circle cx="76" cy="55" r="2" fill="#FFFFFF" />
            {/* Hocico blanco con nariz deportiva */}
            <ellipse cx="60" cy="74" rx="16" ry="12" fill="#FFF7ED" stroke="#7C2D12" strokeWidth="2.5" />
            <polygon points="60,71 55,67 65,67" fill="#7C2D12" />
            <path d="M54 78 Q60 83 66 78" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Cinta deportiva en la frente */}
            <path d="M26 48 Q60 54 94 48" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'ani': // HORMIGA
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="54" fill="#F0FDFA" />
            {/* Antenas de hormiga con articulación */}
            <path d="M46 36 L34 18 L24 24" stroke="#115E59" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="24" cy="24" r="3.5" fill="#14B8A6" />
            <path d="M74 36 L86 18 L96 24" stroke="#115E59" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="96" cy="24" r="3.5" fill="#14B8A6" />
            {/* Cabeza de hormiguita simpática */}
            <ellipse cx="60" cy="52" rx="32" ry="28" fill="#0D9488" stroke="#134E4A" strokeWidth="3.5" />
            {/* Ojos grandes y curiosos */}
            <ellipse cx="47" cy="48" rx="8" ry="11" fill="#FFFFFF" stroke="#134E4A" strokeWidth="2" />
            <ellipse cx="73" cy="48" rx="8" ry="11" fill="#FFFFFF" stroke="#134E4A" strokeWidth="2" />
            <circle cx="48" cy="48" r="5" fill="#134E4A" />
            <circle cx="72" cy="48" r="5" fill="#134E4A" />
            <circle cx="50" cy="45" r="2" fill="#FFFFFF" />
            <circle cx="74" cy="45" r="2" fill="#FFFFFF" />
            {/* Sonrisa alegre */}
            <path d="M54 62 Q60 67 66 62" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Torax y cuerpo segmentado */}
            <ellipse cx="60" cy="84" rx="22" ry="16" fill="#14B8A6" stroke="#134E4A" strokeWidth="3" />
            {/* Hoja verde de limpieza / orden en las manitas */}
            <path d="M45 88 Q60 76 75 88 Q60 102 45 88 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
            <line x1="47" y1="88" x2="73" y2="88" stroke="#15803D" strokeWidth="1.5" />
          </svg>
        );

      case 'tuki': // TORTUGA
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="54" fill="#F0FDF4" />
            {/* Caparazón protector detrás */}
            <path d="M22 66 C22 36 98 36 98 66 C98 86 86 96 60 96 C34 96 22 86 22 66 Z" fill="#15803D" stroke="#14532D" strokeWidth="3.5" />
            {/* Patrones hexagonales del caparazón */}
            <polygon points="60,46 72,54 72,68 60,76 48,68 48,54" fill="#22C55E" stroke="#14532D" strokeWidth="2" />
            <line x1="60" y1="46" x2="60" y2="38" stroke="#14532D" strokeWidth="2" />
            <line x1="72" y1="54" x2="86" y2="50" stroke="#14532D" strokeWidth="2" />
            <line x1="72" y1="68" x2="88" y2="72" stroke="#14532D" strokeWidth="2" />
            <line x1="48" y1="54" x2="34" y2="50" stroke="#14532D" strokeWidth="2" />
            <line x1="48" y1="68" x2="32" y2="72" stroke="#14532D" strokeWidth="2" />
            {/* Cabeza asomándose con calma zen */}
            <ellipse cx="60" cy="40" rx="20" ry="18" fill="#86EFAC" stroke="#14532D" strokeWidth="3" />
            {/* Ojos pacíficos y sonrientes (cerrados o semicerrados en meditación) */}
            <path d="M48 38 Q52 42 56 38" stroke="#14532D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M64 38 Q68 42 72 38" stroke="#14532D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Sonrisa serena */}
            <path d="M55 46 Q60 50 65 46" stroke="#14532D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Flor de loto de autorregulación */}
            <circle cx="60" cy="22" r="5" fill="#F472B6" />
          </svg>
        );

      case 'lumi': // MARIPOSA
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="54" fill="#FAF5FF" />
            {/* Alas multicolor de inclusión (superior e inferior) */}
            {/* Ala superior izquierda */}
            <path d="M56 54 C34 20 8 36 18 64 C24 74 44 68 56 58 Z" fill="#8B5CF6" stroke="#5B21B6" strokeWidth="2.5" />
            <circle cx="28" cy="46" r="6" fill="#F43F5E" />
            <circle cx="34" cy="56" r="4" fill="#FBBF24" />
            {/* Ala superior derecha */}
            <path d="M64 54 C86 20 112 36 102 64 C96 74 76 68 64 58 Z" fill="#8B5CF6" stroke="#5B21B6" strokeWidth="2.5" />
            <circle cx="92" cy="46" r="6" fill="#F43F5E" />
            <circle cx="86" cy="56" r="4" fill="#FBBF24" />
            {/* Alas inferiores */}
            <path d="M56 64 C36 74 24 96 42 102 C52 104 58 84 58 70 Z" fill="#38BDF8" stroke="#5B21B6" strokeWidth="2" />
            <path d="M64 64 C84 74 96 96 78 102 C68 104 62 84 62 70 Z" fill="#38BDF8" stroke="#5B21B6" strokeWidth="2" />
            {/* Antenas de mariposa curvadas */}
            <path d="M56 42 Q46 22 40 26" stroke="#5B21B6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="39" cy="26" r="3" fill="#EC4899" />
            <path d="M64 42 Q74 22 80 26" stroke="#5B21B6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="81" cy="26" r="3" fill="#EC4899" />
            {/* Cuerpo y carita de Lumi */}
            <rect x="54" y="44" width="12" height="38" rx="6" fill="#DDD6FE" stroke="#5B21B6" strokeWidth="2.5" />
            {/* Ojos cariñosos */}
            <circle cx="58" cy="50" r="2.2" fill="#5B21B6" />
            <circle cx="62" cy="50" r="2.2" fill="#5B21B6" />
            <path d="M58 54 Q60 56 62 54" stroke="#5B21B6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'croki': // SAPO
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="54" fill="#F7FEE7" />
            {/* Ojos saltones de sapito */}
            <circle cx="42" cy="40" r="16" fill="#65A30D" stroke="#365314" strokeWidth="3" />
            <circle cx="78" cy="40" r="16" fill="#65A30D" stroke="#365314" strokeWidth="3" />
            <circle cx="42" cy="40" r="11" fill="#FEF08A" />
            <circle cx="78" cy="40" r="11" fill="#FEF08A" />
            <ellipse cx="42" cy="40" rx="5" ry="7" fill="#14532D" />
            <ellipse cx="78" cy="40" rx="5" ry="7" fill="#14532D" />
            <circle cx="44" cy="37" r="2.5" fill="#FFFFFF" />
            <circle cx="80" cy="37" r="2.5" fill="#FFFFFF" />
            {/* Cabeza ancha y sonriente */}
            <ellipse cx="60" cy="66" rx="42" ry="32" fill="#84CC16" stroke="#365314" strokeWidth="3.5" />
            {/* Pecho claro */}
            <ellipse cx="60" cy="74" rx="26" ry="18" fill="#ECFCCB" />
            {/* Sonrisa inconfundible de sapo */}
            <path d="M34 66 Q60 82 86 66" stroke="#365314" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Mejillas sonrosadas y manchitas de anfibio */}
            <circle cx="36" cy="64" r="4" fill="#F472B6" opacity="0.6" />
            <circle cx="84" cy="64" r="4" fill="#F472B6" opacity="0.6" />
            <circle cx="46" cy="58" r="2.5" fill="#4D7C0F" />
            <circle cx="74" cy="58" r="2.5" fill="#4D7C0F" />
            {/* Gota de agua limpia de naturaleza */}
            <path d="M60 76 Q65 85 60 88 Q55 85 60 76 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
          </svg>
        );

      case 'kiro': // PINGÜINO
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="54" fill="#F0F9FF" />
            {/* Cuerpo de pingüino negro exterior */}
            <ellipse cx="60" cy="64" rx="36" ry="42" fill="#0F172A" stroke="#0284C7" strokeWidth="3" />
            {/* Aletas protectoras */}
            <path d="M26 62 Q16 78 26 88" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M94 62 Q104 78 94 88" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Pecho y rostro blanco ovalado */}
            <ellipse cx="60" cy="66" rx="24" ry="34" fill="#F8FAFC" />
            {/* Ojos atentos de detective de seguridad */}
            <circle cx="50" cy="52" r="5" fill="#0F172A" />
            <circle cx="70" cy="52" r="5" fill="#0F172A" />
            <circle cx="52" cy="50" r="1.8" fill="#FFFFFF" />
            <circle cx="72" cy="50" r="1.8" fill="#FFFFFF" />
            {/* Pico naranja de pingüino */}
            <polygon points="60,65 52,58 68,58" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
            {/* Bufanda escolar roja de prevención */}
            <path d="M38 72 Q60 80 82 72" stroke="#EF4444" strokeWidth="7" strokeLinecap="round" fill="none" />
            <rect x="64" y="74" width="8" height="14" rx="2" fill="#DC2626" />
            {/* Patitas naranjas */}
            <ellipse cx="48" cy="102" rx="8" ry="4" fill="#F97316" />
            <ellipse cx="72" cy="102" rx="8" ry="4" fill="#F97316" />
          </svg>
        );

      case 'oli': // BÚHO
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="54" fill="#FFFBEB" />
            {/* Penachos/plumas de las orejas de búho */}
            <polygon points="34,42 22,20 46,30" fill="#78350F" stroke="#451A03" strokeWidth="3" strokeLinejoin="round" />
            <polygon points="86,42 98,20 74,30" fill="#78350F" stroke="#451A03" strokeWidth="3" strokeLinejoin="round" />
            {/* Cabeza y cuerpo de búho sabio */}
            <circle cx="60" cy="64" r="38" fill="#92400E" stroke="#451A03" strokeWidth="3.5" />
            {/* Anteojos redondos de sabiduría sobre ojos enormes */}
            <circle cx="45" cy="56" r="15" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3.5" />
            <circle cx="75" cy="56" r="15" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3.5" />
            <line x1="58" y1="56" x2="62" y2="56" stroke="#F59E0B" strokeWidth="3.5" />
            {/* Pupilas atentas de búho */}
            <circle cx="45" cy="56" r="6" fill="#1C1917" />
            <circle cx="75" cy="56" r="6" fill="#1C1917" />
            <circle cx="47" cy="54" r="2.2" fill="#FFFFFF" />
            <circle cx="77" cy="54" r="2.2" fill="#FFFFFF" />
            {/* Pico curvado */}
            <polygon points="60,68 56,62 64,62" fill="#F59E0B" />
            {/* Pecho con plumas de libros */}
            <ellipse cx="60" cy="84" rx="20" ry="14" fill="#FEF3C7" />
            <path d="M52 82 Q60 86 68 82" stroke="#B45309" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M54 88 Q60 92 66 88" stroke="#B45309" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Pequeño birrete o pluma del saber */}
            <rect x="52" y="24" width="16" height="4" rx="1" fill="#1E3A8A" />
            <polygon points="60,20 48,25 60,30 72,25" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="1.5" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`relative shrink-0 flex items-center justify-center ${sizeDimensions[size]} ${className}`}>
      {!imageError ? (
        <img
          src={imageSrc}
          alt={id}
          onError={() => setImageError(true)}
          className="w-full h-full object-contain drop-shadow-sm select-none"
          loading="lazy"
        />
      ) : null}

      {imageError && (
        <div className="w-full h-full flex items-center justify-center select-none transition-transform hover:scale-105">
          {renderSpeciesSvg()}
        </div>
      )}

      {showBadge && (
        <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-amber-950 shadow">
          ★
        </span>
      )}
    </div>
  );
};
