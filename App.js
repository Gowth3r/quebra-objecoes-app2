import { useState, useEffect } from 'react';
import { Search, Copy, CheckCircle, Phone, Target, Zap, Brain, Clock } from "lucide-react";

// O banco de dados de objeções e respostas (mantido do original)
const database = {
  // PREÇO E ORÇAMENTO
  "está caro": [
    "🎯 Entendo, mas vamos fazer uma conta rápida: quanto você perde em 1 hora de internet instável? Nossos clientes economizam até R$ 500/mês só em produtividade.",
    "⚡ O caro mesmo é continuar pagando por um serviço que trava. A Vivo oferece ROI comprovado - seus concorrentes já migraram e estão faturando 30% mais."
  ],
  "não tenho orçamento": [
    "🔥 Perfeito! É exatamente por isso que você precisa da Vivo. Nossos clientes reduzem custos operacionais em até 40% no primeiro ano.",
    "💡 Sem orçamento é sinal de que precisa otimizar gastos. Posso te mostrar como transformar seu gasto atual em investimento que se paga?"
  ],
  "muito caro": [
    "📊 Vamos ser práticos: quanto vale 1 cliente perdido por queda de sinal? Um contrato perdido por videochamada travada? O 'caro' vira barato quando você não perde negócios.",
    "⭐ Seus concorrentes pensavam igual até descobrirem que investir R$ 200 a mais gera R$ 2.000 extras mensais. Quer ver os cases?"
  ],

  // TEMPO E URGÊNCIA
  "vou pensar": [
    "⏰ Claro! Só que essa condição especial expira hoje às 18h. Posso reservar por 2 horas enquanto você analisa?",
    "🎯 Perfeito! Enquanto pensa, seus concorrentes estão fechando negócios com internet que não falha. Quanto tempo pode esperar?"
  ],
  "não tenho tempo": [
    "⚡ Exato! É por isso que precisa da Vivo - para não perder mais tempo com problemas técnicos. Em 3 minutos resolvo sua vida digital.",
    "🔥 Quem não tem tempo não pode se dar ao luxo de ter internet instável. Vou ser direto: sim ou não para triplicar sua velocidade?"
  ],
  "me liga depois": [
    "📞 Claro! Mas essa oferta fecha hoje. Quer que eu reserve por 1 hora? Só preciso confirmar seu interesse agora.",
    "⏰ Posso ligar, mas até lá seus concorrentes já terão vantagem. Que tal 30 segundos agora para não perder a oportunidade?"
  ],

  // CONCORRÊNCIA
  "minha operadora é melhor": [
    "🏆 Ótimo! Se já é boa, imagina com a estrutura da Vivo que atende 90% das empresas do seu setor. Quer ver o comparativo real?",
    "📊 Respeito sua operadora. Mas posso te mostrar por que empresas maiores que a sua migraram da 'melhor' para a Vivo? São dados, não opinião."
  ],
  "já tenho contrato": [
    "💰 Perfeito! Quando vence? Porque posso te mostrar como migrar SEM multa e ainda economizar desde o primeiro mês.",
    "🎯 Ótimo! E se eu conseguir melhorar seu contrato atual mantendo o número e reduzindo 30% da fatura, toparia ver?"
  ],
  "a claro é boa": [
    "🔥 A Claro é boa mesmo! Mas seus maiores clientes corporativos migraram para Vivo. Quer saber por quê? É questão de estrutura PJ dedicada.",
    "⭐ Concordo! Tanto que respeitamos contratos Claro na migração. Mas posso te mostrar por que empresas do seu porte escolhem Vivo?"
  ],

  // DESCONFIANÇA E PROBLEMAS ANTERIORES
  "já tive problemas com a vivo": [
    "🎯 Te entendo 100%! Por isso criamos a Vivo Empresas - operação totalmente separada da pessoa física. Quer ver a diferença?",
    "⚡ Compreendo perfeitamente. Hoje temos SLA empresarial com garantia. Se der problema, você não paga. Posso te mostrar?"
  ],
  "não confio na vivo": [
    "🏆 Entendo. Por isso 80% das empresas do Brasil confiam na Vivo para seus negócios. Números não mentem - quer ver os cases?",
    "📊 Justo! Por isso oferecemos teste grátis de 30 dias. Zero risco, máximo resultado. Se não gostar, cancela sem custo."
  ],
  "vivo é instável": [
    "🔥 Na pessoa física pode ser. Na empresarial temos 99,9% de uptime com SLA garantido. Seus concorrentes já descobriram isso.",
    "⭐ Por isso separamos as redes! Vivo Empresas tem infraestrutura dedicada. Quer teste grátis para comprovar?"
  ],

  // FIDELIDADE E FLEXIBILIDADE
  "não quero fidelidade": [
    "💡 Perfeito! Temos planos sem fidelidade. Mas posso te mostrar por que 90% escolhem com fidelidade? É puro custo-benefício.",
    "🎯 A fidelidade protege VOCÊ também: preço fixo, sem surpresas na fatura, suporte prioritário. É garantia mútua de qualidade."
  ],
  "quero flexibilidade": [
    "⚡ Temos a maior flexibilidade do mercado! Planos que crescem com sua empresa, sem burocracia. Quer ver as opções?",
    "🔥 Flexibilidade total: upgrade instantâneo, downgrade quando quiser, pausa para férias. Somos os mais flexíveis do Brasil."
  ],

  // PROCESSO DE DECISÃO
  "vou ver com meu sócio": [
    "🎯 Sem problema! Posso preparar um comparativo direto para facilitar a decisão dele? O que mais pesa na escolha de vocês?",
    "⏰ Claro! Mas essa condição expira hoje. Posso reservar por 2 horas? Seu sócio vai agradecer a economia que você trouxe."
  ],
  "preciso consultar a equipe": [
    "💡 Perfeito! Sua equipe vai adorar internet que não trava. Posso preparar uma apresentação de 5 minutos para eles?",
    "🎯 Ótimo! Que tal eu mostrar para todos juntos? Em 10 minutos eles entendem por que é a melhor escolha."
  ],
  "vou pesquisar mais": [
    "📊 Excelente! Já pesquisei por você: Vivo lidera em 8 de 10 quesitos corporativos. Quer ver a pesquisa da Anatel?",
    "⚡ Pode pesquisar! Mas enquanto pesquisa, seus concorrentes fecham negócios com internet estável. Quanto tempo pode esperar?"
  ],

  // INTERESSE E NECESSIDADE
  "não estou interessado": [
    "🤔 Entendo. Posso só perguntar: se eu conseguir reduzir sua conta em 30% mantendo a qualidade, mudaria de ideia?",
    "💰 Sem problema! Mas curiosidade: quanto vocês gastam por mês com internet? Posso te mostrar uma economia real."
  ],
  "não vejo vantagem": [
    "🎯 Justo! Talvez porque ainda não viu nossa proposta completa. Me dá 60 segundos para mostrar 3 vantagens concretas?",
    "📊 Posso entender isso. Seus concorrentes pensavam igual até verem o ROI. Quer os números reais?"
  ],
  "não preciso": [
    "💡 Imagino que sua internet atual funciona bem. Mas e quando der problema na reunião mais importante? Vale o risco?",
    "🔥 Perfeito! Quem não precisa de dor de cabeça mesmo. Por isso nossos clientes dormem tranquilos sabendo que a internet não vai falhar."
  ],

  // PRESSÃO E OBJEÇÕES AGRESSIVAS
  "para de me ligar": [
    "🙏 Peço desculpas sinceras! Só insisti porque vejo potencial real de economia para sua empresa. Posso te ajudar de verdade.",
    "😔 Perdão pelo incômodo! A intenção é genuína: mostrar algo que pode transformar sua operação. Me dá uma chance?"
  ],
  "não me interessa": [
    "🤝 Respeito totalmente. Só uma curiosidade: o que faria você mudar de ideia? Preço, qualidade ou suporte?",
    "💭 Entendo. Mas se eu conseguir te mostrar uma economia de R$ 500/mês, vale 2 minutos?"
  ],
  "você é o terceiro hoje": [
    "😅 Imagino! Isso mostra o valor do seu negócio. Mas eu sou diferente: vou te MOSTRAR economia real, não só falar.",
    "🎯 Por isso mesmo! Seu número é ouro no mercado. Vamos fazer valer a pena com uma proposta imbatível?"
  ],

  // COMPARAÇÕES ESPECÍFICAS
  "tim é mais barata": [
    "💰 No papel sim, na prática não. Conte as horas paradas, suporte lento, instabilidade. Vivo sai mais barata no final.",
    "📊 TIM pessoa física é barata mesmo. Mas comparando empresarial, Vivo oferece 3x mais valor pelo mesmo preço."
  ],
  "oi tem fibra": [
    "🌐 Oi tem fibra, Vivo tem fibra + redundância + suporte 24h + SLA garantido. Quer comparar estrutura real?",
    "⚡ Fibra todo mundo tem. Vivo tem a MELHOR fibra: velocidade garantida, não compartilhada. Viu a diferença?"
  ],

  // SITUAÇÕES ESPECÍFICAS
  "home office": [
    "🏠 Perfeito! Home office precisa de estabilidade total. Vivo Empresas oferece velocidade dedicada, não compartilhada com vizinhos.",
    "💻 Home office que trava perde cliente. Vivo garante 99,9% de uptime. Seus concorrentes não podem esperar."
  ],
  "pequena empresa": [
    "🚀 Pequena empresa precisa de grande tecnologia para competir! Vivo nivela sua empresa com as grandes.",
    "💡 Exato! Pequeno não significa menos importante. Vivo trata PME como enterprise. Quer ver o diferencial?"
  ],
  "startup": [
    "🚀 Startup não pode falhar por internet lenta! Vivo acelera seu crescimento com tecnologia de ponta.",
    "⚡ Startups precisam de agilidade total. Vivo oferece velocidade que acompanha sua inovação."
  ],

  // TÉCNICAS E ESPECIFICAÇÕES
  "velocidade atual é boa": [
    "👍 Ótimo! Mas boa hoje pode ser lenta amanhã. Vivo oferece upgrade automático conforme sua necessidade cresce.",
    "📈 Velocidade boa é relativa. Seus concorrentes podem estar usando 10x mais. Quer manter a vantagem?"
  ],
  "não uso muito": [
    "🤔 Entendo. Mas quando usar, precisa funcionar 100%. Vivo garante performance até no pico de uso.",
    "💭 Perfeito! Quem usa pouco não pode ter problema quando precisar. Vivo é segurança digital total."
  ]
};

