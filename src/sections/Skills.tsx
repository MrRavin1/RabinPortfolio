import { useRef } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import AnimatedHeading from '../components/AnimatedHeading';
import { skills } from '../data';
import {
  SiReact, SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiCss,
  SiLaravel, SiPhp, SiNodedotjs, SiPostman,
  SiMysql, SiPostgresql, SiGit, SiGithub,
} from 'react-icons/si';
import { FiCode } from 'react-icons/fi';

const iconMap: Record<string, React.ReactElement> = {
  SiReact: <SiReact />, SiTypescript: <SiTypescript />, SiJavascript: <SiJavascript />,
  SiTailwindcss: <SiTailwindcss />, SiHtml5: <SiHtml5 />, SiCss: <SiCss />,
  SiLaravel: <SiLaravel />, SiPhp: <SiPhp />, SiNodedotjs: <SiNodedotjs />,
  SiPostman: <SiPostman />, SiMysql: <SiMysql />, SiPostgresql: <SiPostgresql />,
  SiGit: <SiGit />, SiGithub: <SiGithub />, SiVisualstudiocode: <FiCode />,
};

const allSkills = [...skills.Frontend, ...skills.Backend, ...skills.Database, ...skills.Tools];
const outerRing = allSkills.slice(0, 10);
const innerRing = allSkills.slice(10);

const SIZE = 580;
const CX = SIZE / 2, CY = SIZE / 2;

// Build a unique CSS keyframe animation name for each icon
function makeKeyframe(cx: number, cy: number, radius: number, startAngle: number, cw: boolean, name: string) {
  const steps = 60;
  const dir = cw ? 1 : -1;
  let frames = '';
  for (let s = 0; s <= steps; s++) {
    const pct = (s / steps) * 100;
    const angle = startAngle + dir * (s / steps) * 2 * Math.PI;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    frames += `${pct.toFixed(1)}%{left:${x.toFixed(1)}px;top:${y.toFixed(1)}px}`;
  }
  return `@keyframes ${name}{${frames}}`;
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  const pause = () => {
    containerRef.current?.querySelectorAll<HTMLElement>('.sk-icon').forEach(el => {
      el.style.animationPlayState = 'paused';
    });
  };
  const resume = () => {
    containerRef.current?.querySelectorAll<HTMLElement>('.sk-icon').forEach(el => {
      el.style.animationPlayState = 'running';
    });
  };

  // Generate all keyframes
  const OUTER_R = 245, INNER_R = 145;
  const outerDur = 42, innerDur = 30;

  const cssChunks: string[] = [];
  const outerItems = outerRing.map((skill, i) => {
    const startAngle = (2 * Math.PI * i) / outerRing.length - Math.PI / 2;
    const name = `ok_${skill.name.replace(/[^a-z0-9]/gi, '')}`;
    cssChunks.push(makeKeyframe(CX, CY, OUTER_R, startAngle, true, name));
    const startX = CX + OUTER_R * Math.cos(startAngle);
    const startY = CY + OUTER_R * Math.sin(startAngle);
    return { skill, name, startX, startY };
  });

  const innerItems = innerRing.map((skill, i) => {
    const startAngle = (2 * Math.PI * i) / innerRing.length - Math.PI / 2;
    const name = `ik_${skill.name.replace(/[^a-z0-9]/gi, '')}`;
    cssChunks.push(makeKeyframe(CX, CY, INNER_R, startAngle, false, name));
    const startX = CX + INNER_R * Math.cos(startAngle);
    const startY = CY + INNER_R * Math.sin(startAngle);
    return { skill, name, startX, startY };
  });

  const iconSize = 44;
  const innerIconSize = 38;

  return (
    <SectionWrapper id="skills">
      <style>{cssChunks.join('')}</style>
      <div className="text-center mb-14">
        <AnimatedHeading normal="Tech" highlight="Stack" />
        <p className="section-subheading">Technologies I work with to build full-stack solutions</p>
      </div>

      {/* Desktop: orbital animation */}
      <div className="hidden md:flex justify-center">
        <div
          ref={containerRef}
          style={{ width: SIZE, height: SIZE, position: 'relative', maxWidth: '100%' }}
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          {/* SVG for rings + center only */}
          <svg width={SIZE} height={SIZE} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <circle cx={CX} cy={CY} r={OUTER_R} fill="none" stroke="rgba(37,99,235,0.2)" strokeWidth="1" strokeDasharray="5 9" />
            <circle cx={CX} cy={CY} r={INNER_R} fill="none" stroke="rgba(37,99,235,0.2)" strokeWidth="1" strokeDasharray="5 9" />
            <circle cx={CX} cy={CY} r={60} fill="rgba(37,99,235,0.08)" />
            <circle cx={CX} cy={CY} r={52} fill="#070d1a" stroke="rgba(37,99,235,0.5)" strokeWidth="1.5" />
            <text x={CX} y={CY - 6} textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="Inter,sans-serif" letterSpacing="2">FULL</text>
            <text x={CX} y={CY + 10} textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="Inter,sans-serif" letterSpacing="2">STACK</text>
          </svg>

          {/* Outer ring icons */}
          {outerItems.map(({ skill, name, startX, startY }) => (
            <div
              key={skill.name}
              className="sk-icon"
              style={{
                position: 'absolute',
                left: startX,
                top: startY,
                width: iconSize,
                height: iconSize,
                transform: 'translate(-50%, -50%)',
                animationName: name,
                animationDuration: `${outerDur}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <div style={{
                width: iconSize, height: iconSize,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                border: `1.5px solid ${skill.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: skill.color, fontSize: iconSize * 0.52,
                flexShrink: 0,
              }}>
                {iconMap[skill.icon]}
              </div>
              <span style={{ fontSize: 9, color: '#9ca3af', whiteSpace: 'nowrap', fontFamily: 'Inter,sans-serif' }}>
                {skill.name}
              </span>
            </div>
          ))}

          {/* Inner ring icons */}
          {innerItems.map(({ skill, name, startX, startY }) => (
            <div
              key={skill.name}
              className="sk-icon"
              style={{
                position: 'absolute',
                left: startX,
                top: startY,
                width: innerIconSize,
                height: innerIconSize,
                transform: 'translate(-50%, -50%)',
                animationName: name,
                animationDuration: `${innerDur}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <div style={{
                width: innerIconSize, height: innerIconSize,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                border: `1.5px solid ${skill.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: skill.color, fontSize: innerIconSize * 0.52,
                flexShrink: 0,
              }}>
                {iconMap[skill.icon]}
              </div>
              <span style={{ fontSize: 9, color: '#9ca3af', whiteSpace: 'nowrap', fontFamily: 'Inter,sans-serif' }}>
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: grouped grid */}
      <div className="md:hidden space-y-8">
        {(Object.entries(skills) as [string, typeof skills.Frontend][]).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary-400 mb-4 text-center">{category}</h3>
            <div className="grid grid-cols-3 gap-3">
              {items.map(skill => (
                <div
                  key={skill.name}
                  className="glass rounded-xl p-3 flex flex-col items-center gap-2"
                >
                  <div
                    style={{
                      width: 40, height: 40,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.05)',
                      border: `1.5px solid ${skill.color}44`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: skill.color, fontSize: 20,
                    }}
                  >
                    {iconMap[skill.icon]}
                  </div>
                  <span className="text-xs text-gray-400 text-center leading-tight">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
