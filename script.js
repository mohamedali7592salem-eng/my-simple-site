// ====================================================
// بيانات مشروع Supabase (تم التعديل)
// ====================================================
const SUPABASE_URL = 'https://drgbswnxnayijqypeqen.supabase.co'  // الرابط الخاص بك
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyZ2Jzd254bmF5aWpxeXBlcWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NzgwNTAsImV4cCI6MjA4NzI1NDA1MH0.xzGBCwZVZ8oluml-Yo_XyrNz0AnEqJA0BMJS_HnPIEk'

// إنشاء اتصال بـ Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// الدالة الرئيسية لجلب وعرض البيانات
async function loadPosts() {
    const container = document.getElementById('posts-container')
    
    try {
        // جلب البيانات من جدول posts
        const { data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })

        // إذا حدث خطأ
        if (error) {
            throw error
        }

        // عرض البيانات
        if (posts && posts.length > 0) {
            container.innerHTML = posts.map(post => {
                // تنسيق التاريخ
                const date = new Date(post.created_at)
                const formattedDate = date.toLocaleString('ar-EG', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })

                return `
                    <div class="post">
                        <h3>${post.title}</h3>
                        <p>${post.content || '<i>لا يوجد محتوى</i>'}</p>
                        <small>
                            <i class="fas fa-calendar-alt"></i> ${formattedDate}
                        </small>
                    </div>
                `
            }).join('')
        } else {
            // لا توجد بيانات
            container.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-inbox fa-3x"></i>
                    <p>لا توجد منشورات بعد</p>
                </div>
            `
        }
    } catch (error) {
        // في حالة حدوث خطأ
        console.error('خطأ:', error)
        container.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-triangle fa-3x"></i>
                <p>حدث خطأ في تحميل البيانات</p>
                <small>${error.message}</small>
            </div>
        `
    }
}

// تنفيذ الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadPosts)
