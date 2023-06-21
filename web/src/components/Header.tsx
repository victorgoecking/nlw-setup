
import { Plus, X } from "phosphor-react";
import LogoImage from '../assets/logo.svg'

export function Header() {

  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={LogoImage} alt="" />

      <Plus size={20} className="text-violet-500" />
    </div>
  );
}