// Respostas rápidas para categorias gerais (mantido do original)
const quickResponses = {
  "preço": "💰 Investimento que se paga: ROI comprovado em 90 dias",
  "tempo": "⏰ Em 3 minutos resolvo sua vida digital para sempre",
  "concorrente": "🏆 Vivo lidera mercado corporativo - dados Anatel",
  "problema": "🔧 Nova operação empresarial - SLA garantido",
  "fidelidade": "🤝 Flexibilidade total - planos que crescem com você",
  "decisão": "📊 Dados concretos para decidir em 5 minutos",
  "interesse": "💡 Economia real de R$ 500/mês comprova interesse"
};

// Sistema de busca inteligente que simula IA (mantido do original)
function buscarInteligente(query) {
  const palavrasChave = query.toLowerCase().split(' ');
  const resultados = [];
  
  // Busca por palavras-chave com pontuação
  Object.entries(database).forEach(([chave, respostas]) => {
    let pontuacao = 0;
    
    // Busca exata
    if (chave === query.toLowerCase()) {
      pontuacao = 100;
    }
    // Busca por inclusão
    else if (chave.includes(query.toLowerCase()) || query.toLowerCase().includes(chave)) {
      pontuacao = 80;
    }
    // Busca por palavras-chave
    else {
      palavrasChave.forEach(palavra => {
        if (chave.includes(palavra) && palavra.length > 2) {
          pontuacao += 20;
        }
      });
    }
    
    if (pontuacao > 0) {
      resultados.push({ chave, respostas, pontuacao });
    }
  });
  
  // Busca em quick responses
  Object.entries(quickResponses).forEach(([categoria, resposta]) => {
    palavrasChave.forEach(palavra => {
      if (categoria.includes(palavra) || palavra.includes(categoria)) {
        resultados.push({ 
          chave: `Quick: ${categoria}`, 
          respostas: [resposta], 
          pontuacao: 60 
        });
      }
    });
  });
  
  // Ordena por pontuação
  resultados.sort((a, b) => b.pontuacao - a.pontuacao);
  
  return resultados.length > 0 ? resultados[0].respostas : null;
}

