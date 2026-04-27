"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({ 
  size = 12, 
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY
}: PupilProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const pupil = pupilRef.current.getBoundingClientRect();
    const pupilCenterX = pupil.left + pupil.width / 2;
    const pupilCenterY = pupil.top + pupil.height / 2;

    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  isClosedTight?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({ 
  size = 48, 
  pupilSize = 16, 
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  isClosedTight = false,
  forceLookX,
  forceLookY
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;

    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  if (isClosedTight) {
    return (
      <div 
        className="flex items-center justify-center transition-all duration-150"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <div className="w-full h-1 bg-[#1E293B] rounded-full rotate-12" />
        <div className="absolute w-full h-1 bg-[#1E293B] rounded-full -rotate-12" />
      </div>
    );
  }

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? '2px' : `${size}px`,
        backgroundColor: eyeColor,
        overflow: 'hidden',
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
    </div>
  );
};

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"sign-in" | "sign-up">("sign-in");
  
  const toggleTab = () => {
    setActiveTab((prev) => (prev === "sign-in" ? "sign-up" : "sign-in"));
    setError("");
  };
  
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  
  const [isTealBlinking, setIsTealBlinking] = useState(false);
  const [isIndigoBlinking, setIsIndigoBlinking] = useState(false);
  
  const [focusedInput, setFocusedInput] = useState<'email' | 'password' | null>(null);
  const [isHoveringChars, setIsHoveringChars] = useState(false);

  const tealRef = useRef<HTMLDivElement>(null);
  const indigoRef = useRef<HTMLDivElement>(null);
  const amberRef = useRef<HTMLDivElement>(null);
  const coralRef = useRef<HTMLDivElement>(null);

  // Custom Cursor and Global Mouse Tracker
  useEffect(() => {
    // Character mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    // Custom Cursor logic — dot + lagging ring
    const dot = document.createElement("div");
    dot.style.cssText = `
      position: fixed; top: 0; left: 0;
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #a1a1aa;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: width 0.2s ease, height 0.2s ease, background 0.2s ease;
      will-change: transform;
    `;

    const ring = document.createElement("div");
    ring.style.cssText = `
      position: fixed; top: 0; left: 0;
      width: 36px; height: 36px;
      border-radius: 50%;
      border: 1.5px solid rgba(161,161,170,0.5);
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      transition: width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease, background 0.35s ease;
      will-change: transform;
    `;

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    // Hide default cursor
    const style = document.createElement("style");
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    // Dot follows mouse exactly
    let mouseClientX = 0, mouseClientY = 0;
    const onMouseMoveCursor = (e: MouseEvent) => {
      mouseClientX = e.clientX;
      mouseClientY = e.clientY;
      dot.style.transform = `translate(calc(-50% + ${e.clientX}px), calc(-50% + ${e.clientY}px))`;
    };

    // Ring follows with lerp lag
    let ringX = 0, ringY = 0;
    let rafId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animateRing = () => {
      ringX = lerp(ringX, mouseClientX, 0.12);
      ringY = lerp(ringY, mouseClientY, 0.12);
      ring.style.transform = `translate(calc(-50% + ${ringX}px), calc(-50% + ${ringY}px))`;
      rafId = requestAnimationFrame(animateRing);
    };
    rafId = requestAnimationFrame(animateRing);

    const interactiveSelectors = 'a, button, input, [role="tab"], label';
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest?.(interactiveSelectors)) {
        dot.style.width = "8px";
        dot.style.height = "8px";
        dot.style.background = "#71717a";
        ring.style.width = "52px";
        ring.style.height = "52px";
        ring.style.borderColor = "rgba(161,161,170,0.8)";
        ring.style.background = "rgba(161,161,170,0.05)";
      } else {
        dot.style.width = "6px";
        dot.style.height = "6px";
        dot.style.background = "#a1a1aa";
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.borderColor = "rgba(161,161,170,0.5)";
        ring.style.background = "transparent";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", onMouseMoveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", onMouseMoveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId);
      dot.remove();
      ring.remove();
      style.remove();
    };
  }, []);

  // Blinking effects
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
    const scheduleBlink = (setBlink: React.Dispatch<React.SetStateAction<boolean>>) => {
      return setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          scheduleBlink(setBlink);
        }, 150);
      }, getRandomBlinkInterval());
    };
    
    const timeout1 = scheduleBlink(setIsTealBlinking);
    const timeout2 = scheduleBlink(setIsIndigoBlinking);
    return () => { clearTimeout(timeout1); clearTimeout(timeout2); };
  }, []);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>, factorX: number = 20, factorY: number = 30) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };

    if (isLoading && !isCelebrating) {
      return { faceX: 0, faceY: -5, bodySkew: 0 };
    }

    if (isLoginFailed) {
      return { faceX: 0, faceY: 10, bodySkew: 0 };
    }

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;

    // Turn away completely when password is SHOWN (Privacy!)
    if (password.length > 0 && showPassword) {
      return {
        faceX: -15, 
        faceY: -10,
        bodySkew: 10
      };
    }

    // Stare intently when password is HIDDEN and focused
    if (focusedInput === 'password' && !showPassword) {
      return {
        faceX: 15,
        faceY: 5,
        bodySkew: -5
      };
    }

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    const faceX = Math.max(-15, Math.min(15, deltaX / factorX));
    const faceY = Math.max(-10, Math.min(10, deltaY / factorY));

    const bodySkew = isHoveringChars ? 0 : Math.max(-6, Math.min(6, -deltaX / 120));

    return { faceX, faceY, bodySkew };
  };

  const tealPos = calculatePosition(tealRef, 20, 30);
  const indigoPos = calculatePosition(indigoRef, 25, 35);
  const amberPos = calculatePosition(amberRef, 15, 25);
  const coralPos = calculatePosition(coralRef, 18, 28);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoginFailed(false);

    const triggerError = (msg: string) => {
      setError(msg);
      setIsLoginFailed(true);
      setTimeout(() => setIsLoginFailed(false), 500);
      setIsLoading(false);
    };

    if (activeTab === "sign-up" && !name.trim()) {
      return triggerError("O nome é obrigatório.");
    }
    if (!email.trim()) {
      return triggerError("O e-mail é obrigatório.");
    }
    if (!email.includes("@") || !email.includes(".")) {
      return triggerError("Insira um endereço de e-mail válido.");
    }
    if (!password) {
      return triggerError("A senha é obrigatória.");
    }

    setIsLoading(true);

    try {
      const endpoint = activeTab === "sign-in" ? "/api/auth/login" : "/api/auth/signup";
      const payload = activeTab === "sign-in" 
        ? { email, password } 
        : { name, email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        return triggerError(data.error || "Ocorreu um erro inesperado.");
      }

      // Sucesso
      setIsLoading(false);
      if (activeTab === "sign-up") {
        setIsSignUpSuccess(true);
      }
      setIsCelebrating(true);
      setTimeout(() => setIsCelebrating(false), 3000);

    } catch (err) {
      triggerError("Falha na conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };
  const isHidingEyes = password.length > 0 && showPassword;
  const isStaringAtPassword = focusedInput === 'password' && !showPassword;

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes fallFromSky {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        [data-state="active"] .stagger-1 { animation: fallFromSky 1s cubic-bezier(0.16, 1, 0.3, 1) 100ms both; }
        [data-state="active"] .stagger-2 { animation: fallFromSky 1s cubic-bezier(0.16, 1, 0.3, 1) 200ms both; }
        [data-state="active"] .stagger-3 { animation: fallFromSky 1s cubic-bezier(0.16, 1, 0.3, 1) 300ms both; }
        [data-state="active"] .stagger-4 { animation: fallFromSky 1s cubic-bezier(0.16, 1, 0.3, 1) 400ms both; }
        [data-state="active"] .stagger-5 { animation: fallFromSky 1s cubic-bezier(0.16, 1, 0.3, 1) 500ms both; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px) rotate(-1deg); }
          50% { transform: translateX(8px) rotate(1deg); }
          75% { transform: translateX(-8px) rotate(-1deg); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes successPop {
          0%   { opacity: 0; transform: scale(0.5); }
          60%  { opacity: 1; transform: scale(1.08); }
          80%  { transform: scale(0.96); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes successFadeUp {
          0%   { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .success-icon { animation: successPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both; }
        .success-title { animation: successFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both; }
        .success-sub   { animation: successFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both; }
        .success-btn   { animation: successFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both; }
        @keyframes celebrateJump {
          0%   { transform: translateY(0) rotate(0deg) scaleX(1); }
          20%  { transform: translateY(-40px) rotate(-6deg) scaleX(0.95); }
          40%  { transform: translateY(-60px) rotate(4deg) scaleX(1.05); }
          55%  { transform: translateY(-30px) rotate(-3deg) scaleX(0.97); }
          70%  { transform: translateY(-50px) rotate(5deg) scaleX(1.03); }
          85%  { transform: translateY(-15px) rotate(-2deg) scaleX(0.99); }
          100% { transform: translateY(0) rotate(0deg) scaleX(1); }
        }
        .celebrate-1 { animation: celebrateJump 0.9s cubic-bezier(0.36, 0.07, 0.19, 0.97) 0ms both; }
        .celebrate-2 { animation: celebrateJump 0.9s cubic-bezier(0.36, 0.07, 0.19, 0.97) 120ms both; }
        .celebrate-3 { animation: celebrateJump 0.9s cubic-bezier(0.36, 0.07, 0.19, 0.97) 240ms both; }
        .celebrate-4 { animation: celebrateJump 0.9s cubic-bezier(0.36, 0.07, 0.19, 0.97) 360ms both; }
        .error-animate-container {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.7s cubic-bezier(0.34, 1.56, 0.64, 1),
                      opacity 0.5s ease,
                      margin-bottom 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
          opacity: 0;
          margin-bottom: 0;
          overflow: hidden;
        }
        .error-animate-container.is-error {
          grid-template-rows: 1fr;
          opacity: 1;
          margin-bottom: 1.25rem;
        }
        .error-badge-inner {
          transform: scale(0.5);
          transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: center;
        }
        .error-animate-container.is-error .error-badge-inner {
          transform: scale(1);
        }
      `}</style>
      
      <div className="min-h-screen grid lg:grid-cols-2 bg-background font-sans">
        {/* Left Content Section */}
      <div 
        className="relative hidden lg:flex flex-col justify-between bg-zinc-950 p-12 text-white overflow-hidden border-r border-white/5"
        onMouseEnter={() => setIsHoveringChars(true)}
        onMouseLeave={() => setIsHoveringChars(false)}
      >
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        <div className="relative z-20">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tighter">
            <span>ruokDEV</span>
          </div>
        </div>

        <div className="relative z-20 flex items-end justify-center h-[500px]">
          <div className={cn("relative w-[550px] h-[400px]", isLoginFailed && "animate-shake")}>
            
            <div className="absolute bottom-[-10px] w-full h-[20px] bg-black/40 blur-xl rounded-[100%] z-0" />
            <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

            {/* Teal */}
            <div 
              ref={tealRef}
              className={cn("absolute bottom-0 transition-all duration-500 ease-in-out shadow-2xl z-10",
                isHoveringChars ? "translate-y-[-10px]" : "",
                isCelebrating && "celebrate-1"
              )}
              style={{
                left: '70px',
                width: '180px',
                height: (focusedInput || password.length > 0) ? '460px' : '420px',
                backgroundColor: '#0D9488',
                borderRadius: '40px 40px 0 0',
                transform: `skewX(${tealPos.bodySkew}deg) ${isHidingEyes ? 'translateX(-30px)' : (isStaringAtPassword ? 'translateX(10px)' : '')}`,
                transformOrigin: 'bottom center',
              }}
            >
              <div 
                className="absolute flex gap-8 transition-all duration-500 ease-in-out"
                style={{
                  left: isHidingEyes ? '20px' : (isStaringAtPassword ? '80px' : `${55 + tealPos.faceX}px`),
                  top: isHidingEyes ? '75px' : `${50 + tealPos.faceY}px`,
                }}
              >
                <EyeBall 
                  size={20} pupilSize={8} maxDistance={6} 
                  eyeColor="white" pupilColor="#1E293B" 
                  isBlinking={isTealBlinking || isHidingEyes}
                  isClosedTight={isLoading && !isCelebrating}
                  forceLookX={isHidingEyes ? -6 : (isStaringAtPassword ? 6 : undefined)}
                  forceLookY={isHidingEyes ? 6 : (isStaringAtPassword ? 4 : undefined)}
                />
                <EyeBall 
                  size={20} pupilSize={8} maxDistance={6} 
                  eyeColor="white" pupilColor="#1E293B" 
                  isBlinking={isTealBlinking || isHidingEyes}
                  isClosedTight={isLoading && !isCelebrating}
                  forceLookX={isHidingEyes ? -6 : (isStaringAtPassword ? 6 : undefined)}
                  forceLookY={isHidingEyes ? 6 : (isStaringAtPassword ? 4 : undefined)}
                />
              </div>
            </div>

            {/* Indigo */}
            <div 
              ref={indigoRef}
              className={cn("absolute bottom-0 transition-all duration-500 ease-in-out shadow-2xl z-20",
                isHoveringChars ? "translate-y-[-15px]" : "",
                isCelebrating && "celebrate-2"
              )}
              style={{
                left: '240px',
                width: '130px',
                height: '340px',
                backgroundColor: '#4338CA',
                borderRadius: '20px 20px 0 0',
                transform: `skewX(${indigoPos.bodySkew * 1.5}deg) ${isHidingEyes ? 'translateX(-40px)' : (isStaringAtPassword ? 'translateX(10px)' : '')}`,
                transformOrigin: 'bottom center',
              }}
            >
              <div 
                className="absolute flex gap-6 transition-all duration-500 ease-in-out"
                style={{
                  left: isHidingEyes ? '10px' : (isStaringAtPassword ? '50px' : `${30 + indigoPos.faceX}px`),
                  top: isHidingEyes ? '55px' : `${40 + indigoPos.faceY}px`,
                }}
              >
                <EyeBall 
                  size={18} pupilSize={7} maxDistance={5} 
                  eyeColor="white" pupilColor="#1E293B" 
                  isBlinking={isIndigoBlinking || isHidingEyes}
                  isClosedTight={isLoading && !isCelebrating}
                  forceLookX={isHidingEyes ? -5 : (isStaringAtPassword ? 5 : undefined)}
                  forceLookY={isHidingEyes ? 5 : (isStaringAtPassword ? 4 : undefined)}
                />
                <EyeBall 
                  size={18} pupilSize={7} maxDistance={5} 
                  eyeColor="white" pupilColor="#1E293B" 
                  isBlinking={isIndigoBlinking || isHidingEyes}
                  isClosedTight={isLoading && !isCelebrating}
                  forceLookX={isHidingEyes ? -5 : (isStaringAtPassword ? 5 : undefined)}
                  forceLookY={isHidingEyes ? 5 : (isStaringAtPassword ? 4 : undefined)}
                />
              </div>
            </div>

            {/* Coral */}
            <div 
              ref={coralRef}
              className={cn("absolute bottom-0 transition-all duration-500 ease-in-out shadow-2xl z-30",
                isHoveringChars ? "translate-y-[-5px]" : "",
                isCelebrating && "celebrate-3"
              )}
              style={{
                left: '0px',
                width: '240px',
                height: '220px',
                backgroundColor: '#F43F5E',
                borderRadius: '120px 120px 0 0',
                transform: `skewX(${coralPos.bodySkew}deg) ${isHidingEyes ? 'translateX(-20px)' : (isStaringAtPassword ? 'translateX(5px)' : '')}`,
                transformOrigin: 'bottom center',
              }}
            >
              <div 
                className="absolute flex gap-8 transition-all duration-200 ease-out"
                style={{
                  left: isHidingEyes ? '30px' : (isStaringAtPassword ? '120px' : `${92 + coralPos.faceX}px`),
                  top: isHidingEyes ? '120px' : `${100 + coralPos.faceY}px`,
                }}
              >
                {!isLoading ? (
                  <>
                    <Pupil size={14} maxDistance={6} pupilColor="#1E293B" forceLookX={isHidingEyes ? -6 : (isStaringAtPassword ? 6 : undefined)} forceLookY={isHidingEyes ? 6 : (isStaringAtPassword ? 4 : undefined)} />
                    <Pupil size={14} maxDistance={6} pupilColor="#1E293B" forceLookX={isHidingEyes ? -6 : (isStaringAtPassword ? 6 : undefined)} forceLookY={isHidingEyes ? 6 : (isStaringAtPassword ? 4 : undefined)} />
                  </>
                ) : (
                  <>
                     <div className="w-3 h-1 bg-[#1E293B] rounded-full mt-1" />
                     <div className="w-3 h-1 bg-[#1E293B] rounded-full mt-1" />
                  </>
                )}
              </div>
            </div>

            {/* Amber */}
            <div 
              ref={amberRef}
              className={cn("absolute bottom-0 transition-all duration-500 ease-in-out shadow-2xl z-40",
                isHoveringChars ? "translate-y-[-8px]" : "",
                isCelebrating && "celebrate-4"
              )}
              style={{
                left: '320px',
                width: '150px',
                height: '260px',
                backgroundColor: '#F59E0B',
                borderRadius: '75px 75px 20px 20px',
                transform: `skewX(${amberPos.bodySkew}deg) ${isHidingEyes ? 'translateX(-10px)' : (isStaringAtPassword ? 'translateX(5px)' : '')}`,
                transformOrigin: 'bottom center',
              }}
            >
              <div 
                className="absolute flex gap-6 transition-all duration-200 ease-out"
                style={{
                  left: isHidingEyes ? '15px' : (isStaringAtPassword ? '75px' : `${55 + amberPos.faceX}px`),
                  top: isHidingEyes ? '80px' : `${50 + amberPos.faceY}px`,
                }}
              >
                {!isLoading ? (
                  <>
                    <Pupil size={14} maxDistance={6} pupilColor="#1E293B" forceLookX={isHidingEyes ? -6 : (isStaringAtPassword ? 6 : undefined)} forceLookY={isHidingEyes ? 6 : (isStaringAtPassword ? 4 : undefined)} />
                    <Pupil size={14} maxDistance={6} pupilColor="#1E293B" forceLookX={isHidingEyes ? -6 : (isStaringAtPassword ? 6 : undefined)} forceLookY={isHidingEyes ? 6 : (isStaringAtPassword ? 4 : undefined)} />
                  </>
                ) : (
                  <>
                    <div className="w-3 h-1 bg-[#1E293B] rounded-full mt-1" />
                    <div className="w-3 h-1 bg-[#1E293B] rounded-full mt-1" />
                  </>
                )}
              </div>
              <div 
                className={cn("absolute w-12 h-[6px] bg-[#1E293B] rounded-full transition-all duration-200 ease-out", isLoading && "scale-x-50 w-6 left-[60px]")}
                style={{
                  left: isHidingEyes ? '15px' : (isStaringAtPassword ? '70px' : `${50 + amberPos.faceX}px`),
                  top: isHidingEyes ? '110px' : `${100 + amberPos.faceY}px`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="relative z-20 flex items-center gap-8 text-xs text-zinc-500">
          <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Termos</a>
          <a href="#" className="hover:text-white transition-colors">Suporte</a>
        </div>

        <div className="absolute top-0 right-0 size-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 size-[600px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Right Login Section */}
      <div className="flex items-center justify-center p-8 bg-background relative z-50">
        <div className="w-full max-w-[420px] bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
          
          <div className="lg:hidden flex items-center justify-center gap-2 text-xl font-bold tracking-tighter mb-8 text-foreground">
            <span>ruokDEV</span>
          </div>

          {isSignUpSuccess ? (
            <div className="flex flex-col items-center justify-center gap-6 py-8 text-center">
              <div className="success-icon size-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <svg className="size-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="success-title text-xl font-semibold text-foreground mb-1">Conta criada!</p>
                <p className="success-sub text-sm text-muted-foreground">Bem-vindo(a), <span className="font-medium text-foreground">{name}</span>. Tudo pronto 🎉</p>
              </div>
              <button
                className="success-btn mt-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 underline-offset-4 hover:underline transition-colors"
                onClick={() => { setIsSignUpSuccess(false); setActiveTab("sign-in"); setEmail(""); setPassword(""); setName(""); }}
              >
                Ir para o login →
              </button>
            </div>
          ) : (
          <Tabs
            value={activeTab}
            onValueChange={(v) => {
              setActiveTab(v as any);
              setError("");
            }}
            className="w-full"
          >
            <TabsList className="mb-6 w-full grid grid-cols-2">
              <TabsTrigger value="sign-in" className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-all duration-300">Entrar</TabsTrigger>
              <TabsTrigger value="sign-up" className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-all duration-300">Criar conta</TabsTrigger>
            </TabsList>

            <div className={cn("error-animate-container", error && "is-error")}>
              <div className="min-h-0">
                <div className="error-badge-inner flex items-center justify-center px-4 py-2.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[13px] font-medium tracking-tight">
                  {error}
                </div>
              </div>
            </div>

            <TabsContent value="sign-in" className="outline-none">
              <div className="flex flex-col gap-4">

                <div className="flex flex-col gap-3 stagger-1">
                  <Button type="button" variant="outline" className="flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-md hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-300">
                    <FaGoogle /> Entrar com Google
                  </Button>
                  <Button type="button" variant="outline" className="flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-md hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-300">
                    <FaGithub /> Entrar com GitHub
                  </Button>
                  <Button type="button" variant="outline" className="flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-md hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-300">
                    <FaLinkedin /> Entrar com LinkedIn
                  </Button>
                </div>

                <div className="flex items-center justify-center my-2 text-muted-foreground text-sm uppercase tracking-wider stagger-2">ou</div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="space-y-2 stagger-3">
                    <Label htmlFor="signin-email">E-mail</Label>
                    <Input 
                      id="signin-email" 
                      type="email" 
                      placeholder="voce@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedInput('email')}
                      onBlur={() => setFocusedInput(null)}
                      required
                      className="hover:border-zinc-400 dark:hover:border-zinc-600 focus:shadow-md transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2 stagger-4">
                    <Label htmlFor="signin-password">Senha</Label>
                    <div className="relative">
                      <Input 
                        id="signin-password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                        required
                        className="pr-10 hover:border-zinc-400 dark:hover:border-zinc-600 focus:shadow-md transition-all duration-300"
                      />
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between stagger-5">
                    <div className="flex items-center space-x-2 group">
                      <Checkbox id="remember" className="transition-all duration-300 group-hover:border-zinc-500" />
                      <Label htmlFor="remember" className="text-sm font-normal cursor-pointer text-muted-foreground group-hover:text-foreground transition-colors duration-300">Manter conectado</Label>
                    </div>
                    <a href="#" className="text-sm text-zinc-900 font-medium dark:text-zinc-300 hover:text-zinc-500 hover:-translate-y-0.5 inline-block transition-all duration-300">Esqueceu?</a>
                  </div>

                  <Button 
                    type="submit" 
                    className={cn("w-full h-10 mt-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 stagger-5", isLoading && "cursor-wait opacity-80")}
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>

              </div>
            </TabsContent>

            <TabsContent value="sign-up" className="outline-none">
              <div className="flex flex-col gap-4">
                <form onSubmit={handleSubmit} noValidate className="space-y-4 mt-2">
                  <div className="space-y-2 stagger-1">
                    <Label htmlFor="signup-name">Nome</Label>
                    <Input 
                      id="signup-name" 
                      type="text" 
                      placeholder="Seu Nome" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocusedInput('email')} 
                      onBlur={() => setFocusedInput(null)} 
                      className="hover:border-zinc-400 dark:hover:border-zinc-600 focus:shadow-md transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2 stagger-2">
                    <Label htmlFor="signup-email">E-mail</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="voce@exemplo.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedInput('email')} 
                      onBlur={() => setFocusedInput(null)} 
                      className="hover:border-zinc-400 dark:hover:border-zinc-600 focus:shadow-md transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2 stagger-3">
                    <Label htmlFor="signup-password">Senha</Label>
                    <div className="relative">
                      <Input 
                        id="signup-password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                        className="pr-10 hover:border-zinc-400 dark:hover:border-zinc-600 focus:shadow-md transition-all duration-300"
                      />
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>
                  <Button className="w-full h-10 mt-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 stagger-4">Criar Conta</Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export const Component = LoginPage;
