import cn from '@/utils/cn';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

type Props = {
  round?: boolean;
  variant?: 'start' | 'stop' | 'outline' | 'link';
  active?: boolean;
};

export const Button: FC<PropsWithChildren<ComponentProps<'button'> & Props>> = ({
  children,
  className,
  variant,
  disabled,
  active,
  ...restProps
}) => {
  const isRounded = variant == 'start' || variant === 'stop';
  const isActive = variant === 'link' && active;
  const color = isRounded && (variant === 'stop' ? 'bg-red-500' : 'bg-green-600');
  const _class = cn(
    'rounded-md bg-black text-slate-200 font-medium border border-transparent hover:border-sky-500 px-3 py-1 focus:ring-4 ring-slate-500 ring-2 transition-colors',
    { 'rounded-full p-3': isRounded },
    {
      'bg-transparent text-2xl font-normal ring-0 focus:ring-0 hover:border-slate-500 border-2':
        variant === 'outline',
    },
    { 'hover:ring-0 pointer-events-none opacity-40': disabled },
    {
      'bg-transparent ring-0 underline underline-offset-8 text-blue-400 text-xl focus:ring-0 hover:decoration-transparent hover:border-transparent':
        variant === 'link',
    },
    { 'no-underline bg-slate-500': isActive },
    color,
    className
  );
  return (
    <button className={_class} {...restProps}>
      {variant !== 'start' && variant !== 'stop' && children}
    </button>
  );
};
