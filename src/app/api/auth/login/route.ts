import { NextResponse } from "next/server";
import { z } from "zod";
import { signToken, setSessionCookie } from "@/lib/auth";

// Schema de validação para prevenir ataques de injeção e dados malformados
const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Validação de Input (Zod)
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // 2. Simulação de verificação segura
    // Em um sistema real, você compararia o hash (ex: bcrypt) com o banco de dados.
    // Para portfólio, usamos variáveis de ambiente para demonstrar segurança de dados sensíveis.
    const CORRECT_EMAIL = process.env.MOCK_USER_EMAIL || "erik@gmail.com";
    const CORRECT_PASSWORD = process.env.MOCK_USER_PASSWORD || "1234";

    if (email === CORRECT_EMAIL && password === CORRECT_PASSWORD) {
      // 3. Gerar JWT seguro
      const token = await signToken({ email, role: "user" });

      // 4. Setar Cookie HttpOnly (Proteção contra XSS)
      await setSessionCookie(token);

      return NextResponse.json({ success: true, message: "Login realizado com sucesso" });
    }

    // Segurança: Mensagem genérica para evitar enumeração de usuários
    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 }
    );
    
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
