'use client';

import { useSession, signOut } from 'next-auth/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
} from '@heroui/react';
import { User, Trophy, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UserMenu() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 animate-pulse" />
    );
  }

  if (!session) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/auth/signin">
          <Button
            size="sm"
            variant="light"
            className="text-gray-300 hover:text-white"
          >
            Entrar
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:from-purple-500 hover:to-cyan-500 shadow-lg shadow-purple-500/25"
          >
            Registrar
          </Button>
        </Link>
      </div>
    );
  }

  const userInitial =
    session.user?.name?.[0] || session.user?.email?.[0] || 'U';

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/25 cursor-pointer hover:shadow-xl hover:shadow-purple-500/30 transition-all border-2 border-white/10">
            {userInitial.toUpperCase()}
          </div>
        </button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="User menu"
        className="w-64 p-2 bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-xl"
      >
        <DropdownItem
          key="profile"
          className="h-14 gap-2 opacity-100 cursor-default mb-1 rounded-lg px-3 border border-white/5"
          textValue="Profile"
          isReadOnly
        >
          <p className="text-xs text-gray-500">Conectado como</p>
          <p className="font-semibold text-white truncate">
            {session.user?.email}
          </p>
        </DropdownItem>
        <DropdownItem
          key="achievements"
          startContent={<Trophy className="w-4 h-4 text-yellow-500" />}
          onClick={() => router.push('/achievements')}
          className="text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg px-3 py-2 mb-1 border border-transparent hover:border-white/5"
        >
          Conquistas
        </DropdownItem>
        <DropdownItem
          key="profile-page"
          startContent={<User className="w-4 h-4 text-blue-500" />}
          onClick={() => router.push('/profile')}
          className="text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg px-3 py-2 mb-1 border border-transparent hover:border-white/5"
        >
          Meu Perfil
        </DropdownItem>
        <DropdownItem
          key="settings"
          startContent={<Settings className="w-4 h-4 text-gray-500" />}
          onClick={() => router.push('/settings')}
          className="text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg px-3 py-2 mb-1 border border-transparent hover:border-white/5"
        >
          Configurações
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          startContent={<LogOut className="w-4 h-4" />}
          onClick={() => signOut({ callbackUrl: '/auth/signin' })}
          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg px-3 py-2 border border-transparent hover:border-red-500/20"
        >
          Sair
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
