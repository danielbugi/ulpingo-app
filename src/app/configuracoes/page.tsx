'use client';

import { useSession } from 'next-auth/react';
import {
  Card,
  CardBody,
  Button,
  Switch,
  Input,
  Select,
  SelectItem,
} from '@heroui/react';
import {
  Settings as SettingsIcon,
  Bell,
  Volume2,
  Globe,
  Moon,
  Trash2,
  Save,
  Shield,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingState from '@/components/LoadingState';

interface UserSettings {
  notifications: boolean;
  soundEffects: boolean;
  autoPlayAudio: boolean;
  language: string;
  dailyGoal: number;
  theme: string;
}

export default function ConfiguracoesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [settings, setSettings] = useState<UserSettings>({
    notifications: true,
    soundEffects: true,
    autoPlayAudio: true,
    language: 'pt',
    dailyGoal: 10,
    theme: 'dark',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }

    if (status === 'authenticated') {
      loadSettings();
    }
  }, [status, router]);

  const loadSettings = () => {
    // Load from localStorage
    const savedSettings = localStorage.getItem('ulpingo_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      // Save to localStorage
      localStorage.setItem('ulpingo_settings', JSON.stringify(settings));

      // In the future, also sync to server
      // await fetch('/api/settings', {
      //   method: 'POST',
      //   body: JSON.stringify(settings),
      // });

      setSaveMessage('Configurações salvas com sucesso!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveMessage('Erro ao salvar configurações');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearData = () => {
    if (
      confirm(
        'Tem certeza que deseja limpar todos os dados locais? Esta ação não pode ser desfeita.'
      )
    ) {
      // Clear guest data only, keep settings
      localStorage.removeItem('ulpingo_guest_progress');
      localStorage.removeItem('ulpingo_guest_srs');
      localStorage.removeItem('ulpingo_streak_data');
      localStorage.removeItem('ulpingo_achievements');
      localStorage.removeItem('ulpingo_daily_goal');

      alert('Dados locais limpos com sucesso!');
      router.push('/');
    }
  };

  if (status === 'loading') {
    return <LoadingState />;
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-black to-blue-900/20"></div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gray-500/20 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Configura</span>
            <span className="bg-gradient-to-r from-gray-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
              ções
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Personalize sua experiência de aprendizado
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Notifications */}
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Notificações</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Lembretes Diários</p>
                    <p className="text-sm text-gray-400">
                      Receba lembretes para estudar todos os dias
                    </p>
                  </div>
                  <Switch
                    isSelected={settings.notifications}
                    onValueChange={(value) =>
                      setSettings({ ...settings, notifications: value })
                    }
                    color="primary"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Audio Settings */}
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Volume2 className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Áudio</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Efeitos Sonoros</p>
                    <p className="text-sm text-gray-400">
                      Sons de feedback para respostas corretas/incorretas
                    </p>
                  </div>
                  <Switch
                    isSelected={settings.soundEffects}
                    onValueChange={(value) =>
                      setSettings({ ...settings, soundEffects: value })
                    }
                    color="secondary"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">
                      Reprodução Automática
                    </p>
                    <p className="text-sm text-gray-400">
                      Tocar pronúncia automaticamente nos flashcards
                    </p>
                  </div>
                  <Switch
                    isSelected={settings.autoPlayAudio}
                    onValueChange={(value) =>
                      setSettings({ ...settings, autoPlayAudio: value })
                    }
                    color="secondary"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Learning Preferences */}
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <SettingsIcon className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">
                  Preferências de Aprendizado
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Meta Diária de Palavras
                  </label>
                  <Input
                    type="number"
                    value={settings.dailyGoal.toString()}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        dailyGoal: parseInt(e.target.value) || 10,
                      })
                    }
                    min={5}
                    max={100}
                    className="max-w-xs"
                    classNames={{
                      input: 'text-white',
                      inputWrapper:
                        'bg-gray-800/50 border-gray-700 hover:border-gray-600',
                    }}
                    description="Quantas palavras novas você quer aprender por dia?"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Idioma da Interface
                  </label>
                  <Select
                    selectedKeys={[settings.language]}
                    onChange={(e) =>
                      setSettings({ ...settings, language: e.target.value })
                    }
                    className="max-w-xs"
                    classNames={{
                      trigger:
                        'bg-gray-800/50 border-gray-700 hover:border-gray-600',
                      value: 'text-white',
                    }}
                  >
                    <SelectItem key="pt">Português</SelectItem>
                    <SelectItem key="en">English</SelectItem>
                    <SelectItem key="he">עברית</SelectItem>
                  </Select>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Account Settings */}
          {session.user?.role === 'admin' && (
            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl border border-purple-500/20">
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">
                    Conta de Administrador
                  </h2>
                </div>
                <p className="text-gray-400 mb-4">
                  Você tem privilégios de administrador
                </p>
                <Button
                  color="secondary"
                  variant="flat"
                  onClick={() => router.push('/admin')}
                >
                  Ir para Admin Dashboard
                </Button>
              </CardBody>
            </Card>
          )}

          {/* Data Management */}
          <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-xl border border-red-500/20">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Trash2 className="w-6 h-6 text-red-400" />
                <h2 className="text-2xl font-bold text-white">
                  Gerenciar Dados
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-white font-medium mb-2">
                    Limpar Dados Locais
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    Remove todo o progresso armazenado localmente (modo
                    visitante). Seus dados de conta sincronizados permanecerão
                    seguros.
                  </p>
                  <Button
                    color="danger"
                    variant="flat"
                    onClick={handleClearData}
                    startContent={<Trash2 className="w-4 h-4" />}
                  >
                    Limpar Dados Locais
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Save Button */}
          <div className="flex items-center justify-between">
            <div>
              {saveMessage && (
                <p
                  className={`text-sm ${
                    saveMessage.includes('sucesso')
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {saveMessage}
                </p>
              )}
            </div>
            <Button
              color="primary"
              size="lg"
              onClick={saveSettings}
              isLoading={isSaving}
              startContent={!isSaving && <Save className="w-5 h-5" />}
              className="bg-gradient-to-r from-blue-600 to-purple-600 font-semibold"
            >
              {isSaving ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