export default function App() {
  const [input, setInput] = useState("");
  const [respostas, setRespostas] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [quickSearch, setQuickSearch] = useState("");
  const [geminiResponse, setGeminiResponse] = useState(""); // Novo estado para a resposta do Gemini
  const [isGenerating, setIsGenerating] = useState(false); // Novo estado para o loading do Gemini

  // Busca em tempo real
  useEffect(() => {
    if (input.trim().length > 2) {
      const timer = setTimeout(() => {
        const resultado = buscarInteligente(input.trim());
        if (resultado) {
          setRespostas(resultado);
        } else {
          setRespostas([]); // Limpa as respostas se nada for encontrado
        }
      }, 300);
      return () => clearTimeout(timer);
    } else if (input.trim().length <= 2) {
      setRespostas([]); // Limpa as respostas se o input for muito curto
    }
  }, [input]);

  // Função para buscar respostas no banco de dados local
  function buscarRespostas() {
    if (!input.trim()) return;
    
    setIsSearching(true);
    
    // Simula processamento de IA
    setTimeout(() => {
      const resultado = buscarInteligente(input.trim()) || [
        "🤖 Objeção não catalogada ainda. Mas posso sugerir:",
        "💡 'Entendo sua preocupação. Posso te mostrar como outros clientes resolveram isso?'",
        "🎯 'Vamos ser práticos: qual o maior problema que isso resolve para você?'"
      ];
      
      setRespostas(resultado);
      setIsSearching(false);
      setGeminiResponse(""); // Limpa a resposta do Gemini ao buscar no banco local
    }, 500);
  }

  // Nova função para gerar resposta usando a API do Gemini
  async function generateGeminiResponse() {
    if (!input.trim()) {
      alert("Por favor, digite uma objeção para gerar uma resposta com a IA.");
      return;
    }

    setIsGenerating(true);
    setGeminiResponse("");
    setRespostas([]); // Limpa as respostas locais quando gera com a IA

    try {
      const prompt = `Gere uma resposta concisa e persuasiva para a seguinte objeção de cliente em um contexto de vendas de serviços de telecomunicações (Vivo Empresas), focando em benefícios e quebra de objeção: "${input.trim()}"`;
      
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = { contents: chatHistory };
      const apiKey = ""; // A chave da API será fornecida pelo ambiente Canvas
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setGeminiResponse(text);
      } else {
        setGeminiResponse("Não foi possível gerar uma resposta. Tente novamente.");
        console.error("Estrutura de resposta inesperada da API Gemini:", result);
      }
    } catch (error) {
      setGeminiResponse("Ocorreu um erro ao conectar com a IA. Tente novamente mais tarde.");
      console.error("Erro ao chamar a API Gemini:", error);
    } finally {
      setIsGenerating(false);
    }
  }

  // Função para copiar texto para a área de transferência
  function copyToClipboard(text, index) {
    // Remove emojis para copiar apenas o texto
    const cleanText = text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
    
    // Usar document.execCommand('copy') para compatibilidade com iframe
    const textarea = document.createElement('textarea');
    textarea.value = cleanText;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
      // Aqui você poderia adicionar um modal ou mensagem visível para o usuário
      // alert('Erro ao copiar. Por favor, tente novamente manualmente.');
    } finally {
      document.body.removeChild(textarea);
    }
  }

  function handleQuickSearch(categoria) {
    setInput(categoria);
    setQuickSearch(categoria);
    setGeminiResponse(""); // Limpa a resposta do Gemini ao usar busca rápida
    const resultado = buscarInteligente(categoria);
    if (resultado) setRespostas(resultado);
  }

  const categorias = [
    { nome: "Preço", emoji: "💰", query: "caro" },
    { nome: "Tempo", emoji: "⏰", query: "pensar" },
    { nome: "Concorrente", emoji: "🏆", query: "operadora" },
    { nome: "Problema", emoji: "🔧", query: "problema" },
    { nome: "Fidelidade", emoji: "🤝", query: "fidelidade" },
    { nome: "Interesse", emoji: "💡", query: "interessado" }
  ];

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
      {/* Header Otimizado */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-4 shadow-2xl rounded-b-xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 animate-pulse" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">IA Quebra Objeções</h1>
                <p className="text-blue-100 text-sm flex items-center">
                  <Zap className="w-4 h-4 inline mr-1" />
                  Lucian Oliveira | Vivo Empresas | Respostas Inteligentes
                </p>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-xl font-bold text-yellow-300">{Object.keys(database).length}</div>
              <div className="text-xs text-blue-100">Objeções</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Busca Super Rápida */}
        <div className="mb-4 shadow-2xl rounded-lg border-0 bg-white/95 backdrop-blur-sm p-4">
          <div className="flex flex-col md:flex-row gap-2 mb-4">
            <div className="relative flex-1">
              <Brain className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Digite qualquer objeção... A IA encontra na hora!"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && buscarRespostas()}
                className="w-full pl-10 h-12 text-lg border border-purple-300 focus:border-purple-600 font-medium rounded-md focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
              />
            </div>
            <button 
              onClick={buscarRespostas}
              disabled={isSearching || isGenerating}
              className="h-12 px-6 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center min-w-[120px]"
            >
              {isSearching ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Buscar
                </>
              )}
            </button>
            <button 
              onClick={generateGeminiResponse}
              disabled={isGenerating || isSearching}
              className="h-12 px-6 rounded-md bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center min-w-[120px]"
            >
              {isGenerating ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <Brain className="w-5 h-5 mr-2" />
                  ✨ Gerar Resposta IA
                </>
              )}
            </button>
          </div>

          {/* Categorias Rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {categorias.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickSearch(cat.query)}
                className={`h-16 flex flex-col items-center justify-center rounded-md border border-gray-200 text-gray-700 font-semibold hover:bg-purple-50 hover:border-purple-300 transition-all duration-200
                  ${quickSearch === cat.query ? 'bg-purple-100 border-purple-500 text-purple-800 shadow-md' : ''}`}
              >
                <span className="text-2xl mb-1">{cat.emoji}</span>
                <span className="text-xs font-medium">{cat.nome}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Responses */}
        {input.length > 0 && input.length < 3 && !isGenerating && (
          <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 p-3">
            <p className="text-sm text-yellow-800 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Continue digitando... A IA está analisando sua objeção
            </p>
          </div>
        )}

        {/* Resposta Gerada pela IA do Gemini */}
        {geminiResponse && (
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-emerald-600" />
              <h3 className="text-xl font-bold text-white">
                ✨ Resposta Gerada pela IA
              </h3>
            </div>
            <div className="shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg border-l-4 border-emerald-500 bg-white/95 backdrop-blur-sm p-4">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <p className="text-gray-800 leading-relaxed text-base mb-2">
                    {geminiResponse}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
                      Gerada por Gemini
                    </span>
                    <span>•</span>
                    <span>Adaptável ao contexto</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(geminiResponse, 'gemini')}
                  className="flex-shrink-0 p-2 rounded-md border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200"
                >
                  {copiedIndex === 'gemini' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copiedIndex === 'gemini' && (
                <div className="mt-2 text-sm text-green-600 font-medium animate-fade-in">
                  ✓ Copiado! Cole no chat ou use na ligação
                </div>
              )}
            </div>
          </div>
        )}

        {/* Resultados do Banco de Dados Local */}
        {respostas.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-white">
                Respostas Catalogadas ({respostas.length})
              </h3>
            </div>
            
            {respostas.map((resposta, idx) => (
              <div key={idx} className="shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg border-l-4 border-purple-500 bg-white/95 backdrop-blur-sm p-4">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed text-base mb-2">
                      {resposta}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
                        Resposta {idx + 1}
                      </span>
                      <span>•</span>
                      <span>Otimizada para ligação</span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(resposta, idx)}
                    className="flex-shrink-0 p-2 rounded-md border border-gray-200 text-gray-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                  >
                    {copiedIndex === idx ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                
                {copiedIndex === idx && (
                  <div className="mt-2 text-sm text-green-600 font-medium animate-fade-in">
                    ✓ Copiado! Cole no chat ou use na ligação
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-8 text-center space-y-2">
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white">
              <div className="text-xl font-bold text-yellow-300">{Object.keys(database).length}</div>
              <div className="text-xs">Objeções Catalogadas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white">
              <div className="text-xl font-bold text-green-300">95%</div>
              <div className="text-xs">Taxa Sucesso</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white">
              <div className="text-xl font-bold text-blue-300">3seg</div>
              <div className="text-xs">Busca Média</div>
            </div>
          </div>
          <div className="text-xs text-white/70 mt-4">
            <strong>Quebra Objeções IA v3.0</strong> | Vamos juntos até o topo! 🚀
          </div>
        </div>
      </div>

      {/* Estilos CSS normais sem a tag 'jsx' */}
      <style>
        {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        `}
      </style>
    </div>
  );
}
