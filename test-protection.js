// test-protection.js - Test admin route protection
const testProtection = async () => {
  console.log('\n🔒 Testing Admin Route Protection\n');
  console.log('='.repeat(50));

  // Test 1: Admin API without auth
  console.log('\n1. Testing /api/admin/stats without authentication:');
  try {
    const response = await fetch('http://localhost:3001/api/admin/stats');
    console.log(`   Status: ${response.status}`);
    const data = await response.json();
    console.log(`   Response: ${JSON.stringify(data).substring(0, 100)}`);

    if (response.status === 401 || response.status === 403) {
      console.log('   ✅ PROTECTED - Unauthorized access blocked');
    } else {
      console.log('   ❌ NOT PROTECTED - Should return 401/403');
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 2: Admin page redirect
  console.log('\n2. Testing /admin page without authentication:');
  try {
    const response = await fetch('http://localhost:3001/admin', {
      redirect: 'manual',
    });
    console.log(`   Status: ${response.status}`);

    if (response.status === 307 || response.status === 308) {
      const location = response.headers.get('location');
      console.log(`   Redirected to: ${location}`);
      if (location?.includes('/auth/signin')) {
        console.log('   ✅ PROTECTED - Redirects to signin');
      } else {
        console.log('   ⚠️  Redirects but not to signin');
      }
    } else if (response.status === 200) {
      console.log('   ❌ NOT PROTECTED - Should redirect to signin');
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ Protection test complete!\n');
};

testProtection();
