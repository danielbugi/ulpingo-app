'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';
import { UserPlus, Trophy, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { shouldPromptSignup, getGuestStats } from '@/lib/guest-session';

const STORAGE_KEY = 'ulpingo_signup_prompt_dismissed';

export default function SignupPrompt() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState({
    totalWords: 0,
    correctCount: 0,
    incorrectCount: 0,
  });

  useEffect(() => {
    // Only show to guest users
    if (session?.user) return;

    // Check if user dismissed the prompt
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    // Check if threshold is met
    if (shouldPromptSignup(20)) {
      setStats(getGuestStats());
      setIsOpen(true);
    }
  }, [session]);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
  };

  const totalAttempts = stats.correctCount + stats.incorrectCount;
  const accuracy =
    totalAttempts > 0
      ? Math.round((stats.correctCount / totalAttempts) * 100)
      : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleDismiss}
      size="lg"
      classNames={{
        backdrop: 'bg-black/80 backdrop-blur-sm',
        base: 'border border-purple-500/20 bg-gradient-to-br from-gray-900 to-black',
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Você está indo muito bem! 🎉
              </h3>
            </div>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="space-y-4">
            <p className="text-gray-300 text-lg">
              Você já praticou{' '}
              <span className="text-purple-400 font-bold">{totalAttempts}</span>{' '}
              palavras com{' '}
              <span className="text-green-400 font-bold">{accuracy}%</span> de
              acertos!
            </p>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Crie uma conta e ganhe:
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Salve seu progresso permanentemente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Acesse de qualquer dispositivo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Sistema de revisão espaçada personalizado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Conquistas e estatísticas detalhadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Totalmente gratuito, sempre!</span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-gray-500 text-center">
              💾 Seu progresso atual será automaticamente transferido!
            </p>
          </div>
        </ModalBody>

        <ModalFooter className="flex-col sm:flex-row gap-3">
          <Button
            variant="flat"
            onPress={handleDismiss}
            className="w-full sm:w-auto text-gray-400 hover:text-white"
          >
            Continuar como convidado
          </Button>
          <Link href="/auth/signup" className="w-full sm:w-auto">
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold"
              startContent={<UserPlus className="w-5 h-5" />}
            >
              Criar Conta Grátis
            </Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
