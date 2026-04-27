import { NextResponse } from "next/server";
import { z } from "zod";
import { signToken, setSessionCookie } from "@/lib/auth";

const signupSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Validação de Input
    const result = signupSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email } = result.data;

    // Em um sistema real, aqui você faria:
    // - Verificar se o e-mail já existe no banco
    // - Criar hash da senha (bcrypt)
    // - Salvar no banco de dados

    // 2. Simulação de sucesso para portfólio
    const token = await signToken({ name, email, role: "user" });
    await setSessionCookie(token);

    return NextResponse.json({ 
      success: true, 
      message: "Conta criada com sucesso",
      user: { name, email }
    });
    
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
