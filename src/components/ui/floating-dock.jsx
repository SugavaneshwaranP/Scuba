import { cn } from "../../core/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#004D4D]/20 backdrop-blur-2xl flex flex-col items-center justify-center pointer-events-auto"
          >
            <motion.div 
              className="flex flex-col gap-8 items-center"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              {items.map((item) => (
                <motion.div
                  key={item.title}
                  variants={{
                    open: { opacity: 1, y: 0, scale: 1 },
                    closed: { opacity: 0, y: 20, scale: 0.8 }
                  }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="flex flex-col items-center gap-3 group no-underline"
                  >
                    <div className="h-16 w-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <div className="h-8 w-8">{item.icon}</div>
                    </div>
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-white/80 group-hover:text-white transition-colors">
                      {item.title}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <button
              onClick={() => setOpen(false)}
              className="absolute top-8 right-8 h-12 w-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button
        onClick={() => setOpen(!open)}
        className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center pointer-events-auto shadow-xl"
      >
        <Menu className="h-6 w-6 text-[#004D4D]" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-4 pb-3 shadow-2xl",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}) {
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthIconTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightIconTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link to={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-white/20 flex items-center justify-center relative border border-white/10 shadow-inner"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-white/10 border border-white/20 backdrop-blur-md absolute left-1/2 -top-8 w-fit text-[10px] font-black uppercase tracking-widest text-[#004D4D]"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center text-[#004D4D]"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
