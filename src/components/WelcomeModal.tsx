'use client';

import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Star, Sparkles, Trophy, TrendingUp } from 'lucide-react';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Only show modal if user is not authenticated
    if (!session) {
      // Check if user has seen the welcome modal before
      const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
      
      if (!hasSeenWelcome) {
        // Show modal after a short delay for better UX
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [session]);

  const handleClose = () => {
    // Mark that user has seen the welcome modal
    localStorage.setItem('hasSeenWelcome', 'true');
    setIsOpen(false);
  };

  const handleSignUp = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setIsOpen(false);
    router.push('/auth/signup');
  };

  const handleSignIn = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setIsOpen(false);
    router.push('/auth/signin');
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      size="2xl"
      backdrop="blur"
      classNames={{
        backdrop: "bg-black/80",
        base: "bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-500/20",
        closeButton: "hover:bg-white/5 active:bg-white/10 text-white"
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center pt-8">
              <div className="text-6xl mb-4 animate-bounce">👋</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
                Bem-vindo ao Ulpingo!
              </h2>
              <p className="text-gray-400 text-lg font-normal mt-2">
                Aprenda Hebraico de forma divertida e eficaz
              </p>
            </ModalHeader>
            
            <ModalBody className="py-6">
              <div className="space-y-4">
                <p className="text-gray-300 text-center mb-6">
                  Crie uma conta gratuita para acompanhar seu progresso e nunca perder suas conquistas!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-500/20 rounded-lg p-2">
                        <Trophy className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Progresso Salvo</h3>
                        <p className="text-gray-400 text-sm">Suas estatísticas e conquistas são salvas</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-cyan-500/20 rounded-lg p-2">
                        <TrendingUp className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Acompanhe Evolução</h3>
                        <p className="text-gray-400 text-sm">Veja seu crescimento ao longo do tempo</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-pink-500/20 rounded-lg p-2">
                        <Sparkles className="w-5 h-5 text-pink-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Sistema SRS</h3>
                        <p className="text-gray-400 text-sm">Revisões inteligentes para melhor memorização</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-500/20 rounded-lg p-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">100% Gratuito</h3>
                        <p className="text-gray-400 text-sm">Todos os recursos, sem custos</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mt-6">
                  <p className="text-blue-300 text-sm text-center">
                    💡 Você pode começar sem cadastro, mas seu progresso não será salvo permanentemente
                  </p>
                </div>
              </div>
            </ModalBody>
            
            <ModalFooter className="flex-col gap-2 pb-8">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all"
                onPress={handleSignUp}
              >
                Criar Conta Grátis
              </Button>
              
              <Button
                size="lg"
                variant="bordered"
                className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/10 font-semibold"
                onPress={handleSignIn}
              >
                Já tenho conta
              </Button>
              
              <Button
                size="sm"
                variant="light"
                className="text-gray-400 hover:text-white"
                onPress={handleClose}
              >
                Continuar sem cadastro
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
